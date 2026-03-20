import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
  <Box
                                sx={{
                                    flex: '1 1 auto',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                   mt:"80px",
                                }}
                            >
       <Card
    sx={{
      maxWidth: 550,
      width: "100%",
      p: 3,
      boxShadow: 3,
      borderRadius: 3
    }}
  >
    <CardContent>
        <form className="registerForm" onSubmit={submitHandler}>
          <Typography variant="h4" align="center"
                                    gutterBottom
                                    sx={{ fontWeight: 700, mt:"30px", color: "#3f51b5" }}>Add Notice</Typography>
          <label>Title</label>
          <input className="registerInput" type="text" placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required />

          <label>Details</label>
          <input className="registerInput" type="text" placeholder="Enter notice details..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required />

          <label>Date</label>
          <input className="registerInput" type="date" placeholder="Enter notice date..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required />

            <Box display="flex" justifyContent="center" gap={2}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)}
                    sx={styles.buttonOutlined}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loader}
                    sx={styles.buttonFilled}
                    >
                    {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                </Button>
                </Box>
        </form>
    </CardContent></Card></Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;

const styles = {
      buttonFilled: {
        mt:3,
    px: 4,
    py: 1.2,
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
  },
  buttonOutlined: {
    px: 4, mt:3,
    py: 1.2,
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
  },
};
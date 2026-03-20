import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
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
            gutterBottom  sx={{ fontWeight: 700, mt:"30px", color: "#3f51b5" }}>Add Teacher</Typography>
          <br />
          <label>
            Subject : {subjectDetails && subjectDetails.subName}
          </label>
          <label>
            Class : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
          </label>
          <label>Name</label>
          <input className="registerInput" type="text" placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name" required />

          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />

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
                    {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
                </Box>
        </form>
</CardContent></Card></Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
}

export default AddTeacher;

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
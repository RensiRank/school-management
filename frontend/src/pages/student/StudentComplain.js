import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../components/Popup';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

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
            }} >
            <CardContent>
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4" align="center" gutterBottom
                                sx={{ fontWeight: 700, color: "#3f51b5" }}>Complain</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complain"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => {
                                        setComplaint(event.target.value);
                                    }}
                                    required
                                    multiline
                                    maxRows={4}
                                />
                            </Stack>
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
                    </div>
                  </CardContent></Card>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;

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
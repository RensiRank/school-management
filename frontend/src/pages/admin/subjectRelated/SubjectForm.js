import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([
    { subName: "", subCode: "", sessions: "" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;

  const sclassName = params.id;
  const adminID = currentUser._id;
  const address = "Subject";

  // ------- Handlers -------
  const handleChange = (index, field) => (e) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = e.target.value;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
  };

  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const fields = {
    sclassName,
    subjects: subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      sessions: subject.sessions,
    })),
    adminID,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/subjects");
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 750,
          borderRadius: 5,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.9)",
          p: 4,
          boxShadow: "0px 6px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          color="primary"
          gutterBottom
        >
          Create New Subjects
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Fill in the subject details for your class. Add or remove subjects as
          needed.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={submitHandler}>
          <Grid container spacing={3}>
            {subjects.map((subject, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Subject Name"
                    value={subject.subName}
                    onChange={handleChange(index, "subName")}
                    required
                    variant="outlined"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Subject Code"
                    value={subject.subCode}
                    onChange={handleChange(index, "subCode")}
                    required
                    variant="outlined"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Sessions"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={subject.sessions}
                    onChange={handleChange(index, "sessions")}
                    required
                    variant="outlined"
                    sx={styles.textField}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {index === 0 ? (
                    <Tooltip title="Add another subject">
                      <IconButton color="primary" onClick={handleAddSubject}>
                        <AddCircleRoundedIcon sx={{ fontSize: 34 }} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Remove this subject">
                      <IconButton
                        color="error"
                        onClick={handleRemoveSubject(index)}
                      >
                        <RemoveCircleRoundedIcon sx={{ fontSize: 34 }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>

          <Divider sx={{ mt: 4, mb: 3 }} />

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
              {loader ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save Subjects"
              )}
            </Button>
          </Box>

          <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </form>
      </Paper>
    </Box>
  );
};

export default SubjectForm;

const styles = {
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#1976d2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
  },
  buttonFilled: {
    px: 4,
    py: 1.2,
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
  },
  buttonOutlined: {
    px: 4,
    py: 1.2,
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
  },
};

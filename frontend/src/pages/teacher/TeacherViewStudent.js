import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import CustomPieChart from "../../components/CustomPieChart";
import styled from "styled-components";

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const address = "Student";
  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectMarks, setSubjectMarks] = useState("");
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const [openStates, setOpenStates] = useState({});

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectMarks(userDetails.examResult || "");
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  // Styled table components
  const StyledTableCell = styled(TableCell)(() => ({
    fontWeight: 600,
    color: "#1a237e",
    borderBottom: "1px solid #ddd",
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
    "&:hover": {
      backgroundColor: "#e3f2fd",
    },
  }));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: 4,
    borderRadius: 20,
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    background: "linear-gradient(135deg, #f3f6ff, #ffffff)",
  }));

  return (
    <>
      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <Container maxWidth="md" sx={{ mt: 5, mb: 6 }}>
          <StyledPaper>
            {/* Title */}
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, color: "#0d47a1" }}
            >
              🎓 Student View
            </Typography>
            <Divider sx={{ my: 2, bgcolor: "#bbdefb" }} />

            {/* Student Info */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ color: "#37474f" }}>
                  Name:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, color: "#1a237e" }}
                  >
                    {userDetails.name}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ color: "#37474f" }}>
                  Roll Number:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, color: "#1a237e" }}
                  >
                    {userDetails.rollNum}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ color: "#37474f" }}>
                  Class:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, color: "#1a237e" }}
                  >
                    {sclassName.sclassName}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ color: "#37474f" }}>
                  School:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, color: "#1a237e" }}
                  >
                    {studentSchool.schoolName}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>

            {/* Attendance Section */}
            <Typography
              variant="h5"
              sx={{ mt: 3, fontWeight: 700, color: "#1565c0" }}
            >
              Attendance
            </Typography>
            <Divider sx={{ my: 1, bgcolor: "#bbdefb" }} />

            {subjectAttendance &&
              Array.isArray(subjectAttendance) &&
              subjectAttendance.length > 0 && (
                <>
                  {Object.entries(
                    groupAttendanceBySubject(subjectAttendance)
                  ).map(
                    (
                      [subName, { present, allData, subId, sessions }],
                      index
                    ) => {
                      if (subName === teachSubject) {
                        const subjectAttendancePercentage =
                          calculateSubjectAttendancePercentage(
                            present,
                            sessions
                          );

                        return (
                          <Box key={index} sx={{ mt: 2 }}>
                            <Table>
                              <TableHead>
                                <StyledTableRow>
                                  <StyledTableCell>Subject</StyledTableCell>
                                  <StyledTableCell>Present</StyledTableCell>
                                  <StyledTableCell>
                                    Total Sessions
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    Attendance %
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Actions
                                  </StyledTableCell>
                                </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell>{subName}</StyledTableCell>
                                  <StyledTableCell>{present}</StyledTableCell>
                                  <StyledTableCell>{sessions}</StyledTableCell>
                                  <StyledTableCell>
                                    {subjectAttendancePercentage}%
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      size="small"
                                      onClick={() => handleOpen(subId)}
                                      sx={{
                                        textTransform: "none",
                                        borderRadius: 2,
                                        boxShadow:
                                          "0 2px 8px rgba(21,101,192,0.3)",
                                      }}
                                    >
                                      {openStates[subId] ? (
                                        <KeyboardArrowUp />
                                      ) : (
                                        <KeyboardArrowDown />
                                      )}
                                      Details
                                    </Button>
                                  </StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                  <TableCell
                                    style={{
                                      paddingBottom: 0,
                                      paddingTop: 0,
                                    }}
                                    colSpan={6}
                                  >
                                    <Collapse
                                      in={openStates[subId]}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Box sx={{ margin: 2 }}>
                                        <Typography
                                          variant="subtitle1"
                                          sx={{
                                            fontWeight: 600,
                                            color: "#0d47a1",
                                          }}
                                        >
                                          Attendance Details
                                        </Typography>
                                        <Table size="small">
                                          <TableHead>
                                            <StyledTableRow>
                                              <StyledTableCell>
                                                Date
                                              </StyledTableCell>
                                              <StyledTableCell align="right">
                                                Status
                                              </StyledTableCell>
                                            </StyledTableRow>
                                          </TableHead>
                                          <TableBody>
                                            {allData.map((data, idx) => {
                                              const date = new Date(data.date);
                                              const dateString =
                                                date.toString() !==
                                                "Invalid Date"
                                                  ? date
                                                      .toISOString()
                                                      .substring(0, 10)
                                                  : "Invalid Date";
                                              return (
                                                <StyledTableRow key={idx}>
                                                  <StyledTableCell>
                                                    {dateString}
                                                  </StyledTableCell>
                                                  <StyledTableCell align="right">
                                                    {data.status}
                                                  </StyledTableCell>
                                                </StyledTableRow>
                                              );
                                            })}
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Collapse>
                                  </TableCell>
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    }
                  )}

                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                      color: "#1a237e",
                      textAlign: "center",
                    }}
                  >
                    Overall Attendance: {overallAttendancePercentage.toFixed(2)}
                    %
                  </Typography>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <CustomPieChart data={chartData} />
                  </Box>
                </>
              )}

            {/* Add Attendance Button */}
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: "25px",
                  textTransform: "none",
                  backgroundColor: "#1565c0",
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
                onClick={() =>
                  navigate(
                    `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                  )
                }
              >
                Add Attendance
              </Button>
            </Box>

            {/* Marks Section */}
            <Typography
              variant="h5"
              sx={{ mt: 5, mb: 1, fontWeight: 700, color: "#1565c0" }}
            >
              Subject Marks
            </Typography>
            <Divider sx={{ my: 1, bgcolor: "#ce93d8" }} />

            {subjectMarks &&
              Array.isArray(subjectMarks) &&
              subjectMarks.length > 0 &&
              subjectMarks.map((result, index) => {
                if (result.subName?.subName === teachSubject) {
                  return (
                    <Table key={index}>
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell>Subject</StyledTableCell>
                          <StyledTableCell>Marks</StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell>
                            {result.subName.subName}
                          </StyledTableCell>
                          <StyledTableCell>
                            {result.marksObtained}
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  );
                }
                return null;
              })}

            {/* Add Marks Button */}
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: "25px",
                  textTransform: "none",
                  backgroundColor: "#1565c0",
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
                onClick={() =>
                  navigate(
                    `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                  )
                }
              >
                Add Marks
              </Button>
            </Box>
          </StyledPaper>
        </Container>
      )}
    </>
  );
};

export default TeacherViewStudent;

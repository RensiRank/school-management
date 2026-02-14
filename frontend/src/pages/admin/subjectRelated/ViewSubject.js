import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../../redux/sclassRelated/sclassHandle";
import TableTemplate from "../../../components/TableTemplate";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/buttonStyles";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import InsertChartRoundedIcon from "@mui/icons-material/InsertChartRounded";

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { classID, subjectID } = params;
  const { subloading, subjectDetails, sclassStudents } = useSelector(
    (state) => state.sclass
  );

  const [tabValue, setTabValue] = useState(0);
  const [selectedSection, setSelectedSection] = useState("attendance");

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  const studentColumns = [
    { id: "rollNum", label: "Roll No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <BlueButton onClick={() => navigate("/Admin/students/student/" + row.id)}>
        View
      </BlueButton>
      <PurpleButton
        onClick={() =>
          navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
        }
      >
        Attendance
      </PurpleButton>
    </>
  );

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <BlueButton onClick={() => navigate("/Admin/students/student/" + row.id)}>
        View
      </BlueButton>
      <PurpleButton
        onClick={() =>
          navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)
        }
      >
        Marks
      </PurpleButton>
    </>
  );

  return (
    <Box sx={{ bgcolor: "#f9fafc", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* SIDEBAR TABS */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                p: 1,
                bgcolor: "white",
              }}
            >
              <Tabs
                orientation="vertical"
                variant="fullWidth"
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTab-root": {
                    borderRadius: 2,
                    mb: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1,
                  },
                  "& .Mui-selected": {
                    bgcolor: "#1976d2",
                    color: "#fff !important",
                  },
                }}
              >
                <Tab
                  icon={<ClassRoundedIcon />}
                  iconPosition="start"
                  label="Overview"
                />
                <Tab
                  icon={<PeopleAltRoundedIcon />}
                  iconPosition="start"
                  label="Students"
                />
              </Tabs>
            </Paper>
          </Grid>

          {/* MAIN CONTENT */}
          <Grid item xs={12} md={9}>
            {tabValue === 0 && (
              <Box>
                {/* HEADER */}
                <Typography variant="h5" fontWeight={700} mb={2}>
                  Subject Overview
                </Typography>

                {/* HORIZONTAL INFO CARDS */}
                <Grid container spacing={2} alignItems="stretch">
                  <Grid item xs={12} sm={4}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        bgcolor: "#1976d2",
                        color: "white",
                        "&:hover": { boxShadow: 6 },
                        transition: "0.3s",
                      }}
                    >
                      <SchoolRoundedIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                          Subject
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {subjectDetails?.subName || "N/A"}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        bgcolor: "#43a047",
                        color: "white",
                        "&:hover": { boxShadow: 6 },
                        transition: "0.3s",
                      }}
                    >
                      <PeopleAltRoundedIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                          Students
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {sclassStudents?.length || 0}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        bgcolor: "#8e24aa",
                        color: "white",
                        "&:hover": { boxShadow: 6 },
                        transition: "0.3s",
                      }}
                    >
                      <InsertChartRoundedIcon sx={{ fontSize: 40 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                          Sessions
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {subjectDetails?.sessions || 0}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>

                {/* TEACHER SECTION INLINE WITH CARD */}
                <Paper
                  elevation={3}
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    bgcolor: "#f5f5f5",
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor: "#1976d2",
                      fontSize: "1.6rem",
                    }}
                  >
                    {subjectDetails?.teacher
                      ? subjectDetails.teacher.name.charAt(0).toUpperCase()
                      : "T"}
                  </Avatar>
                  <Box>
                    {subjectDetails?.teacher ? (
                      <>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {subjectDetails.teacher.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Subject Teacher
                        </Typography>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate(
                            "/Admin/teachers/addteacher/" + subjectDetails?._id
                          )
                        }
                      >
                        Add Teacher
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h5" fontWeight={600}>
                    Students
                  </Typography>
                  <GreenButton
                    onClick={() =>
                      navigate("/Admin/class/addstudents/" + classID)
                    }
                  >
                    + Add Students
                  </GreenButton>
                </Box>

                {/* ATTENDANCE / MARKS TOGGLE */}
                <Box display="flex" gap={2} mb={2}>
                  <Button
                    variant={
                      selectedSection === "attendance"
                        ? "contained"
                        : "outlined"
                    }
                    color="primary"
                    onClick={() => setSelectedSection("attendance")}
                    sx={{ flex: 1 }}
                  >
                    Attendance
                  </Button>
                  <Button
                    variant={
                      selectedSection === "marks" ? "contained" : "outlined"
                    }
                    color="secondary"
                    onClick={() => setSelectedSection("marks")}
                    sx={{ flex: 1 }}
                  >
                    Marks
                  </Button>
                </Box>

                <Paper
                  sx={{ p: 2, borderRadius: 3, boxShadow: 2, bgcolor: "white" }}
                >
                  {selectedSection === "attendance" ? (
                    <TableTemplate
                      buttonHaver={StudentsAttendanceButtonHaver}
                      columns={studentColumns}
                      rows={studentRows}
                    />
                  ) : (
                    <TableTemplate
                      buttonHaver={StudentsMarksButtonHaver}
                      columns={studentColumns}
                      rows={studentRows}
                    />
                  )}
                </Paper>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewSubject;

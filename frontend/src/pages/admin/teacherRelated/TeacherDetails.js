import React, { useEffect } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector(
    (state) => state.teacher
  );

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(
      `/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <Card
              elevation={6}
              sx={{
                width: "100%",
                maxWidth: 650,
                borderRadius: 4,
                bgcolor: "#f9f9ff",
                p: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                {/* Page Title */}
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "#3f51b5" }}
                >
                  Teacher Details
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* Details Section */}
                <Grid container spacing={2}>
                  {/* Teacher Name */}
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6" sx={{ color: "#444" }}>
                        Teacher Name:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#1a237e",
                          ml: 1,
                        }}
                      >
                        {teacherDetails?.name || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Class Name */}
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6" sx={{ color: "#444" }}>
                        Class Name:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#1a237e",
                          ml: 1,
                        }}
                      >
                        {teacherDetails?.teachSclass?.sclassName || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Subject Details */}
                  {isSubjectNamePresent ? (
                    <>
                      <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="h6" sx={{ color: "#444" }}>
                            Subject Name:
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "#1a237e",
                              ml: 1,
                            }}
                          >
                            {teacherDetails?.teachSubject?.subName || "N/A"}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="h6" sx={{ color: "#444" }}>
                            Subject Sessions:
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "#1a237e",
                              ml: 1,
                            }}
                          >
                            {teacherDetails?.teachSubject?.sessions || "N/A"}
                          </Typography>
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12} mt={2}>
                      <Box textAlign="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddSubject}
                          sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "0 3px 10px rgba(63,81,181,0.3)",
                          }}
                        >
                          Add Subject
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </>
      )}
    </>
  );
};

export default TeacherDetails;

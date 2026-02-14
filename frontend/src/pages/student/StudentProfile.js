import React from "react";
import styled from "styled-components";
import {
  Typography,
  Grid,
  Box,
  Avatar,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
        <StyledPaper elevation={3}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {/* Profile Image */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="Student Avatar"
                  sx={{
                    width: 130,
                    height: 130,
                    bgcolor: "#1976d2",
                    fontSize: "3rem",
                    boxShadow: "0 4px 15px rgba(25,118,210,0.4)",
                  }}
                >
                  {String(currentUser.name).charAt(0).toUpperCase()}
                </Avatar>
              </Box>
            </Grid>

            {/* Name */}
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h2"
                align="center"
                sx={{ fontWeight: 700, color: "#0d47a1" }}
              >
                {currentUser.name}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: "#546e7a", fontStyle: "italic" }}
              >
                Student Profile
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1, bgcolor: "#90caf9" }} />
            </Grid>

            {/* Details */}
            <Grid item xs={12}>
              <Box sx={{ textAlign: "left", px: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, color: "#37474f" }}>
                  Roll Number:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, color: "#1a237e" }}
                  >
                    {currentUser.rollNum}
                  </Typography>
                </Typography>

                <Typography variant="h6" sx={{ mb: 1, color: "#37474f" }}>
                  Class:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, color: "#1a237e" }}
                  >
                    {sclassName.sclassName || "N/A"}
                  </Typography>
                </Typography>

                <Typography variant="h6" sx={{ color: "#37474f" }}>
                  School:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600, color: "#1a237e" }}
                  >
                    {studentSchool.schoolName || "N/A"}
                  </Typography>
                </Typography>
              </Box>
            </Grid>

            {/* Divider */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2, bgcolor: "#bbdefb" }} />
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </>
  );
};

export default StudentProfile;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 4,
  borderRadius: "20px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
}));

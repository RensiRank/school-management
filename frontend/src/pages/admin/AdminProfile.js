import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Grid,
  Paper,
} from "@mui/material";

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #0267b9ff, #21cbf3)",
            color: "white",
            p: 4,
            textAlign: "center",
          }}
        >
          <Avatar
            src={currentUser?.avatar || ""}
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto",
              border: "3px solid white",
              mb: 2,
            }}
          >
            {currentUser?.name?.[0]?.toUpperCase()}
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            {currentUser?.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {currentUser?.role || "Administrator"}
          </Typography>
        </Box>

        {/* Profile Details */}
        <Card sx={{ borderRadius: 0 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{currentUser?.name}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{currentUser?.email}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  School
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{currentUser?.schoolName}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default AdminProfile;

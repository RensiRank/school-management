import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  else if (error) console.log(error);

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileContainer>
      <ProfileCard>
        {/* Avatar */}
        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "#1565c0",
              fontSize: "3rem",
              boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
            }}
          >
            {String(currentUser.name).charAt(0).toUpperCase()}
          </Avatar>
        </Box>

        {/* Name */}
        <Typography
          variant="h4"
          align="center"
          sx={{ mt: 2, fontWeight: 700, color: "#0d47a1" }}
        >
          {currentUser.name}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "#546e7a", fontStyle: "italic" }}
        >
          Teacher Profile
        </Typography>

        <Divider sx={{ my: 3, bgcolor: "#bbdefb" }} />

        {/* Info */}
        <ProfileCardContent>
          <ProfileText>
            <span>📧 Email:</span> {currentUser.email}
          </ProfileText>
          <ProfileText>
            <span>🏫 School:</span> {teachSchool?.schoolName || "N/A"}
          </ProfileText>
          <ProfileText>
            <span>📘 Class:</span> {teachSclass?.sclassName || "N/A"}
          </ProfileText>
          <ProfileText>
            <span>📖 Subject:</span> {teachSubject?.subName || "N/A"}
          </ProfileText>
        </ProfileCardContent>

        <Divider sx={{ my: 3, bgcolor: "#e3f2fd" }} />
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TeacherProfile;

// 🌟 Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd, #ffffff);
`;

const ProfileCard = styled(Card)`
  width: 420px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: #fff;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 40px;
  padding-right: 40px;
`;

const ProfileText = styled(Typography)`
  margin: 10px 0;
  font-size: 1.1rem;
  color: #37474f;
  span {
    font-weight: 600;
    color: #1a237e;
  }
`;

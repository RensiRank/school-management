import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Container,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { AccountCircle, School, Group } from "@mui/icons-material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";

const roles = [
  {
    title: "Admin",
    icon: <AccountCircle />,
    desc: "Manage system users and application data",
    path: "Admin",
  },
  {
    title: "Student",
    icon: <School />,
    desc: "Access courses and track progress",
    path: "Student",
  },
  {
    title: "Teacher",
    icon: <Group />,
    desc: "Create and manage courses",
    path: "Teacher",
  },
];

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (visitor === "guest") {
      setLoader(true);

      if (user === "Admin") {
        dispatch(loginUser({ email: "yogendra@12", password }, user));
      }
      if (user === "Student") {
        dispatch(
          loginUser(
            { rollNum: "1", studentName: "Dipesh Awasthi", password },
            user
          )
        );
      }
      if (user === "Teacher") {
        dispatch(loginUser({ email: "tony@12", password }, user));
      }
    } else {
      navigate(`/${user}login`);
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <Wrapper>
      <Container maxWidth="md">
        <Title variant="h4">Welcome 👋</Title>
        <SubTitle>Select your role to continue</SubTitle>

        <Grid container spacing={3}>
          {roles.map((role, i) => (
            <Grid item xs={12} key={i}>
              <Card onClick={() => navigateHandler(role.path)}>
                <IconBox>{role.icon}</IconBox>

                <Content>
                  <Typography variant="h6" fontWeight="600">
                    {role.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {role.desc}
                  </Typography>
                </Content>

                <Arrow>→</Arrow>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Backdrop open={loader} sx={{ color: "#fff", zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Wrapper>
  );
};

export default ChooseUser;

/* ========= STYLES ========= */

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  align-items: center;
`;

const Title = styled(Typography)`
  text-align: center;
  font-weight: bold !important;
`;

const SubTitle = styled.p`
  text-align: center;
  margin-bottom: 30px;
  color: #6b7280;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 20px;
  background: white;
  border-radius: 14px;
  cursor: pointer;

  border: 1px solid #e5e7eb;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: #2563eb;
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
  }
`;

const IconBox = styled(Box)`
  background: #eff6ff;
  color: #2563eb;
  border-radius: 10px;
  padding: 10px;
  margin-right: 15px;
  font-size: 28px;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

const Arrow = styled.div`
  font-size: 20px;
  color: #9ca3af;
`;
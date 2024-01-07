import SplashBackground from "@component/SplashBackground/SplashBackground";
import { Box, Button, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import ImageResponseDTO from "@api/dto/response/image/ImageResponseDTO";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApi from "@hook/api/useApi";
import { useRandomImage } from "@hook/image/useRandomImage";

/**
 * Home component containing the home of the application.
 */
export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backgroundImage = useRandomImage();

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('token')));
  }, []);

  const onAccessButtonClick = useCallback(() => {
    navigate("/portfolio");
  }, []);

  const onLoginButtonClick = useCallback(() => {
    navigate("user/authentication");
  }, []);

  const onLogoutButtonClick = useCallback(() => {
    navigate("user/logout");
  }, []);

  return (
    <HomeWrapper>
      <TitleContainer>
        <ApplicationTitle>PortFavor</ApplicationTitle>
        <ApplicationSubtitle>Un portfolio de FOU FURIEUX</ApplicationSubtitle>
        <Box marginTop={5}>
          <Button variant="contained" onClick={onAccessButtonClick}
            style={{ zIndex: "1", width: "45%", marginRight: "5px" }}>
            Accéder
          </Button>
          <Button variant="outlined" onClick={isLoggedIn ? onLogoutButtonClick : onLoginButtonClick} 
            style={{ zIndex: "1", width: "45%" }}>
            {isLoggedIn ? 'Deconnexion' : 'Se connecter'}
          </Button>
        </Box>
      </TitleContainer>
      <SplashBackground src={backgroundImage.src} alt={backgroundImage.alt}/>
    </HomeWrapper>
  );
}

const HomeWrapper = styled("div")(() => ({
  position: "relative",
  backgroundColor: useTheme().palette.background.default,
  height: "100vh",
}));

const TitleContainer = styled("div")(() => ({
  position: "absolute",
  top: "40%",
  left: "5%",
  zIndex: "1",
}));

const commonTitleStyle = {
  zIndex: "1",
  margin: "0",
  color: "black"
};

const ApplicationTitle = styled("h1")(() => ({
  fontSize: "3rem",
  ...commonTitleStyle,
}));

const ApplicationSubtitle = styled("h3")(() => ({
  fontSize: "2rem",
  fontWeight: "normal",
  ...commonTitleStyle
}));

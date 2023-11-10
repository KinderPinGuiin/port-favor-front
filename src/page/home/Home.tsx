import { Box, Button, styled } from "@mui/material";
import backgroundPath from "@assets/home/background.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Home component containing the home of the application.
 */
export default function Home() {
  const navigate = useNavigate();

  const onLoginButtonClick = useCallback(() => {
    navigate("/login");
  }, []);

  return (
    <HomeWrapper>
      <TitleContainer>
        <ApplicationTitle>PortFavor</ApplicationTitle>
        <ApplicationSubtitle>Un portfolio de FOU FURIEUX</ApplicationSubtitle>
        <Box marginTop={5}>
          <Button variant="contained" style={{ zIndex: "1", width: "45%", marginRight: "5px" }}>
            Accéder
          </Button>
          <Button variant="outlined" onClick={onLoginButtonClick} style={{ zIndex: "1", width: "45%" }}>
            Se connecter
          </Button>
        </Box>
      </TitleContainer>
      <SplashBackgroundContainer>
        <IllustrationImage src="https://picsum.photos/600" alt="Random test picture" />
      </SplashBackgroundContainer>
    </HomeWrapper>
  );
}

const HomeWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.secondary.main,
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

const SplashBackgroundContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0",
  right: "0",
  zIndex: "0",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "100%",
  width: "70%",
  backgroundColor: theme.palette.primary.main,
  maskImage: `url(${backgroundPath})`,
  maskSize: "cover",
}));

const IllustrationImage = styled("img")(() => ({
  height: "60%",
  width: "auto",
  aspectRatio: "1 / 1", 
  marginRight: "10%",
  boxShadow: "0px 5px 15px 5px rgba(0, 0, 0, 0.3)",
}));

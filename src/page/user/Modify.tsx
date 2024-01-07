import APIEndpoint from "@api/endpoint/APIEndpoint";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import FormContainer from "@component/FormContainer/FormContainer";
import SplashBackground from "@component/SplashBackground/SplashBackground";
import useApiMutation from "@hook/api/useApiMutation";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useCallback, useRef, useState } from "react";
import { useEffect } from 'react';
import { Snackbar } from '@mui/material';
import UpdateUserRequestDTO from "@api/dto/request/user/UpdateUserRequestDTO";
import UpdateUserPasswordRequestDTO from "@api/dto/request/user/UpdateUserPasswordRequestDTO";
import { useRandomImage } from "@hook/image/useRandomImage";

export default function Modify() {
 const navigate = useNavigate();
 const [errorMessage, setErrorMessage] = useState("");
 const emailRef = useRef<HTMLInputElement | null>(null);
 const oldPasswordRef = useRef<HTMLInputElement | null>(null);
 const newPasswordRef = useRef<HTMLInputElement | null>(null);
 const [formMode, setFormMode] = useState<'email' | 'password'>("email");
 const { mutate, data: data, isLoading: isLoading, isError: isError, error: apiError } =
  useApiMutation(formMode === 'email' ? APIEndpoint.UPDATE_USER_EMAIL : APIEndpoint.UPDATE_USER_PASSWORD, null, false);
  const backgroundImage = useRandomImage();

  const updateEmail = useCallback((e: SyntheticEvent) => {
    e.preventDefault();

    // Get form values
    const email = emailRef.current?.value ?? "";

    // Call API
    mutate(new UpdateUserRequestDTO(email));
  }, []);

 const updatePassword = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
  
    // Get form values
    const oldPassword = oldPasswordRef.current?.value ?? "";
    const newPassword = newPasswordRef.current?.value ?? "";
  
    // Call API
    mutate(new UpdateUserPasswordRequestDTO(oldPassword, newPassword));
 }, []);

 // Handling authentication
 useEffect(() => {
  console.log(formMode);
   if (data && formMode === "password") {
     navigate("/user/logout");
   } else if (data) { 
    navigate("/");
   }
   if (isError && apiError) {
     setErrorMessage(apiError.message || 'Une erreur inconnue est survenue');
   }
 }, [data, isError, apiError]);

 return (
   <>
     <Snackbar
       open={isError}
       autoHideDuration={6000}
       message={errorMessage}
     />
     <CenterDiv sx={{ width: "clamp(400px, 30%, 500px)", height: "100vh", marginLeft: "5%" }} direction="column">
       <div style={{ width: "100%" }}>
         <h1>{formMode === 'email' ? 'Editer le mail' : 'Editer le mot de passe'}</h1>
       </div>
       {formMode === 'email' && (
       <FormContainer style={{ width: "100%" }} method="POST" 
         action={APIEndpoint.UPDATE_USER_EMAIL.toApiUrl()} onSubmit={updateEmail}>
         <TextField label="Adresse mail" variant="outlined" inputRef={emailRef} />
         <Button variant="contained" type="submit" disabled={isLoading}>
           {isLoading ? <CircularProgress size={25} /> : "editer"}
         </Button>
         <Button variant="outlined" type="button" 
         onClick={() => setFormMode('password')} disabled={isLoading}>
          {isLoading ? <CircularProgress size={25} /> : "Changer le mot de passe"}
        </Button>
       </FormContainer>
     )}
     {formMode === 'password' && (
       <FormContainer style={{ width: "100%" }} method="POST" 
         action={APIEndpoint.UPDATE_USER_PASSWORD.toApiUrl()} onSubmit={updatePassword}>
         <TextField type="password" label="Ancien mot de passe" variant="outlined" inputRef={oldPasswordRef} />
         <TextField type="password" label="Nouveau mot de passe" variant="outlined" inputRef={newPasswordRef} />
         <Button variant="contained" type="submit" disabled={isLoading}>
           {isLoading ? <CircularProgress size={25} /> : "editer"}
         </Button>
         <Button variant="outlined" type="button" 
         onClick={() => setFormMode('email')} disabled={isLoading}>
          {isLoading ? <CircularProgress size={25} /> : "Changer l'adresse email"}
        </Button>
       </FormContainer>
     )}
    </CenterDiv>
    <SplashBackground src={backgroundImage.src} alt={backgroundImage.alt}/>
   </>
 )
}

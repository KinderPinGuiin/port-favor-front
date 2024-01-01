import AuthenticationRequestDTO from "@api/dto/request/authentication/AuthenticationRequestDTO";
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
import RegistrationRequestDTO from "@api/dto/request/authentication/RegistrationRequestDTO";

export default function Login() {
 const navigate = useNavigate();
 const [errorMessage, setErrorMessage] = useState("");
 const loginRef = useRef<HTMLInputElement | null>(null);
 const passwordRef = useRef<HTMLInputElement | null>(null);
 const [formMode, setFormMode] = useState<'login' | 'register'>('login');
 const { mutate, data: data, isLoading: isLoading, isError: isError, error: apiError } =
   useApiMutation(formMode === 'login' ? APIEndpoint.LOGIN : APIEndpoint.REGISTER, null, false);

 const sendRequest = useCallback((e: SyntheticEvent) => {
   e.preventDefault();

   // Get form values
   const login = loginRef.current?.value ?? "";
   const password = passwordRef.current?.value ?? "";

   // Call API
   mutate(formMode === 'login' ? new AuthenticationRequestDTO(login, password): new RegistrationRequestDTO(login, password));
 }, [formMode]);

 // Handling authentication
 useEffect(() => {
   if (data && !localStorage.getItem('token')) {
     localStorage.setItem("token", data.token);
    //  TODO corriger problem de mixe username/login
     localStorage.setItem("login", data.email);
     localStorage.setItem("roles", JSON.stringify(data.roles));
     navigate("/");
   } else if (isError && apiError) {
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
         <h1>{formMode === 'login' ? 'Connexion' : 'Inscription'}</h1>
       </div>
       <FormContainer style={{ width: "100%" }} method="POST" 
        action={formMode === 'login' ? APIEndpoint.LOGIN.toApiUrl() : APIEndpoint.REGISTER.toApiUrl()} onSubmit={sendRequest}>
         <TextField label="Adresse mail" variant="outlined" inputRef={loginRef} />
         <TextField type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef} />
         <Button variant="contained" type="submit" disabled={isLoading}>
           {isLoading ? <CircularProgress size={25} /> : formMode === 'login' ? 'Se connecter' : "S'inscrire"}
         </Button>
         <Button variant="outlined" type="button" 
          onClick={() => setFormMode(formMode === 'login' ? 'register' : 'login')} disabled={isLoading}>
           {isLoading ? <CircularProgress size={25} /> : formMode === 'login' ? "S'inscrire" : "Se connecter"}
         </Button>
       </FormContainer>
     </CenterDiv>
     <SplashBackground src="https://picsum.photos/600" alt="Random test picture" />
   </>
 )
}

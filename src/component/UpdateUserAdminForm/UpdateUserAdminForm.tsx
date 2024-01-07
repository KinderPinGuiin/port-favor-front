import UpdateUserAdminRequestDTO from "@api/dto/request/user/UpdateUserAdminRequestDTO";
import UserResponseDTO from "@api/dto/response/user/UserResponseDTO";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import { useRef } from "react";

export type UpdateUserAdminFormProps = {
  currentUser: UserResponseDTO;

  onSubmit: (newUser: UpdateUserAdminRequestDTO) => void;
};

export default function UpdateUserAdminForm({
  currentUser,
  onSubmit,
}: UpdateUserAdminFormProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAdminRef = useRef<HTMLInputElement | null>(null);
  const isPrivateRef = useRef<HTMLInputElement | null>(null);
  const roleNames = currentUser.roles.map(role => role.name);

  const handleSubmit = () => {
    const passwordValue = passwordRef.current?.value;
    const password = typeof passwordValue === 'string' && passwordValue !== '' ? passwordValue : null;
    const isAdmin = isAdminRef.current?.checked ?? false;
    const isPrivate = isPrivateRef.current?.checked ?? false;
    let roles;
    if (isAdmin && isPrivate) {
      roles = ["USER", "PRIVATE_USER", "ADMIN"];
    } else if (isAdmin) {
      roles = ["USER", "ADMIN"];
    } else if (isPrivate) {
      roles = ["USER", "PRIVATE_USER"];
    } else {
      roles = ["USER"];
    }

    onSubmit({
      id: currentUser.id,
      email: emailRef.current?.value ?? "",
      password: password,
      roles: roles,
    });
  };

  return (
    <>
      <FormGroup sx={{ width: "90%" }}>
        <h2>Editer un utilisateur</h2>
        <TextField label="Adresse mail" variant="outlined" inputRef={emailRef}
        defaultValue={currentUser.email}  style={{ marginBottom: "20px"}}/>
        <TextField type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef} />
        <Grid container>
          <Grid item xs={6}>
            <FormControlLabel style={{
              marginLeft: "left"
            }} control={<Checkbox inputRef={isAdminRef} 
              defaultChecked={roleNames.includes("ADMIN")}/>} label="Administrateur ?" />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel style={{
              marginRight: "right"
            }} control={<Checkbox inputRef={isPrivateRef} 
              defaultChecked={roleNames.includes("PRIVATE_USER")}/>} label="Accès privé ?" />
          </Grid>
        </Grid>
        <Button 
          variant="contained"
          type="submit" 
          onClick={handleSubmit}
          style={{ marginBottom: "10px"}}
        >
          Editer
        </Button>
      </FormGroup>
    </>
  );
}

import UpdateUserAdminRequestDTO from "@api/dto/request/user/UpdateUserAdminRequestDTO";
import UserResponseDTO from "@api/dto/response/user/UserResponseDTO";
import { Button, FormGroup, TextField } from "@mui/material";
import { useRef } from "react";

export type UpdateUserFormProps = {
  currentUser: UserResponseDTO;

  onSubmit: (newUser: UpdateUserAdminRequestDTO) => void;
};

export default function UpdateUserForm({
  currentUser,
  onSubmit,
}: UpdateUserFormProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <FormGroup>
        <h2>Editer un utilisateur</h2>
        <TextField label="Adresse mail" variant="outlined" inputRef={emailRef}
        defaultValue={currentUser.email}  style={{ marginBottom: "10px"}}/>
        <TextField type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef} />
        <Button 
          variant="contained"
          type="submit" 
          onClick={() => onSubmit({ 
            id: currentUser.id,
            newLogin: emailRef.current?.value ?? "", 
            newPassword: passwordRef.current?.value ?? "",
            newRoles: currentUser.roles
          })}
        >
          Editer
        </Button>
      </FormGroup>
    </>
  );
}

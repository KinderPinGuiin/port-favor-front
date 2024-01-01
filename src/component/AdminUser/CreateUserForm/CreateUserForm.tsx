import RoleDTO from "@api/dto/response/role/RoleDTO";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { useRef } from "react";

export type CreateUserFormProps = {
  onSubmit: (createdUser: { login: string, password: string, roles: RoleDTO[] }) => void
}

/**
 * Form used to create a user.
 */
export default function CreateUserForm({ onSubmit }: CreateUserFormProps) {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAdminRef = useRef<HTMLInputElement | null>(null);
  const isPrivateRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    const isAdmin = isAdminRef.current?.checked ?? false;
    const isPrivate = isPrivateRef.current?.checked ?? false;
    let roles;
    if (isAdmin && isPrivate) {
      roles = [new RoleDTO("USER"), new RoleDTO("PRIVATE_USER"), new RoleDTO("ADMIN")];
    } else if (isAdmin) {
      roles = [new RoleDTO("USER"), new RoleDTO("ADMIN")];
    } else if (isPrivate) {
      roles = [new RoleDTO("USER"), new RoleDTO("PRIVATE_USER")];
    } else {
      roles = [new RoleDTO("USER")];
    }

    onSubmit({
      login: loginRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
      roles: roles,
    });
  };
  
  return (
    <>
      <FormGroup>
        <h2>Créer un utilisateur</h2>
        <TextField label="Adresse mail" variant="outlined" inputRef={loginRef} style={{ marginBottom: "10px"}}/>
        <TextField type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef}/>
        <FormControlLabel control={<Checkbox inputRef={isAdminRef} />} label="Administrateur ?" />
        <FormControlLabel control={<Checkbox inputRef={isPrivateRef} />} label="Accès privé ?" />
        <Button 
          variant="contained"
          type="submit" 
          onClick={handleSubmit}
        >
          Créer
        </Button>
      </FormGroup>
    </>
  )
}
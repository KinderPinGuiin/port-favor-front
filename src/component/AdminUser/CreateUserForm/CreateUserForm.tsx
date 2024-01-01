import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material"
import { useRef } from "react";

export type CreateUserFormProps = {
  onSubmit: (createdUser: { email: string, password: string, roles: string[] }) => void
}

/**
 * Form used to create a user.
 */
export default function CreateUserForm({ onSubmit }: CreateUserFormProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAdminRef = useRef<HTMLInputElement | null>(null);
  const isPrivateRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
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
      email: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
      roles: roles,
    });
  };
  
  return (
    <>
      <FormGroup>
        <h2>Créer un utilisateur</h2>
        <TextField label="Adresse mail" variant="outlined" inputRef={emailRef} style={{ marginBottom: "10px"}}/>
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
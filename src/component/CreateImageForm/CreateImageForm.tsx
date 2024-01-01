import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material"
import { ChangeEvent, useRef, useState } from "react";

export type CreateImageFormProps = {
  onSubmit: (createdImage: { name: string, description: string, isPublic: boolean, imageData: File }) => void
}

/**
 * Form used to create a image.
 */
export default function CreateImageForm({ onSubmit }: CreateImageFormProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const isPublicRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
    setFileName(e.target.files![0].name);
  };

  const handleSubmit = () => {
    onSubmit({
      name: nameRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      isPublic: isPublicRef.current?.checked ?? true,
      imageData: image!,
    });
  };

  return (
    <>
      <FormGroup>
        <h2>Créer une image</h2>
        <TextField label="Nom" variant="outlined" inputRef={nameRef} style={{ marginBottom: "10px"}}/>
        <TextField label="Description" variant="outlined" inputRef={descriptionRef}/>
        <FormControlLabel control={<Checkbox inputRef={isPublicRef} />} label="Publique ?" />
        <Button style={{ marginBottom: "10px"}}
          variant="outlined"
          component="label"
        >
          Charger l'image
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </Button>
        <Typography style={{ marginBottom: "10px"}}>{fileName}</Typography >
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
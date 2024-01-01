import UpdateImageRequestDTO from "@api/dto/request/image/UpdateImageRequestDTO";
import ImageResponseDTO from "@api/dto/response/image/ImageResponseDTO";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useRef } from "react";

export type UpdateImageFormProps = {
  currentImage: ImageResponseDTO;

  onSubmit: (newImage: UpdateImageRequestDTO) => void;
};

export default function UpdateImageForm({
  currentImage,
  onSubmit,
}: UpdateImageFormProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const isPublicRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    onSubmit({
      id: currentImage.id,
      name: nameRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      isPublic: isPublicRef.current?.checked ?? true
    });
  };

  return (
    <>
      <FormGroup>
        <h2>Editer une image</h2>
        <TextField label="Nom" variant="outlined" inputRef={nameRef}
        defaultValue={currentImage.name}  style={{ marginBottom: "10px"}}/>
        <TextField label="Description" variant="outlined" inputRef={descriptionRef} 
        defaultValue={currentImage.name} />
        <FormControlLabel control={<Checkbox inputRef={isPublicRef} />} label="Publique ?" />
        <Button 
          variant="contained"
          type="submit" 
          onClick={handleSubmit}
        >
          Editer
        </Button>
      </FormGroup>
    </>
  );
}

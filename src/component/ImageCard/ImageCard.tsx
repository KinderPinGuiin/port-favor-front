import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from "@mui/material";
import { useDownloadImage } from "@hook/image/useDownloadImage";
import { Snackbar } from '@mui/material';
import { IconButton } from '@mui/material';
import ImageResponseDTO from "@api/dto/response/image/ImageResponseDTO";
import APIEndpoint from "@api/endpoint/APIEndpoint";

export type ImageCardProps = {
  image: ImageResponseDTO;
};

export default function ImageCard({ image }: ImageCardProps) {
  const theme = useTheme();
  const { path, name, description, pub } = image;
  const defaultName = "Nom de l'image";
  const defaultDescription = "Description de l'image";
  const token = localStorage.getItem("token");
  const url = APIEndpoint.GET_IMAGE_CONTENT.toApiUrl().replace("{name}", path) + (token != null ? "?token=" + token : "")

  const { downloadImage, error } = useDownloadImage();
  const handleDownload = async () => {
    await downloadImage(url, name || 'image');
  };

  return (
    <>
      <Snackbar
         open={error !== null}
         autoHideDuration={6000}
         message={error || ''}
       />
    <Card>
      <Grid container>
        <Grid item xs={8}>
          <CardMedia
            component="img"
            image={url}
            alt={name || defaultName}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            }}
          />
        </Grid>
        <Grid item xs={4} overflow="auto">
          <CardContent>
            <Typography variant="h5" component="div" style={{ marginBottom: "20px", overflow: "auto" }}>
              {name || defaultName}
            </Typography>
            <Typography variant="subtitle1" component="div" color="text.secondary" style={{ 
                paddingBottom: "10px", overflow: "auto"
              }}>
              {description || defaultDescription}
            </Typography>
            <Typography variant="subtitle2" component="div" color="text.secondary" style={{ 
              position: "absolute", bottom: "15px", right: "45px", color: theme.palette.primary.light }}>
              {pub ? "Publique" : "Privée"}
            </Typography>
            <IconButton aria-label="Télécharger l'image" sx={{ 
              color: theme.palette.primary.light,
              position: "absolute",
              bottom: "5px",
              right: "5px", paddingTop: "10px",}}>
            <DownloadIcon onClick={handleDownload}/>
            </IconButton>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
</>
  );
}

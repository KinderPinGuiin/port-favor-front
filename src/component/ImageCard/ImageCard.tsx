import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
// import { useTheme } from "@mui/material";
import { useDownloadImage } from "@hook/image/useDownloadImage";
import { Snackbar } from '@mui/material';

export type ImageCardProps = {
  image: {
    src: string;
    name: string;
    description: string;
  };
};

export default function ImageCard({ image }: ImageCardProps) {
  // const theme = useTheme();
  const { src, name, description } = image;
  const defaultName = "Nom de l'image";
  const defaultDescription = "Description de l'image Description de l'imageDescription de l'image";

  const { downloadImage, error } = useDownloadImage();
  const handleDownload = async () => {
    await downloadImage(src, name || 'image');
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
        <Grid item xs={9}>
          <CardMedia
            component="img"
            image={src}
            alt={name || defaultName}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            }}
          />
        </Grid>
        <Grid item xs={3} overflow="auto">
          <CardContent>
            <Typography variant="h5" component="div" style={{ paddingBottom: "10px" }}>
              {name || defaultName}
            </Typography>
            <Typography variant="subtitle1" component="div" color="text.secondary">
              {description || defaultDescription}
            </Typography>
            <Button variant="contained" startIcon={<DownloadIcon style={{ fontSize: "2rem", cursor: "pointer"}}/>}
              onClick={handleDownload}
              style={{
                position: 'absolute',
                bottom: 1,
                right: 1
              }}
            >Télécharger
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
</>
  );
}

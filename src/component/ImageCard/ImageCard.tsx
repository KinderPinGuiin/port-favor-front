import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from "@mui/material";
import { useDownloadImage } from "@hook/image/useDownloadImage";
import { Snackbar } from '@mui/material';
import { IconButton } from '@mui/material';

export type ImageCardProps = {
  image: {
    src: string;
    name: string;
    description: string;
  };
};

export default function ImageCard({ image }: ImageCardProps) {
  const theme = useTheme();
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
        <Grid item xs={8}>
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
        <Grid item xs={4} overflow="auto">
          <CardContent>
            <Typography variant="h5" component="div" style={{ paddingBottom: "10px" }}>
              {name || defaultName}
            </Typography>
            <Typography variant="subtitle1" component="div" color="text.secondary" style={{ paddingBottom: "10px"}}>
              {description || defaultDescription}
            </Typography>
            <IconButton aria-label="Télécharger l'image" sx={{ color: theme.palette.primary.light }}>
            <DownloadIcon onClick={handleDownload}/>
            </IconButton>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
</>
  );
}

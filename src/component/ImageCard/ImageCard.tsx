import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export type ImageCardProps = {
    image: {
    src: string;
    name: string;
    description: string;
    };
   }

export default function ImageCard({ image }: ImageCardProps) {
  const { src, name, description } = image;
  const defaultName = "Nom de l'image";
  const defaultDescription = "Description de l'image Description de l'imageDescription de l'image";

  return (
    <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            image={src}
            alt={name || defaultName}
            style={{
              maxWidth: 'calc(100vw - 40px)',
              maxHeight: 'calc(100vh - 40px)',
            }}
          />
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ }}>
      <Typography variant="h5" component="div" style={{ paddingBottom: "10px "}}>
              {name || defaultName}
            </Typography>
    <Typography variant="subtitle1" component="div" color="text.secondary">
        {description || defaultDescription }
    </Typography>
      </CardContent>
    </Box>
  </Card>
  );
}

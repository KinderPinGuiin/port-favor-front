import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

export type ImageCardProps = {
  image: {
    src: string;
    name: string;
    description: string;
  };
};

export default function ImageCard({ image }: ImageCardProps) {
  const { src, name, description } = image;
  const defaultName = "Nom de l'image";
  const defaultDescription = "Description de l'image Description de l'imageDescription de l'image";

  return (
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
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

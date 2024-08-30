import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Grid } from '@mui/material';

const handleCategoryColor = (category) => {
  if (!category) return 'default'; // Retorna un color predeterminado si la categoría no está definida
  switch (category.toLowerCase()) {
    case 'business': return 'primary';
    case 'technology': return 'secondary';
    case 'sports': return 'success';
    case 'health': return 'error';
    default: return 'default';
  }
};

const NewsCard = ({ noticia }) => {
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',  // Asegura que la tarjeta use todo el alto disponible
      m: 2,
      boxShadow: 0,
      '&:hover': { boxShadow: 0 }
    }}>
      <CardMedia
        component="img"
        sx={{ height: 140 }}  // Altura fija para las imágenes
        image={noticia.urlToImage || 'path/to/default/image.jpg'}
        alt={noticia.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
          {noticia.title}
        </Typography>
        {noticia.category && (
          <Chip
            label={noticia.category}
            color={handleCategoryColor(noticia.category)}
            size="small"
            sx={{ mb: 1 }}
          />
        )}
        <Typography variant="body2" color="text.secondary">
          {noticia.description || "No description available."}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" color="primary" href={noticia.url} target="_blank" rel="noopener">
          Leer más
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default NewsCard;
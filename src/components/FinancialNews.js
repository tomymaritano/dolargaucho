import React, { useEffect, useState } from 'react';
import newsAxiosInstance from '../api/newsAxiosConfig';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Link, Tabs, Tab } from '@mui/material';

const categories = ['business', 'technology', 'economy', 'markets', 'investing'];

const FinancialNews = () => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('business');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsAxiosInstance.get('/top-headlines', {
          params: {
            category: selectedCategory,
            country: 'us',
            apiKey: 'ee447406883f43408ee0995583835851',
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Últimas Noticias Financieras
      </Typography>
      <Tabs value={selectedCategory} onChange={handleCategoryChange} centered>
        {categories.map((category) => (
          <Tab key={category} label={category.charAt(0).toUpperCase() + category.slice(1)} value={category} />
        ))}
      </Tabs>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {news.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {article.urlToImage && (
                <CardMedia
                  component="img"
                  height="140"
                  image={article.urlToImage}
                  alt={article.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  <Link href={article.url} target="_blank" rel="noopener" color="inherit" underline="none">
                    {article.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.source.name}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                  {article.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FinancialNews;

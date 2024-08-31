import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Container, Box, Typography, Grid } from '@mui/material';

const tweetIds = [
  "1829707710826270962",
  "1829182448019845360",
  "1829707710826270962",
  "1823061998558757211",
  "1829648385340788998",
  "1829675699013333165",

  // Añade aquí más IDs de tweets
];

const TweetsSection = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" >
        Lo ultimo en X
      </Typography>
      <Grid container spacing={2}>
        {tweetIds.slice(0, 12).map((tweetId, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
            >
              <TwitterTweetEmbed tweetId={tweetId} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TweetsSection;

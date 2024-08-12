import React, { useEffect, useState } from 'react';
import twitterAxiosInstance from '../api/twitterAxiosConfig';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';

const ImportantTweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const userHandles = ['BillGates', 'elonmusk', 'JMilei', 'JeffBezos', 'realDonaldTrump'];
        const userIdsResponse = await twitterAxiosInstance.get('/users/by', {
          params: {
            usernames: userHandles.join(','),
            'user.fields': 'profile_image_url',
          },
        });

        const userIds = userIdsResponse.data.data.map(user => user.id);

        const tweetPromises = userIds.map(id =>
          twitterAxiosInstance.get(`/users/${id}/tweets`, {
            params: {
              max_results: 5, // Número de tweets por usuario
              'tweet.fields': 'created_at',
            },
          })
        );

        const tweetsResponses = await Promise.all(tweetPromises);
        const tweetsData = tweetsResponses.flatMap(response => response.data.data);

        setTweets(tweetsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tweets de Personas Importantes
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        tweets.map((tweet, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Avatar src={tweet.author.profile_image_url} alt={tweet.author.username} sx={{ marginRight: 2 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                @{tweet.author.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(tweet.created_at).toLocaleDateString()} {new Date(tweet.created_at).toLocaleTimeString()}
              </Typography>
              <Typography variant="body1">{tweet.text}</Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ImportantTweets;

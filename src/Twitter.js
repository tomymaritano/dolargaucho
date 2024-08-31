require('dotenv').config();
const { Client } = require('twitter-api-sdk');

async function fetchTweets() {
  const client = new Client(process.env.TWITTER_BEARER_TOKEN);

  try {
    const response = await client.tweets.usersIdTweets({
      id: 'tmaritanodev', // Reemplaza con el ID de tu usuario de Twitter
      "tweet.fields": ["created_at", "text", "author_id"],
      "expansions": ["author_id"],
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}

module.exports = fetchTweets;

import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const TweetsEmbed = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <TwitterTweetEmbed tweetId={'1442134717317357570'} /> {/* Tweet de Donald Trump */}
      <TwitterTweetEmbed tweetId={'1470708977232900101'} /> {/* Tweet de Javier Milei */}
    </div>
  );
};

export default TweetsEmbed;

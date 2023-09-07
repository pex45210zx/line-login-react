import { useState } from 'react';
import liff from '@line/liff';
import './App.css';

const LiffLoginExample = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = async () => {
    try {
      await liff.init({ liffId: '2000665579-jvJl5OyP' });

      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const profile = await liff.getProfile();
        setProfilePicture(profile.pictureUrl);
        setUserId(profile.userId);

        // After the user is logged in, send a message to the user
        sendMessageToUser(profile.userId);
      }
    } catch (error) {
      console.error('LIFF initialization failed:', error);
    }
  };

  const handleLogout = () => {
    if (liff.isLoggedIn()) {
      liff.logout();
      setProfilePicture('');
      setUserId('');
    }
  };

  const sendMessageToUser = async (userId) => {
    try {
      // Replace with your LINE Messaging API access token and your message content
      const accessToken = 'yDmTxLHJQNxhaFUOCGbQD9k0z9W8GqB8wZ0gSEwzxXJRuZu//E97fIuQvEQBxSVQpp+2eubaXpy2xobdI9d6jivZIAz6k4Pah+sIIFYGOH3igxc1Z5pCGh9MEy+Vylkf+Y4aKgXUs1jEzHYj+Aj+dwdB04t89/1O/w1cDnyilFU=';
      const message = 'Hello, this is a test message from your LINE OA!';

      const response = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          to: userId,
          messages: [
            {
              type: 'text',
              text: message,
            },
          ],
        }),
      });

      if (response.status === 200) {
        console.log('Message sent successfully');
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      {!profilePicture ? (
        <button onClick={handleLogin}>Login with LIFF</button>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <img src={profilePicture} alt="Profile Picture" />
          <p>User ID: {userId}</p>
        </div>
      )}
    </div>
  );
};

export default LiffLoginExample;

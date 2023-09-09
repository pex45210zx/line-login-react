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

  return (
    <div>
      {!profilePicture ? (
        <button onClick={handleLogin}>Login with LIFF</button>
      ) : (
        <div>
          <Home />
          <button onClick={handleLogout}>Logout</button>
          <img src={profilePicture} alt="Profile Picture" />
          <p>User ID: {userId}</p>
        </div>
      )}
    </div>
  );
};

export default LiffLoginExample;

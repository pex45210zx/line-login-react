import { useState } from 'react';
import liff from '@line/liff';
import './App.css';

const LiffLoginExample = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    try {
      await liff.init({ liffId: '2000052936-p89nlAre' });

      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const profile = await liff.getProfile();
        setProfilePicture(profile.pictureUrl);
        setDisplayName(profile.displayName);
        setUserId(profile.userId);
        setEmail(profile.email);
      }
    } catch (error) {
      console.error('LIFF initialization failed:', error);
    }
  };

  const handleLogout = () => {
    if (liff.isLoggedIn()) {
      liff.logout();
      setProfilePicture('');
      setDisplayName('');
      setUserId('');
      setEmail('');
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
          <p>{displayName}</p>
          <p>{userId}</p>
          <p>{email}</p>
        </div>
      )}
    </div>
  );
};

export default LiffLoginExample;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import liff from '@line/liff'

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

        // To get user's email, you need the 'profile' LIFF scope.
        // Make sure you've requested this scope during LIFF initialization.
        const decodedIDToken = await liff.getDecodedIDToken();
        setEmail(decodedIDToken.email);
      }
    } catch (error) {
      console.error('LIFF initialization failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with LIFF</button>
      {profilePicture && (
        <div>
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

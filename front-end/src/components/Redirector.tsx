import React from 'react';
import Home from './Groups/Home';
import Landing from './Home';

const Redirector: React.FC = () => {
  // Get the 'access_token' cookie
  const accessTokenCookie = document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('access_token='));

  // Extract the token value without the 'access_token=' prefix
  const accessToken = accessTokenCookie ? accessTokenCookie.split('=')[1] : undefined;

  return <>{accessToken ? <Home /> : <Landing />}</>;
};

export default Redirector;

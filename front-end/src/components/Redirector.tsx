import React from 'react';
import Home from './Groups/Home';
import Landing from './Home';

const Redirector: React.FC = () => {
  return <>{localStorage.getItem('user') ? <Home /> : <Landing />}</>;
};

export default Redirector;

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import axios from 'axios';
import Redirector from './components/Redirector';
import Group from './components/Groups/Group';

function App() {
  axios.defaults.withCredentials = true;
  const baseUrl = import.meta.env.VITE_BASE_ROUTE;

  return (
    <>
      <Routes>
        <Route path={baseUrl} element={<Redirector />} />
        <Route path={`${baseUrl}/auth/register`} element={<Register />} />
        <Route path={`${baseUrl}/auth/login`} element={<Login />} />
        <Route path={`${baseUrl}/:groupId/*`} element={<Group />} />
      </Routes>
    </>
  );
}

export default App;

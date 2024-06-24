import React from 'react';
import './App.css';
import SideBarComponent from './components/Auth/sidebar/SideBarComponent';
import ChannelComponent from './components/Auth/sidebar/Channels/ChannelComponent';
import ChatComponent from './components/Auth/sidebar/Channels/ChatComponent/ChatComponent';
import LayoutComponent from './components/Layout/LayoutComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <div className="App">
      <LayoutComponent />
      <ChannelComponent />
      <button onClick={handleLogout} className="btn btn-primary mt-3">Logout</button>
    </div>
  );
};

export default App;

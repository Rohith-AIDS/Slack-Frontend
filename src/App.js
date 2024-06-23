import React from 'react';
import './App.css';
import './components/sidebar1/sidebar1Component'
import SideBarComponent from './components/Auth/sidebar/SideBarComponent';
import MessageHeader from './components/Messages/MessageHeader/MessageHeaderComponent';
import ChannelComponent from './components/Auth/sidebar/Channels/ChannelComponent';
import ChatComponent from './components/Auth/sidebar/Channels/ChatComponent/ChatComponent';
import LayoutComponent from './components/Layout/LayoutComponent';
import 'bootstrap/dist/css/bootstrap.min.css';






function App() {
  return (
    <div className="App">
      <LayoutComponent/>
     
      <ChannelComponent/>
      
      
    </div>
  );
}

export default App;

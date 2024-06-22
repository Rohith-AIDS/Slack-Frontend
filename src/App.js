import React from 'react';
import './App.css';
import './components/sidebar1/sidebar1Component'
import SideBarComponent from './components/Auth/sidebar/SideBarComponent';
import Messages from './components/Messages/MessageContent/MessageContent.component'
import ChannelComponent from './components/Auth/sidebar/Channels/ChannelComponent';
import MessageHeader from './components/Messages/MessageHeader/MessageHeader.component';


function App() {
  return (
    <div className="App">
      <SideBarComponent/>
      <MessageHeader/>
      <ChannelComponent/>
    </div>
  );
}

export default App;

// ParentComponent.jsx (Example)

// import React, { useState } from "react";
// import ChannelComponent from "../Auth/sidebar/Channels/ChannelComponent";
// import ChatComponent from "../Auth/sidebar/Channels/ChatComponent/ChatComponent";


// const ParentComponent = () => {
//     const [selectedChannel, setSelectedChannel] = useState(null);

//     const handleChannelClick = (channel) => {
//         setSelectedChannel(channel);
//     };

//     return (
//         <div className="parent-container">
//             <div className="sidebar">
//                 <ChannelComponent onChannelClick={handleChannelClick} />
//             </div>
//             <div className="main-content">
//                 {selectedChannel && <ChatComponent channel={selectedChannel} />}
//             </div>
//         </div>
//     );
// };

// export default ParentComponent;
import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import SideBarComponent from '../Auth/sidebar/SideBarComponent';
import ChatComponent from '../Auth/sidebar/Channels/ChatComponent/ChatComponent';
import './LayoutComponent.css'; // Add custom styles for the layout

const user = { displayName: 'Alice' }; // Replace with actual user data

const LayoutComponent = () => {
    const channels = [
        { channelName: "Channel" },
        // Add more channels as needed
    ]; // Replace with actual channel data

    return (
        <div className="app-container">
            <SideBarComponent />
            <Grid columns={2} className="main-content" divided>
                <Grid.Column width={4}>
                    {/* Sidebar content */}
                </Grid.Column>
                <Grid.Column width={12} style={{ height: '100vh' }}>
                    {channels.map((channel, index) => (
                        <Segment key={index} className="chat-container" raised>
                            <ChatComponent channel={channel} user={user} />
                        </Segment>
                    ))}
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default LayoutComponent;

import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Notification } from '../../../Notification/Notification.component';
const PrivateChat = (props) => {
    // Dummy data to represent users for UI purposes
    const usersState = [
        { id: '1', name: 'User1' },
        { id: '2', name: 'User2' },
        // Add more dummy users as needed
    ];

    // Dummy data to represent connected users
    const connectedUsersState = ['1', '2']; // Adjust IDs to match your dummy data

    const displayUsers = () => {
        if (usersState.length > 0) {
            return usersState.map(user => (
                <Menu.Item
                    key={user.id}
                    name={user.name}
                >
                    <Icon name="circle" color={connectedUsersState.indexOf(user.id) !== -1 ? "green" : "red"} />
                    <span>{"@ " + user.name}</span>
                </Menu.Item>
            ));
        }
    };

    return (
        <Menu.Menu style={{ marginTop: '35px' }}>
            <Menu.Item style={{ fontSize: '17px' }}>
                <span>
                    <Icon name="mail" /> Chat
                </span>
                ({usersState.length})
            </Menu.Item>
            {displayUsers()}
        </Menu.Menu>
    );
};

export default PrivateChat;

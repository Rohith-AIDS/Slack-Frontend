// MessageInput.jsx (example)

import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import firebase from '../../server/firebase';

const MessageInput = (props) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message.trim() === '') return;

        const newMessageRef = firebase.database().ref('messages').child(props.channel.id).push();
        newMessageRef.set({
            content: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: props.user.uid,
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }).then(() => {
            setMessage('');
        }).catch((error) => {
            console.error('Error sending message:', error);
        });
    }

    return (
        <Input
            fluid
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            action={{
                color: 'blue',
                content: 'Send',
                onClick: sendMessage
            }}
        />
    );
}

export default MessageInput;

import React, { useState, useEffect } from "react";
import { Segment, Form, Comment, Header, Input } from "semantic-ui-react";
import './ChatComponent.css';

const ChatComponent = ({ channel }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMessages, setFilteredMessages] = useState([]);

    useEffect(() => {
        const storedMessages = localStorage.getItem(channel.channelName);
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, [channel.channelName]);

    useEffect(() => {
        localStorage.setItem(channel.channelName, JSON.stringify(messages));
    }, [messages, channel.channelName]);

    useEffect(() => {
        const filtered = messages.filter(msg =>
            msg.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMessages(filtered);
    }, [messages, searchTerm]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                sender: 'Logged In User', // Adjust this to use actual user information if available
                time: new Date().toLocaleTimeString(),
            };
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            setMessage("");
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Segment className="chat-container">
            <Header as="h3">{channel.channelName}</Header>
            <Input
                icon="search"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={handleSearchChange}
                fluid
                style={{ marginBottom: '10px' }}
            />
            <Segment className="messages-container">
                <Comment.Group>
                    {filteredMessages.map((msg, index) => (
                        <Comment key={index}>
                            <Comment.Content>
                                <Comment.Author as="a">{msg.sender}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{msg.time}</div>
                                </Comment.Metadata>
                                <Comment.Text>{msg.text}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
            }}>
                <Form.Input
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    action={{
                        color: 'blue',
                        icon: 'send',
                        onClick: handleSendMessage,
                    }}
                />
            </Form>
        </Segment>
    );
};

export default ChatComponent;

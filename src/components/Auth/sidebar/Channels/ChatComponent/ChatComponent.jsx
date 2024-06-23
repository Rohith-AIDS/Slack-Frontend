import React, { useState, useEffect, useRef } from "react";
import { Segment, Form, Comment, Header, Input, Button, Icon, Modal } from "semantic-ui-react";
import { getMessages, addMessage } from '../utils/IndexedDB'; // Adjust the path as necessary
import './ChatComponent.css';

const ChatComponent = ({ channel }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [isImageUploadOpen, setImageUploadOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        getMessages().then(storedMessages => {
            if (storedMessages) {
                setMessages(storedMessages);
            } else {
                setMessages([]); // Initialize messages as an empty array if storedMessages is null or undefined
            }
        }).catch(error => {
            console.error("Error retrieving messages from IndexedDB:", error);
            setMessages([]); // Handle error by initializing messages as an empty array
        });
    }, []);

    useEffect(() => {
        const filtered = messages.filter(msg =>
            msg.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMessages(filtered);
    }, [messages, searchTerm]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                sender: 'Logged In User', // Adjust this to use actual user information if available
                time: new Date().toLocaleTimeString(),
            };
            try {
                await addMessage(newMessage);
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage("");
            } catch (error) {
                console.error("Error adding message to IndexedDB", error);
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const uploadImage = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const blob = new Blob([e.target.result], { type: file.type });
            const url = URL.createObjectURL(blob);

            const newMessage = {
                text: `Image uploaded: ${file.name}`,
                image: url,  // Blob URL
                sender: 'Logged In User', // Adjust this to use actual user information if available
                time: new Date().toLocaleTimeString(),
            };
            try {
                await addMessage(newMessage);
                setMessages(prevMessages => [...prevMessages, newMessage]);
            } catch (error) {
                console.error("Error adding message to IndexedDB", error);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImage(file);
            setImageUploadOpen(false);
        }
    };

    return (
        <Segment className="chat-container">
            <div className="header-with-icons">
                <Header as="h3">{channel.channelName}</Header>
                <div className="icons">
                    <Icon name="phone" />
                    <Icon name="video" />
                </div>
            </div>
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
                    {filteredMessages && filteredMessages.map((msg, index) => (
                        <Comment key={index}>
                            <Comment.Content>
                                <Comment.Author as="a">{msg.sender}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{msg.time}</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                    {msg.text}
                                    {msg.image && <img src={msg.image} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>
            <Form className="message-form" onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
            }}>
                <Form.Field className="message-input">
                    <input
                        placeholder="Type your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Field>
                <Button icon color="blue" onClick={handleSendMessage}>
                    <Icon name='send' />
                </Button>
                <Button icon color="teal" onClick={() => setImageUploadOpen(true)}>
                    <Icon name='image' />
                </Button>
            </Form>
            <Modal open={isImageUploadOpen} onClose={() => setImageUploadOpen(false)} centered>
                <Modal.Header>Upload Image</Modal.Header>
                <Modal.Content>
                    <Input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                    />
                </Modal.Content>
            </Modal>
        </Segment>
    );
};

export default ChatComponent;

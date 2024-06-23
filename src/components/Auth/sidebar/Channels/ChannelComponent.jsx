import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Form, Button, Segment, Label, Message } from "semantic-ui-react";
import { getChannels, addChannel } from './utils/channelData';
import { getNotifications } from './utils/notifications'; // Ensure the path is correct
import './ChannelComponent.css'; // Import your CSS file here

const ChannelComponent = (props) => {
    const [modalOpenState, setModalOpenState] = useState(false);
    const [channelAddState, setChannelAddState] = useState({ name: '', description: '' });
    const [channels, setChannels] = useState(getChannels());
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [notifications, setNotifications] = useState({});
    const [isPrivateChannel, setIsPrivateChannel] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notificationsData = await getNotifications(); // Fetch notifications
                setNotifications(notificationsData);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    const openModal = () => {
        setModalOpenState(true);
    };

    const closeModal = () => {
        setModalOpenState(false);
    };

    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description;
    };

    const onSubmit = () => {
        if (!checkIfFormValid()) {
            return;
        }

        const newChannel = {
            channelName: channelAddState.name,
            description: channelAddState.description,
            type: 'channel', // Adjust as per your channel type definition
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        };

        // Add new channel to localStorage and update state
        addChannel(newChannel);
        setChannels(getChannels());

        setChannelAddState({ name: '', description: '' });
        console.log('Channel added successfully:', newChannel);
        closeModal();
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setChannelAddState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChannelClick = (channel, index) => {
        setSelectedChannel(channel); // Update the selected channel state
        setIsPrivateChannel(index < 2); // Set the private channel state if index is less than 2
        // Ensure onChannelSelect is a function before calling
        if (typeof props.onChannelSelect === 'function') {
            props.onChannelSelect(channel);
        }
    };

    return (
        <Menu.Menu className="sidebar-menu">
            <Menu.Item>
                <span>
                    <Icon name="exchange" /> Channels
                </span>
                ({channels.length})
            </Menu.Item>
            {channels
                .filter(channel => channel.channelName !== 'GENERAL' && channel.type !== 'text')
                .map((channel, index) => (
                    <Menu.Item
                        key={index}
                        className={`channel-item ${selectedChannel === channel ? 'selected' : ''}`} // Add selected class if channel is selected
                        onClick={() => handleChannelClick(channel, index)}
                    >
                        {index < 2 && <Icon name="lock" />} {/* Add private icon for first two channels */}
                        {channel.channelName}
                        {notifications[channel.channelName] > 0 && ( // Render notification icon if there are notifications
                            <Label color='red' circular floating>
                                {notifications[channel.channelName]}
                            </Label>
                        )}
                    </Menu.Item>
                ))}
            <Menu.Item>
                <span onClick={openModal} className="clickable">
                    <Icon name="add" /> ADD
                </span>
            </Menu.Item>
            <Modal open={modalOpenState} onClose={closeModal} centered>
                <Modal.Header>Create Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit}>
                        <Segment stacked>
                            <Form.Input
                                name="name"
                                value={channelAddState.name}
                                icon="mail"
                                iconPosition="left"
                                onChange={handleInput}
                                type="text"
                                placeholder="Enter Channel Name"
                            />
                            <Form.Input
                                name="description"
                                value={channelAddState.description}
                                icon="lock"
                                iconPosition="left"
                                onChange={handleInput}
                                type="text"
                                placeholder="Enter Channel Description"
                            />
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={onSubmit}>
                        <Icon name="checkmark" /> Save
                    </Button>
                    <Button onClick={closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            {isPrivateChannel && (
                <Message color='white' style={{ marginTop: '10px'}}>
                    This channel is restricted from public access.
                </Message>
            )}
        </Menu.Menu>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.currentUser
});

export default connect(mapStateToProps)(ChannelComponent);

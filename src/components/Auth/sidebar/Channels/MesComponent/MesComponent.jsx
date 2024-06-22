import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { setUser, setfavouriteChannel, removefavouriteChannel } from "../../../../../store/actioncreator";
import { Segment, Comment, Header, Input, Icon, Image, Modal, Button } from 'semantic-ui-react';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import MessageData from "../utils/messageData"; // Importing message data
import mime from "mime-types"; // Importing mime-types for file type checking

// Assuming Messages.css is in the same directory as MesComponent.jsx

TimeAgo.locale(en);
const timeAgo = new TimeAgo();

const MesComponent = (props) => {
    const [messagesState, setMessagesState] = useState(MessageData); // Initialize with MessageData
    const [searchTermState, setSearchTermState] = useState("");
    const [fileState, setFileState] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    let divRef = useRef();

    useEffect(() => {
        // Your existing logic for handling favorite channels and usersRef useEffect

        // Clean-up function for useEffect
        return () => {
            // Your existing clean-up logic for removing listeners if any
        };
    }, [props.user]);

    const starChange = () => {
        // Define your logic for toggling the star icon here
    };

    const sendMessage = (message, imageUrl = null) => {
        if (message.trim() === '' && !imageUrl) return;

        // Simulating message sending to database (in this case, MessageData doesn't change)
        const newMessage = {
            messageId: `temp_${Date.now()}`,
            senderId: props.user.uid,
            senderName: props.user.displayName,
            timestamp: new Date().toISOString(),
            message: message,
            chatId: props.channel.id,
            status: "sent",
            ...(imageUrl && { attachments: [{ type: "image", url: imageUrl }] }),
        };

        setMessagesState([...messagesState, newMessage]);
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const displayMessages = () => {
        let messagesToDisplay = searchTermState ? filterMessageBySearchTerm() : messagesState;
        if (messagesToDisplay.length > 0) {
            return messagesToDisplay.map((message) => (
                <Comment key={message.messageId}>
                    <Comment.Avatar src={`https://i.pravatar.cc/150?u=${message.senderId}`} />
                    <Comment.Content className={message.senderId === props.user.uid ? "ownMessage" : null}>
                        <Comment.Author as="a">{message.senderName}</Comment.Author>
                        <Comment.Metadata>{timeAgo.format(new Date(message.timestamp))}</Comment.Metadata>
                        {message.attachments ? (
                            message.attachments.map((attachment, index) => (
                                <div key={index}>
                                    {attachment.type === "image" && (
                                        <Image onLoad={imageLoaded} src={attachment.url} />
                                    )}
                                    {attachment.type === "file" && (
                                        <div>
                                            File: {attachment.filename} ({attachment.size})
                                        </div>
                                    )}
                                    {attachment.type === "video" && (
                                        <div>
                                            Video: {attachment.url} ({attachment.duration})
                                        </div>
                                    )}
                                    {attachment.type === "location" && (
                                        <div>
                                            Location: {attachment.latitude}, {attachment.longitude} ({attachment.name})
                                        </div>
                                    )}
                                    {attachment.type === "link" && (
                                        <div>
                                            Link: <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.title}</a>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <Comment.Text>{message.message}</Comment.Text>
                        )}
                    </Comment.Content>
                </Comment>
            ));
        }
    };

    const imageLoaded = () => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const uniqueusersCount = () => {
        const uniqueUsers = messagesState.reduce((acc, message) => {
            if (!acc.includes(message.senderName)) {
                acc.push(message.senderName);
            }
            return acc;
        }, []);

        return uniqueUsers.length;
    };

    const searchTermChange = (e) => {
        const target = e.target;
        setSearchTermState(target.value);
    };

    const filterMessageBySearchTerm = () => {
        const regex = new RegExp(searchTermState, "gi");
        const messages = messagesState.filter(message =>
            (message.message && message.message.match(regex)) || message.senderName.match(regex)
        );
        return messages;
    };

    const onFileAdded = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileState(file);
        }
    };

    const submitImage = () => {
        // Simulating image upload (not storing in Firebase, just updating UI)
        if (fileState && acceptedTypes.includes(mime.lookup(fileState.name))) {
            const imageUrl = URL.createObjectURL(fileState);
            sendMessage("", imageUrl);
            setFileState(null);
            setOpenModal(false);
        }
    };

    const acceptedTypes = ["image/png", "image/jpeg"];

    return (
        <div className="messages">
            <Segment clearing className='header'>
                <Header as="h2">
                    <span>
                        {(props.channel?.isPrivateChat ? "@ " : "# ") + props.channel?.name}
                        {!props.channel?.isPrivateChat && (
                            <Icon
                                name={props.starred ? "star" : "star outline"}
                                color={props.starred ? "yellow" : "black"}
                                onClick={starChange} // Assuming you define or import `starChange` function
                            />
                        )}
                    </span>
                    <Header.Subheader> {uniqueusersCount()} User{uniqueusersCount() === 1 ? "" : "s"}</Header.Subheader>
                </Header>
                <Input
                    name="search"
                    icon="search"
                    placeholder="Search Messages"
                    size="mini"
                    onChange={searchTermChange}
                />
            </Segment>

            <Segment className="messagecontent">
                <Comment.Group>
                    {displayMessages()}
                    <div ref={divRef}></div>
                </Comment.Group>
            </Segment>

            <Input
                fluid
                placeholder="Type your message..."
                onChange={(e) => setSearchTermState(e.target.value)}
                action={{
                    color: 'blue',
                    content: 'Send',
                    onClick: () => sendMessage(searchTermState),
                }}
            />

            <Modal basic open={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Select an image</Modal.Header>
                <Modal.Content>
                    <Input
                        type="file"
                        name="file"
                        onChange={onFileAdded}
                        fluid
                        label="File Type (png, jpeg)"
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" onClick={submitImage}>
                        <Icon name="checkmark" />Add
                    </Button>
                    <Button color="red" onClick={() => setOpenModal(false)}>
                    <Icon name="remove" />Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    </div>
);
};

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
    starred: Object.keys(state.favouriteChannel.favouriteChannel).includes(state.channel.currentChannel?.id),
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    setfavouriteChannel: (channel) => dispatch(setfavouriteChannel(channel)),
    removefavouriteChannel: (channel) => dispatch(removefavouriteChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MesComponent);

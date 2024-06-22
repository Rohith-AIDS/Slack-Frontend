import React from 'react';
import { Segment, Header, Input, Icon } from 'semantic-ui-react';
import './MessageHeader.css';

const MessageHeader = (props) => {
    return (
        <Segment clearing className='header'>
            <Header as="h2" floated="left">
                <span>
                    {(props.isPrivateChat ? "@ " : "# ") + props.channelName}
                    {!props.isPrivateChat && (
                        <Icon
                            onClick={props.starChange}
                            name={props.starred ? "star" : "star outline"}
                            color={props.starred ? "yellow" : "black"}
                        />
                    )}
                </span>
                <Header.Subheader>
                    {props.uniqueUsers} User{props.uniqueUsers === 1 ? "" : "s"}
                </Header.Subheader>
            </Header>
            <Header floated="right">
                <Input
                    name="search"
                    icon="search"
                    placeholder="Search Messages"
                    size="mini"
                    onChange={props.searchTermChange}
                />
            </Header>
        </Segment>
    );
}

export default MessageHeader;

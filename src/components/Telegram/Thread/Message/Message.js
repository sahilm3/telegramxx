import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/userSlice';
import "./Message.css";
import * as timeago from 'timeago.js';

const Message = ({id,data:{timestamp,displayName,email,message,photo,uid}}) => {
    const user = useSelector(selectUser);
    return (
        <div className={`message ${user.email===email && `message__sender`}`}>
            <Avatar src={photo} className="message__photo" alt="userimage" />
            <div className="message__contents">
                <p>{message}</p>
                <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
            </div>
        </div>
    );
};

export default Message;
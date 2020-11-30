import { Avatar} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import "./Thread.css";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import IconButton from '@material-ui/core/IconButton';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import db from ".././../../firebase";
import firebase from "firebase";
import {useSelector} from "react-redux";
import {selectThreadId,selectThreadName} from "../../../features/threadSlice";
import {selectUser} from "../../../features/userSlice";
import Message from "./Message/Message";
const Thread = () => {
    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);
    const threadName = useSelector(selectThreadName);
    const threadId = useSelector(selectThreadId);
    const user = useSelector(selectUser);

  useEffect(()=>{
      if(threadId){
          db.collection('threads').collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>
          setMessages(snapshot.docs.map((doc)=>({
              id:doc.id,
              data: doc.data()
          }))))
      }
  })
    const sendMessage = (e)=>{
        e.preventDefault();
       db.collection("threads").doc(threadId).collection('messages'.add({
           timestamp: firebase.firestore.FieldValue.serverTimestamp,
           message: input,
           uid: user.uid,
           photo: user.photo,
           email: user.email,
           displayName: user.displayName
           }))
        setInput("");
    }
    return (
        <div className="thread">
         <div className="thread__header">
          <div className="thread__header__contents">
              <Avatar />
              <div className="thread__header__contents__info">
                  <h4>Thread Name</h4>
                  <h5>Last seen:</h5>
              </div>
          </div>
          <IconButton>
              <MoreHoriz className="thread__header__details" />
          </IconButton>
         </div>
         <div className="thread__messages">
             {messages.map(({id,data})=>(
                 <Message id={id} key={id} data={data} />
             ))}
         </div>
         <div className="thread__input">
         <form>
             <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="write a message..." />
            <IconButton><TimerOutlinedIcon /></IconButton>
            <IconButton onClick={sendMessage}>
                <SendRoundedIcon />
            </IconButton>
            <IconButton><MicNoneOutlinedIcon /></IconButton>
            
             </form>
         </div>
        </div>
    );
};

export default Thread;
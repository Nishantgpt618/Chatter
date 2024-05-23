import React, { useState, useContext, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./ChatPage.module.css";
import sendButton from "../../images/icons/send-outline.svg";
import {SocketContext} from "../store/socket";

function ChatPage() {
  const { clickedName } = useSelector((state) => state.startChat);
  const { clickedId } = useSelector((state) => state.startChat);
  const { chatData } = useSelector((state) => state.startChat);
  const { loggedInUser } = useSelector((state) => state.login);
  const { commonChatId } = useSelector((state) => state.startChat);
  const [message, setMessage] = useState('')
  const socket = useContext(SocketContext);
  const bottomRef = useRef(null);


  const socketData = () => {
    socket.emit("send_message", {
      from: loggedInUser._id,
      to: clickedId,
      message: message,
      commonChatId,
  })
  }

  const scrollToBottom = () =>{
    window.document.querySelector("#scrollItem").scrollTo({ 
      top: document.querySelector("#scrollItem").scrollHeight, 
      behavior: 'auto'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 

  useEffect(() => {
     setTimeout(scrollToBottom,1500);
  },[message,socket,chatData])





  return (
    <div className={styles.container}>
      <div className={`w-full border-b shadow px-7 py-2.5 flex ${styles.chatDetails}`}>
        {/* <img alt="" /> */}
        <span className="text-xl font-bold">{clickedName[0].toUpperCase() + clickedName.slice(1)}</span>
      </div>
      <div className={styles.chatwindow}>
        <div className={styles.chatBox} >
          {chatData.messages.length === 0 ? (
            <h3>Type in the input box and press send button</h3>
          ) : (
            <div className={styles.chat} id="scrollItem">
              {chatData.messages.map((message, index) => {
                return (
                  <div key={index}
                    className={
                      ` ${loggedInUser._id === message.from._id
                        ? ` ${styles.chatMessageSender}`
                        : `bg-gray-400 ${styles.chatMessageReceiver}`}`
                    }
                  >
                    <div>
                      <strong>{message.from.firstName && message.from.firstName[0].toUpperCase() + message.from.firstName.slice(1) + " " + message.from.lastName + " " + message.date.slice(11,19)}</strong>
                      <p>{message.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>
        <div className={styles.inputDiv}>
          <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here" />
          <img
            src={sendButton}
            alt="No Preview"
            onClick={() => { setMessage(' '); socketData(); }}
            
          ></img>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

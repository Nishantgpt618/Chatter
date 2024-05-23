import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./MePage.module.css";
import StartChat from "./StartChat";
import ChatPage from "./ChatPage";
import SelectChat from "./SelectChat";
import friends from "../../images/icons/friends.png";
import chat from "../../images/icons/chat.png";

function MePage() {
  const { loggedInUser } = useSelector((state) => state.login);
  const { clickedName } = useSelector((state) => state.startChat);
  const chats = loggedInUser.AllchatID.length || 0;
  const [showNames, setShowNames] = useState(true);

  return (
    <div className={`w-full ${styles.outerContainer}`}>
      <div className="hidden sm:flex flex-row justify-between" style={{minHeight: "calc(100vh - 70px)"}}>
        <div className={`flex w-1/4 flex-col items-center overflow-x-hidden overflow-y-auto ${styles.chatNames}`}>
          <StartChat />
          {chats ? (
            <SelectChat setShowNames={setShowNames} />
          ) : (
            <p>You haven't started a conversation yet</p>
          )}
        </div>
        <div className={`w-3/4 bg-white text-black ${styles.chats}`}>
          {clickedName ? (
            <ChatPage setShowNames={setShowNames} />
          ) : (
            <span className="text-black text-xl font-medim w-max block mx-auto">Select a name to start a conversation</span>
          )}
        </div>
      </div>
      <div className={styles.upperBar}>
        {showNames && (
          <div className={styles.chatNames}>
            <StartChat setShowNames={setShowNames} />
            <br />
            {chats ? (
              <SelectChat setShowNames={setShowNames} />
            ) : (
              <p>You haven't started a conversation yet</p>
            )}
          </div>
        )}
        {!showNames && (
          <div className={styles.chats}>
            {clickedName ? (
              <ChatPage setShowNames={setShowNames} />
            ) : (
              <p> Select a name to start a conversation</p>
            )}
          </div>
        )}
      </div>
      <div className={styles.lowerBar}>
        <img
          onClick={() => setShowNames(true)}
          src={friends}
          alt="No Preview"
        />
        <img onClick={() => setShowNames(false)} src={chat} alt="No Preview" />
      </div>
    </div>
  );
}

export default MePage;

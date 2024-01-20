import styles from "./SelectChat.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearChat,
  searchChat,
  startChat,
  updateCommonChatId,
} from "../../toolkit/startChat";

export default function SelectChat(props) {
  const { loggedInUser } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const renderName = (chat) => {
    if (chat.userOne._id !== loggedInUser._id) {
      return (
        chat.userOne.firstName[0].toUpperCase() +
        chat.userOne.firstName.slice(1) +
        " " +
        chat.userOne.lastName
      );
    } else {
      return (
        chat.userTwo.firstName[0].toUpperCase() +
        chat.userTwo.firstName.slice(1) +
        " " +
        chat.userTwo.lastName
      );
    }
  };

  const renderId = (chat) => {
    if (chat.userOne._id !== loggedInUser._id) {
      return (
        chat.userOne._id
      );
    } else {
      return (
        chat.userTwo._id
      );
    }
  };

  const renderLastMessage = (chat) => {
    return <p>{chat.messages.slice(-1)[0].message}</p>;
  };


  return (
    <React.Fragment>
      {loggedInUser.AllchatID.map((chat, index) => (
        <div
          key={index}
          className={styles.container}
          onClick={() => {
            dispatch(clearChat());
            props.setShowNames(false);
            dispatch(updateCommonChatId(chat._id));
            dispatch(searchChat({ chatId: chat._id }));
            dispatch(
              startChat({
                userName: renderName(chat),
                userId: renderId(chat),
              })
            );
          }}
        >
          <h3>{renderName(chat)}</h3>
          {renderLastMessage(chat)}
        </div>
      ))}
    </React.Fragment>
  );
}

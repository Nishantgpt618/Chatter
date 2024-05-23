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
  const { clickedId } = useSelector((state) => state.startChat);
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
          className={`w-full flex items-center hover:text-base hover:font-bold  ${(clickedId == chat?.userOne?._id || clickedId == chat?.userTwo?._id) ? "bg-gray-100" : "bg-white"} border-b hover:shadow p-2 ${styles.container}`}
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
          <div className="mr-2 flex items-center justify-center font-bold rounded-full h-10 w-10 bg-teal-100 ">
            <span className="">{renderName(chat).split(" ")[0].slice(0,1)}</span>
            <span className="">{renderName(chat).split(" ")[1] && renderName(chat).split(" ")[1].slice(0,1)}</span>
          </div>
          <div>
            <span className="">{renderName(chat)}</span>
            <span className="font-medium">{renderLastMessage(chat)}</span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

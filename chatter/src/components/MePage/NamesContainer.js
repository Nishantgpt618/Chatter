import React, { useEffect, useState } from "react";
import styles from "./NamesContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearChat,
  searchChat,
  startChat,
  updateCommonChatId,
} from "../../toolkit/startChat";
import { updateUser } from "./../../toolkit/login";

function NamesContainer(props) {
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.login);

  const searchCommonChat = (chatIds) => {
    var found = false; // eslint-disable-next-line
    loggedInUser.AllchatID.map((chatId) =>  // eslint-disable-next-line
      chatIds.map((chat) => {
        if (chat === chatId._id) {
          found = true;
          dispatch(updateCommonChatId(chatId._id));
          dispatch(searchChat({ chatId: chatId._id }));
        }
      })
    );
    if (!found) {
      dispatch(updateCommonChatId(null));
      dispatch(clearChat());
    }
  };

  useEffect(() => {
    fetch("/api/readUsers")
      .then((response) => response.json())
      .then((response) => setNames(response.payload));
  }, [props.active]);

  const setShow = () => {
    props.setShowNames(false)
  }

  return (
    <div className={`absolute overflow-x-hidden overflow-y-auto bg-gray-100 flex flex-col rounded-b-lg top-8 left-0 w-full ${styles.container}`}>
      {names && names.filter((user) =>
          user?.email?.toLowerCase().includes(props.searchTerm.toLowerCase())
        )
        .filter((user) => user.email !== loggedInUser.email)
        .filter((user) => props.searchTerm.includes('@'))
        .map((user, index) => (
          <button
            key={index}
            className={styles.button}
            onClick={() => {
              setTimeout(setShow,2000)
              dispatch(updateUser(loggedInUser._id));
              dispatch(
                startChat({
                  userName: user.firstName + " " + user.lastName,
                  userId: user._id,
                })
              );
              setTimeout(() => searchCommonChat(user.AllchatID), 2000);
              props.setActive(false);
            }}
          >
            {user.firstName + " " + user.lastName}
          </button>
        ))}
    </div>
  );
}

export default NamesContainer;

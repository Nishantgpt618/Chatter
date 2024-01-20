import React, { useState } from "react";
import NamesContainer from "./NamesContainer";
import add from "../../images/icons/add.svg";
import styles from "./StartChat.module.css";

function StartChat(props) {
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false);

  return (
    <React.Fragment>
      <br />
      <div className={styles.container}>
        <div className={showInput ? styles.containerTwo : styles.containerOne}>
          {showInput && (
            <input
              className={styles.input}
              placeholder="Enter Full mail address"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              onFocus={() => setActive(true)}
            />
          )}
          <img
            className={styles.add}
            onClick={() => setShowInput(!showInput)}
            src={add}
            alt="no preivew"
          />
        </div>
      </div>
      {active && (
        <NamesContainer setShowNames={props.setShowNames} active={active} setActive={setActive} searchTerm={searchTerm} />
      )}
    </React.Fragment>
  );
}

export default StartChat;

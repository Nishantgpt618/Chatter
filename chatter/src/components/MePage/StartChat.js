import React, { useState } from "react";
import NamesContainer from "./NamesContainer";
import add from "../../images/icons/add.svg";
import styles from "./StartChat.module.css";
import { MdClose, MdOutlineSearch } from "react-icons/md";

function StartChat(props) {
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
      <div className={`relative flex border-b border-gray-400 flex-row justify-end w-full
       ${styles.container}`}>
        <div className={`w-full relative mx-2 my-2 flex flex-row justify-end ${styles.containerOne}`}>
          <div className="relative">
            <MdOutlineSearch className="text-xl text-gray-500 absolute left-1 top-1.5"/>
          </div>
          <input
            className={`${active ? "rounded-t" : "rounded"} px-7 focus:outline-none text-black w-full py-1`}
            placeholder="Enter Full mail address"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onFocus={() => setActive(true)}
            />
            {active && <button onClick={() => setActive(false)} className="relative">
              <MdClose className="text-xl text-gray-500 absolute right-1 top-1.5"/>
            </button>}
            {active && (
              <NamesContainer setShowNames={props.setShowNames} active={active} setActive={setActive} searchTerm={searchTerm} />
            )}
          </div>
        </div>
  );
}

export default StartChat;

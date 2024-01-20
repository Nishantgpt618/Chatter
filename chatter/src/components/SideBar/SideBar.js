import React from 'react';
import styles from "./SideBar.module.css";
import { useSelector } from 'react-redux';

function SideBar() {
    const {message} = useSelector((state) => state.sideBar)
  return (
    <div className={styles.container}>
     <p>{message}</p>
     <span className={styles.progress}></span>
    </div>
  )
}

export default SideBar;
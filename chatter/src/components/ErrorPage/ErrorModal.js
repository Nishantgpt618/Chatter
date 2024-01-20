import React from "react";
import PortalReactDOM from 'react-dom'
import styles from './ErrorModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeErrorModal } from "../../toolkit/error";


const BackDrop = (props) => {
  return (
    <div className={styles.backdrop}>

    </div>
  )
};

const OverLay = (props) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.overlay}>
      <button className={styles.button} onClick={() => dispatch(closeErrorModal())} >Close</button>
      {props.errorMessage ? <p>{props.errorMessage}</p> : <p></p>}
    </div>
  );
};

export default function ErrorModal() {
  const {errorMessage} = useSelector((state) => state.error)
  return (
    <React.Fragment>
      {PortalReactDOM.createPortal(<BackDrop />, document.getElementById("backdrop"))}
      {PortalReactDOM.createPortal(<OverLay errorMessage={errorMessage}/>, document.getElementById("overlay"))}
    </React.Fragment>
  );
}

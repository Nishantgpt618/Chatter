import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../toolkit/login";
import styles from "./LoginSignUp.module.css";
import { SocketContext } from "./store/socket";

function Login(props) {
  const email = useRef("");
  const password = useRef("");
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [checked, setChecked] = useState(false)

  

  const wait = () => {
    props.setShowLogin(false)
  }

  return (
    <React.Fragment>
      <div className={active ? styles.centerActive : styles.centerClose }>
      <span className="text-xl font-medium w-full text-center block text-orange-400 my-2">LOGIN</span>
        <form
          className={styles.formLogin}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              loginUser({
                email: email.current.value,
                password: password.current.value,
                setShowLogin: props.setShowLogin,
                socket: socket
              })
            );
          }}
        >
          <div className="flex flex-col">
            <label className="text-teal-300 ml-1 mb-1">Email</label>
            <input required className={`w-full pt-2 pb-1 px-1`} ref={email} />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-teal-300 ml-1 mb-1">Password</label>
            <input required className="w-full pt-2 pb-1 px-1" type={checked ? "text" : "password"} ref={password} />
          </div>
          <div className={`my-3 block`}>
            <input className="p-1 mr-2" type="checkbox" onClick={() => setChecked(!checked)} />
            <label className="text-white">
              Show Password
            </label>
          </div>
          <div className={`mt-4 ${styles.button}`}>
            <button className="px-7 py-2 text-black rounded-lg bg-orange-400 hover:bg-teal-300" name="submit" type="submit" value="Login">Login</button>
            <button
              onClick={() => {setActive(false); props.setActive(true); setTimeout(wait,1000)}}
              className="px-7 py-2 text-black rounded-lg bg-orange-400 hover:bg-teal-300"
              name="button"
              type="button"
              value="Cancel"
            >Cancel</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;

import React, { useState } from "react";
import styles from "./Home.module.css";
import Login from "./Login";
import SignUp from "./SignUp";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [active , setActive] = useState(true);

  const waitLogin = () => {
    setShowLogin(true);
  }

  const waitSignUp = () => {
    setShowSignUp(true);
  }

  const renderButtons = () => {
      return (
        <div className={active ? styles.buttonGroupActive : styles.buttonGroupClose}>
        <button
          className={`py-2 px-7 text-black rounded-lg text-base bg-orange-400 hover:bg-teal-300`}
          onClick={() => {setActive(false); setTimeout(waitLogin,1000); }}
        >
          Log In
        </button>
        <button
          className={`py-2 px-7 text-black rounded-lg text-base bg-orange-400 hover:bg-teal-300`}
          onClick={() => {setActive(false); setTimeout(waitSignUp,1000);}}
        >
          Sign Up
        </button>
      </div>
      )
  }

  return (
    <div className="overflow-hidden w-screen">
      <div className={styles.container}>
        {!showLogin && !showSignUp && renderButtons()}
        {showLogin ? (
          <Login setActive={setActive} setShowLogin={setShowLogin} />
        ) : ""}
        {showSignUp ? <SignUp setActive={setActive} setShowSignUp={setShowSignUp} /> : ""}
      </div>
    </div>
  );
};

export default Home;

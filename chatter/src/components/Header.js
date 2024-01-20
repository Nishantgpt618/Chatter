import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../toolkit/login";
import styles from "./Header.module.css";
import brandLogo from "../images/Logo.png";
import { flushChatData } from "../toolkit/startChat";
import { changeStatus } from "../toolkit/sideBar";

const Header = (props) => {
  const { loggedInUser } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const resetStatus = () => {
    dispatch(changeStatus({ status: false, message: "" }));
  };

  const logout = () => {
    dispatch(logoutUser());
    dispatch(flushChatData());
    dispatch(
      changeStatus({
        status: true,
        message: "You have been logged out successfully",
      })
    );
    setTimeout(resetStatus, 6000);
  };

  const renderButton = () => {
    return (
      <div className={styles.loggedInButton}>
        {loggedInUser.firstName ? (
          <>
            <img
              className={props.online ? styles.online : styles.offline}
              alt=""
            />
            <button>Profile</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <header
      className={`${loggedInUser.firstName ? styles.header : styles.headerHome} bg-teal-300`}
    >
      <img src={brandLogo} alt="No preview" />
      {loggedInUser.firstName ? renderButton() : ""}
    </header>
  );
};

export default Header;

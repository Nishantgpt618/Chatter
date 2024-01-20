import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import MePage from "./components/MePage/MePage";
import { useContext, useEffect, useState } from "react";
import { updateUser } from "./toolkit/login";
import ErrorModal from "./components/ErrorPage/ErrorModal";
import {SocketContext} from "./components/store/socket";
import { initiateChat } from "./toolkit/startChat";
import { changeStatus } from "./toolkit/sideBar";
import SideBar from './components/SideBar/SideBar';

function App() {
  const { loading, loggedInUser } = useSelector((state) => state.login);
  const { error } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [online, setOnline] = useState(false);
  const {loggedIn} = useSelector((state) => state.sideBar);

  const resetStatus = () => {
    dispatch(changeStatus({status: false, message: ""}))
  }

  useEffect(() => {
    if (localStorage.hasOwnProperty("userData")) {
      const user = JSON.parse(localStorage.getItem("userData"));
      dispatch(updateUser(user._id));
      socket.emit("loginUser", user)
    }

    socket.on("receive_message", (data) => {
      dispatch(initiateChat(data))
      if(data.userSender){
        dispatch(updateUser(data.userSender._id))
      }
      if(data.userReceiver){
        dispatch(updateUser(data.userReceiver._id))
      }
    })

    socket.on("loggedIn", (data) => {
      setOnline(true);
      dispatch(changeStatus({status: true, message: `Welcome ${data.firstName + " " + data.lastName} , Socket connected Live chat enabled`}));
      setTimeout(resetStatus,5000)
    })

  }, [socket, dispatch]);

  return (
    
      <Router>
        <Header online={online} />
        {loggedIn && <SideBar />}
        {loading && <Loading />}
        {error && <ErrorModal />}
        <Switch>
          <Route exact path="/">
            {loggedInUser.firstName ? <MePage /> : <Home />}
          </Route>
        </Switch>
      </Router>
   
  );
}

export default App;

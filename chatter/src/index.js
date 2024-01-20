import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { SocketContext, socket } from "./components/store/socket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketContext.Provider>
);

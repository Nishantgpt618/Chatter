import React from 'react';
import { io } from 'socket.io-client';
let origin;
console.log(process.env.NODE_ENV,"envvvvvv");
if( process.env.NODE_ENV === "production"){
    origin = "http://3.106.244.65:3000" 
  }
  else{
    origin = 'http://localhost:3000'
  }
export const socket = io.connect(origin);
export const SocketContext = React.createContext();

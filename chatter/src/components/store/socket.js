import React from 'react';
import { io } from 'socket.io-client';
let origin;
if( process.env.NODE_ENV === "production"){
    origin = "https://polar-bayou-51020.herokuapp.com" 
  }
  else{
    origin = 'http://localhost:3000'
  }
export const socket = io.connect(origin);
export const SocketContext = React.createContext();

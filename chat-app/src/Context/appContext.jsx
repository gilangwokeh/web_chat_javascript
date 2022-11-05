import { io } from 'socket.io-client'
import React from 'react';
const SOCKET_URL = "http://localhost:8000"

//app context
export const AppContext = React.createContext()
export const socket = io(SOCKET_URL)
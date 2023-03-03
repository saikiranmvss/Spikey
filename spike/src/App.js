import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Chatwindow from './Chatwindow';
import Allusers from './Allusers';
import Settings from './Settings';
import Users from './Users';
import {io} from 'socket.io-client';
import React from 'react';
import Footer from './Footer';

var socket=io.connect('http://192.168.0.144:9999');
export var SocketContext = React.createContext();

function App() {  
  return (    
    <SocketContext.Provider value={socket}>
    <Routes>
    <Route
            path="/"
            element={ <Login /> }
        />
        <Route
            path="/Signup"
            element={ <Signup /> }
        />

        <Route
            path="/Chatwindow"
            element={ <Chatwindow /> }
        />

        <Route
            path="/Allusers"
            element={ <Allusers /> }
        />
        <Route
            path="/Users"
            element={ <Users /> }
        />
                <Route
            path="/Settings"
            element={ <Settings /> }
        />        
        {/* The next line is very important for the Navigate component to work */}                
    </Routes>
    <Footer />
    </SocketContext.Provider>        
  );
}

export default App;
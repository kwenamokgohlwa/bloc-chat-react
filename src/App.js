import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User/User';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuVVzimXC25jGE2bIGoBiBhJ98eyyiWF4",
    authDomain: "bloc-chat-71678.firebaseapp.com",
    databaseURL: "https://bloc-chat-71678.firebaseio.com",
    projectId: "bloc-chat-71678",
    storageBucket: "bloc-chat-71678.appspot.com",
    messagingSenderId: "192896303880"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      user: {displayName: "Guest"}
    };
  }

  handleRoomClickParent = (room) => {
    this.setState({ activeRoom: room });
  }

  setUser = (user) => {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout-icon"></div>
          <div className="mdl-layout__header-row">
            <span>Bloc Chat</span>
            <div className="mdl-layout-spacer"></div>
          </div>
        </header>
        <RoomList
        firebase={firebase}
        getRoom={this.handleRoomClickParent}
        activeRoom={this.state.activeRoom}
        />
        <User
        firebase={firebase}
        setUser={this.setUser}
        user={this.state.user}
        />
        <MessageList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        user={this.state.user}
        />
      </div>
    );
  }
}

export default App;

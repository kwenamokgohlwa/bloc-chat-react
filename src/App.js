import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoom: ""
    };
  }

  handleRoomClickParent(room) {
    console.log(room);
  //  this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <RoomList
        firebase={firebase}
        />
        <MessageList
        firebase={firebase}
        getRoom={this.handleRoomClickParent}
        />
      </div>
    );
  }
}

export default App;

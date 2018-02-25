import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="bloc-chat-header">
          <h2>Bloc Chat</h2>
        </header>

        <RoomList
        firebase={firebase}
        />
      </div>
    );
  }
}

export default App;

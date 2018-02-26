import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessage: {username: "", content: "", sentAt: "", roomID: ""}
    };

    this.roomsRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  render() {
    return(
      <div className="message-list">
        {
          this.state.messages.map( (message, index) =>
            <div key={index}>
              <h3>{message.username}</h3>
              <span>{message.sentAt}</span>
              <p>{message.content}</p>
            </div>
          )
        }
      </div>
    );
  }

}

export default MessageList;

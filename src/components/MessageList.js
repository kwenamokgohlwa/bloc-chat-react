import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessageContent: ""
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

  handleChange(e) {
    this.setState({ newMessageContent: e.target.value });
  }

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  }

  handleClick() {
    this.roomsRef.push({
      username: this.props.user.displayName,
      content: this.state.newMessageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.activeRoom.key
    });
  }

  render() {
    return(
      <section className="message-list">
        <div>
          <h2>{this.props.activeRoom.name}</h2>
        </div>
        {
          this.state.messages.filter( message => message.roomID === this.props.activeRoom.key ).map( (message, index) =>
            <div key={index}>
              <h3>{message.username}</h3>
              <span>{ isNaN(message.sentAt) ? message.sentAt : this.formatTimestamp(message.sentAt)}</span>
              <p>{message.content}</p>
            </div>
          )
        }
        <div>
          <input
            type="text"
            onChange={(e) => this.handleChange(e)}
          />
          <button onClick={() => this.handleClick()}>
            Send Message
          </button>
        </div>
      </section>
    );
  }

}

export default MessageList;

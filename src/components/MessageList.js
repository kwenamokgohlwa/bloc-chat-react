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

  bgColorClass(index) {
    if(index % 2 === 0) {
      return "mdl-list__item mdl-list__item--three-line " + "grey";
    }else {
      return "mdl-list__item mdl-list__item--three-line ";
    }
  }

  render() {
    return(
      <section className="message-list">
        <div>
          <span className="mdl-layout-title">{this.props.activeRoom.name}</span>
        </div>
        <ul className="mdl-list">
              {
                this.state.messages.filter( message => message.roomID === this.props.activeRoom.key ).map( (message, index) =>
                  <li key={index} className={this.bgColorClass(index)}>
                    <span className="mdl-list__item-primary-content">
                      <i className="material-icons mdl-list__item-avatar">person</i>
                      <span>{message.username}</span>
                      <span className="mdl-list__item-text-body">{message.content}</span>
                    </span>
                    <span className="mdl-list__item-secondary-content">
                      <span className="mdl-list__item-secondary-info">{ isNaN(message.sentAt) ? message.sentAt : this.formatTimestamp(message.sentAt)}</span>
                    </span>
                  </li>
                )
              }
        </ul>
          {
            this.props.activeRoom.name === undefined ?
            <span>Please select the menu icon to choose or create a chat room</span>
            :
            <div>
              <div className="mdl-textfield mdl-js-textfield">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  onChange={(e) => this.handleChange(e)}
                />
                <label className="mdl-textfield__label" >Message...</label>
              </div>
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={() => this.handleClick()}>
                Send Message
              </button>
            </div>
          }
      </section>
    );
  }

}

export default MessageList;

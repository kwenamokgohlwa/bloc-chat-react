import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      room: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  componentWillUnmount() {

  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  handleClick() {
    if(this.state.newRoomName === ""){
      alert("Please enter room name before creating a room");
    }else {
      this.roomsRef.push({
        name: this.state.newRoomName
      });
    }
  }

  handleRoomClickChild(room) {
    this.props.getRoom(room);
  }

  render() {
    return (
        <div>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              onChange={(e) => this.handleChange(e)}
            />
            <label className="mdl-textfield__label">Room...</label>
          </div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={() => this.handleClick()}>
            Create Room
          </button>
          <nav className="mdl-navigation">
            {
              this.state.rooms.map( (room, index) =>
                <div className="mdl-navigation__link" key={index} onClick={ () => this.handleRoomClickChild(room) }>
                  {room.name}
                </div>
              )
            }
          </nav>
        </div>
    );
  }

}

export default RoomList;

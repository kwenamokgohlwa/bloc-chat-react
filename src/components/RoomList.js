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
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

  handleRoomClickChild(room) {
    this.props.getRoom(room);
  }

  render() {
    return (
      <aside>
        <div className="bloc-chat-header">
          <h2>Bloc Chat</h2>
          <input
            type="text"
            onChange={(e) => this.handleChange(e)}
          />
          <button onClick={() => this.handleClick()}>
            Create Chat Room
          </button>
        </div>
        {
          this.state.rooms.map( (room, index) =>
            <div className="chat-rooms" key={room.key} onClick={ () => this.handleRoomClickChild(room) }>
              {room.name}
            </div>
          )
        }
      </aside>
    );
  }

}

export default RoomList;

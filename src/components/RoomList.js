import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ room: room });
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  handleClick() {
  //this.roomsRef.child(this.state.rooms.length + 1).set({name: this.state.newRoomName});
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

  componentWillUnmount() {

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
            <div className="chat-rooms" key={room.key}>
              {room.name}
            </div>
          )
        }
      </aside>
    );
  }

}

export default RoomList;

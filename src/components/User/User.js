import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.props.setUser(user);
      }else {
        const anonymous = {displayName: "Guest"}
        this.props.setUser(anonymous);
      }
    });
  }

  componentWillUnmount() {

  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut() {
    this.props.firebase.auth().signOut();
  }

  render(){
    return(
      <div className="user">
        <h2>{this.props.user.displayName}</h2>
        <button onClick={() => this.handleSignIn()}>
          Sign In
        </button>
        <button onClick={() => this.handleSignOut()}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default User;

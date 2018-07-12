import { connect } from "react-redux";
import React from "react";
import { userId } from "../../jwt";

export default class Chat extends React.PureComponent {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title) {
      this.props.createAlbum(this.state.title);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="chatroom">
        <h3>Chatbox</h3>
        {this.props.chats.map(chat => (
          <div key={chat.message}>{chat.message}</div>
        ))}

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

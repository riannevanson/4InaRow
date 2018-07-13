import { connect } from "react-redux";
import React from "react";
//import { userId } from "../../jwt";
import { updateMessage } from "../../actions/games";
//import { userId } from "../../jwt";
import "./GameDetails.css";

class Chat extends React.PureComponent {
  state = {};
  message = "";

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.message) {
      // console.log(this.props.chats[0].id, "chatid");
      return this.props.updateMessage(
        this.props.chats[0].id,
        this.state.message
      );
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showMessageOne = () => {
    // console.log(this.props.chats[0].message, "props");
    if (this.props.chats.length > 0) {
      return this.props.chats[0].message;
    }
  };

  showMessageTwo = () => {
    // console.log(this.props.chats[1].message, "props");
    if (this.props.chats.length > 1) {
      return this.props.chats[1].message;
    }
  };

  render() {
    return (
      <div className="chatroom">
        <h3>Chatbox</h3>
        {/* {this.props.chats.map(chat => (
          <div key={chat.message}>{chat.message}</div>
        ))} */}
        <div className="messageContainer">
          <div className="messageCurrentuser">
            <h2>{this.showMessageOne()}</h2>
          </div>
          <div className="messageEnemy">
            <h2>{this.showMessageTwo()}</h2>
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Type your message here:
            <input
              type="text"
              name="message"
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

export default connect(
  null,
  { updateMessage }
)(Chat);

import { connect } from "react-redux";
import React from "react";
//import { userId } from "../../jwt";
import { updateMessage } from "../../actions/games";
//import { userId } from "../../jwt";
import "./GameDetails.css";

class Chat extends React.PureComponent {
  state = {};

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.message) {
      console.log(this.props.chats[0].id, "chatid");
      this.props.updateMessage(this.props.chats[0].id, this.state.message);
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="chatroom">
        <h3>Chatbox</h3>
        {/* {this.props.chats.map(chat => (
          <div key={chat.message}>{chat.message}</div>
        ))} */}
        <div className="messagContainer">
          <div className="messageCurrentuser">
            {this.props.chats[0].message}
          </div>
          <div className="messageEnemy">{this.props.chats[1].message}</div>
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

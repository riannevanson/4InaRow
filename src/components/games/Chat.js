import { connect } from "react-redux";
import React from "react";
import { updateMessage } from "../../actions/games";
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
    let symbolPlayer = null;
    if (this.props.player)
      if (this.props.player.symbol === "x") {
        symbolPlayer = "chat-x";
      } else if (this.props.player.symbol === "o") {
        symbolPlayer = "chat-o";
      } else {
        symbolPlayer = "chat-default";
      }

    return (
      <div className="chatroom">
        <h3>Chatbox</h3>
        {/* {this.props.player.symbol} */}
        {/* {this.props.players.map(playerOne => (
          <div key={playerOne.id}>{playerOne.id}</div>
        ))} */}
        <div className="labelMessagesContainer">
          <div>
            <h2>Incoming Message</h2>
          </div>
          <div>
            <h2>Your Message</h2>
          </div>
        </div>
        <div className={symbolPlayer}>
          <div className="messageCurrentuser">"{this.showMessageOne()}"</div>
          <div className="messageCurrentuser">"{this.showMessageTwo()}"</div>
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

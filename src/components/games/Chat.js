import { connect } from "react-redux";
import React from "react";
import { userId } from "../../jwt";

const renderMessages = chats => {
  return (
    <div className="chatroom">
      <h3>Chatbox</h3>
      {chats.map(chat => <div key={chat.message}>{chat.message}</div>)}

      <form className="input" onSubmit={e => this.submitMessage(e)}>
        <input type="text" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
// submitMessage(e) {
//   e.preventDefault();
// }

export default ({ chats }) => renderMessages(chats);

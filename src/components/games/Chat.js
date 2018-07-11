import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Chat extends PureComponent {
  render() {
    return <div>'hi i am a chat</div>;
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(Chat);

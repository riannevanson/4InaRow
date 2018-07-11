import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getGames, joinGame, updateGame } from "../../actions/games";
import { getUsers } from "../../actions/users";
import { userId } from "../../jwt";
import Paper from "material-ui/Paper";
import Board from "./Board";
import "./GameDetails.css";

class GameDetails extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames();
      if (this.props.users === null) this.props.getUsers();
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id);

  makeMove = (toRow, toCell) => {
    const { game, updateGame } = this.props;

    let rowToFill = null

    // For the column clicked by the user find the lowest
    // row where the cell is not yet filled
    game.board.forEach(
      (row, rowIndex) => row.forEach((cell, cellIndex) => {
        // check the column index where user pressed &&
        // check whether cell is filled
        // then update the rowToFill with the rowIndex
        if (cellIndex === toCell && !cell) rowToFill=rowIndex
      })
    );

    // Update the board with the play symbol where the user clicked
    // This is the logic without gravity, commented out
    // const board = game.board.map(
    //   (row, rowIndex) => row.map((cell, cellIndex) => {
    //     if (rowIndex === toRow && cellIndex === toCell) return game.turn
    //     else return cell
    //   })
    // )

    // Update the board with the play symbol in the lowest empty row
    // where the user clicked
    // This is the logic with gravity
    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        // For the column clicked fill the lowest empty row with the player symbol
        if (rowIndex === rowToFill && cellIndex === toCell) return game.turn
        else return cell
      })
    );
    updateGame(game.id, board);
  };

  render() {
    const { game, users, authenticated, userId } = this.props;

    if (!authenticated) return <Redirect to="/login" />;

    if (game === null || users === null) return "Loading...";
    if (!game) return "Not found";

    const player = game.players.find(p => p.userId === userId);

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0];

    return (
      <Paper className="outer-paper">
        <h1>Game #{game.id}</h1>

        <p>Status: {game.status}</p>

        {game.status === "started" &&
          player &&
          player.symbol === game.turn && <div>It's your turn!</div>}

        {game.status === "pending" &&
          game.players.map(p => p.userId).indexOf(userId) === -1 && (
            <button onClick={this.joinGame}>Join Game</button>
          )}

        {winner && <p>Winner: {users[winner].firstName}</p>}

        <hr />
        <div className="board">
          {game.status !== "pending" && (
            <Board board={game.board} makeMove={this.makeMove} />
          )}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
});

const mapDispatchToProps = {
  getGames,
  getUsers,
  joinGame,
  updateGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetails);

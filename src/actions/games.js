import * as request from "superagent";
import { baseUrl } from "../constants";
import { logout } from "./users";
import { isExpired } from "../jwt";

export const ADD_GAME = "ADD_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const UPDATE_GAMES = "UPDATE_GAMES";
export const JOIN_GAME_SUCCESS = "JOIN_GAME_SUCCESS";
export const UPDATE_GAME_SUCCESS = "UPDATE_GAME_SUCCESS";
export const UPDATE_MESSAGE_SUCCESS = "UPDATE_MESSAGE_SUCCESS";

const updateGames = games => ({
  type: UPDATE_GAMES,
  payload: games
});

// const updateMessage = chat => ({
//   type: UPDATE_MESSAGE,
//   payload: chat
// });

const addGame = game => ({
  type: ADD_GAME,
  payload: game
});

const updateGameSuccess = () => ({
  type: UPDATE_GAME_SUCCESS
});

const updateMessageSuccess = () => ({
  type: UPDATE_MESSAGE_SUCCESS
});

const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS
});

export const getGames = () => (dispatch, getState) => {
  const state = getState();
  if (!state.currentUser) return null;
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/games`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(updateGames(result.body)))
    .catch(err => console.error(err));
};

export const joinGame = gameId => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/games/${gameId}/players`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(_ => dispatch(joinGameSuccess()))
    .catch(err => console.error(err));
};

export const createGame = () => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .post(`${baseUrl}/games`)
    .set("Authorization", `Bearer ${jwt}`)
    .then(result => dispatch(addGame(result.body)))
    .catch(err => console.error(err));
};

export const updateGame = (gameId, board) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;

  if (isExpired(jwt)) return dispatch(logout());

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({ board })
    .then(_ => dispatch(updateGameSuccess()))
    .catch(err => console.error(err));
};

export const updateMessage = (chatId, message) => (dispatch, getState) => {
  const state = getState();
  const jwt = state.currentUser.jwt;
  console.log(message, "message");
  if (isExpired(jwt)) return dispatch(logout());

  request
    .patch(`${baseUrl}/chats/${chatId}/`)
    .set("Authorization", `Bearer ${jwt}`)
    .send({ message })
    .then(_ => dispatch(updateMessageSuccess()))
    .catch(err => console.error(err));
};

import { UPDATE_MESSAGE } from "../actions/games";
import { USER_LOGOUT } from "../actions/users";

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
      return null;

    case UPDATE_MESSAGE:
      console.log("you updated a message", payload);
      return {
        ...state,
        [payload.id]: payload
      };

    default:
      return state;
  }
};

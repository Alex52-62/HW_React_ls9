import { TOGGLE_SHOW_NAME, CHANGE_NAME } from "./actions";

const initialState = {
  showName: false,
  name: "default",
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SHOW_NAME: {
      return {
        ...state,
        showName: !state.showName,
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        name: payload,
      };
    }
    default:
      return state;
  }
};

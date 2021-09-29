import { TOGGLE_LOGREG } from "./actions";

const initialState = {
  showReg: false,
  reg: "default",
};

export const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_LOGREG: {
      return {
        ...state,
        showReg: !state.showReg,
      };
    }
    default:
      return state;
  }
};

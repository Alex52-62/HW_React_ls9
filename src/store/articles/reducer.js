import {
  GET_ARTICLES_PENDING,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
} from "./actions";
import { REQUEST_STATUS } from "../../utils/constants";

const initialState = {
  list: [],
  request: {
    error: null,
    status: REQUEST_STATUS.IDLE,
  },
};

export const articlesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES_PENDING: {
      return {
        ...state,
        request: {
          error: null,
          status: REQUEST_STATUS.PENDING,
        },
      };
    }
    case GET_ARTICLES_SUCCESS: {
      return {
        ...state,
        request: {
          ...state.request,
          status: REQUEST_STATUS.SUCCESS,
        },
        list: payload,
      };
    }
    case GET_ARTICLES_FAILURE: {
      return {
        ...state,
        request: {
          error: payload,
          status: REQUEST_STATUS.FAILURE,
        },
      };
    }
    default:
      return state;
  }
};

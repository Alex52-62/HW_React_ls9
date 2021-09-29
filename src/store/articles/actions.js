import { PUBLIC_URL } from "../../utils/constants";

export const GET_ARTICLES_PENDING = "ARTICLES::GET_PENDING";
export const GET_ARTICLES_SUCCESS = "ARTICLES::GET_SUCCESS";
export const GET_ARTICLES_FAILURE = "ARTICLES::GET_FAILURE";

const getArticlesPending = () => ({
  type: GET_ARTICLES_PENDING,
});

const getArticlesSuccess = (articles) => ({
  type: GET_ARTICLES_SUCCESS,
  payload: articles,
});

const getArticlesFailure = (error) => ({
  type: GET_ARTICLES_FAILURE,
  payload: error,
});

export const getArticles = () => async (dispatch) => {
  dispatch(getArticlesPending());

  try {
    const response = await fetch(PUBLIC_URL);

    if (!response.ok) {
      throw new Error(`error ${response.status}`);
    }

    const result = await response.json();
    dispatch(getArticlesSuccess(result));
  } catch (e) {
    dispatch(getArticlesFailure(e.message));
  }
};

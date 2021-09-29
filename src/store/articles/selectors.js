import { REQUEST_STATUS } from "../../utils/constants";

export const selectArticlesLoading = (state) =>
  state.articles.request.status === REQUEST_STATUS.PENDING;
export const selectArticles = (state) => state.articles.list;
export const selectArticlesError = (state) => state.articles.request.error;

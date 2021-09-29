import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ authed, ...props }) =>
  authed ? <Route {...props} /> : <Redirect to="/" />;

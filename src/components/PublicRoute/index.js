import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({ authed, ...props }) =>
  !authed ? <Route {...props} /> : <Redirect to="/Profile" />;

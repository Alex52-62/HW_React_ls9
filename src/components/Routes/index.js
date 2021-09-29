import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { signOut, auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

import { PrivateRoute } from "../PrivateRoute";
import { PublicRoute } from "../PublicRoute";
import { Home } from "../Home";
import Chats from "../Chats";
import { Profile, ThemedProfile } from "../Profile";
import { NotFound } from "../NotFound";
import { News } from "../News";
import Relax from "../Relax";
import { Photos } from "../Photo";
import "./style.css";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/Profile", name: "Profile", Component: Profile },
  { path: "/Chats", name: "Chat Room", Component: Chats },
  { path: "/Relax", name: "Relax", Component: Relax },
  { path: "/News", name: "News", Component: News },
  { path: "/Photo", name: "Photos", Component: Photos },
];

export const Routing = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BrowserRouter>
      <>
        <Navbar bg="light">
          <Nav className="mx-auto">
            {routes.map((route) => (
              <Nav.Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                activeStyle={{ color: "green", fontWeight: "bold" }}
                exact
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar>

        <Container className="container">
          <Switch>
            <PublicRoute path="/" exact authed={authed}>
              <Home />
            </PublicRoute>
            <PrivateRoute path="/Profile" exact authed={authed}>
              <ThemedProfile
                authed={authed}
                theme={null}
                onLogout={handleLogout}
              />
            </PrivateRoute>
            <PrivateRoute
              path="/Chats/:chatId?"
              component={Chats}
              authed={authed}
            />
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      <Component />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Container>
      </>
    </BrowserRouter>
  );
};

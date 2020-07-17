import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {
  HomePage,
  UserDash
} from "./components";
import Auth from "./services/AuthService";

export default function App() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    Auth.load().then( (res) => {
      setLoad(true);
    },
    err => {
        console.log(`An error has occurred during authentication: ${err.response.data}`);
    });
  }, []);

  return (
    <>
      {load ?
      <Router>
        <Switch>
          <Route exact path="/home">
            {Auth.authenticated ? <UserDash /> : <Redirect to="/" />}
          </Route>
          <Route path='/'>
            {Auth.authenticated ? <Redirect to="/home" /> : <HomePage />}
          </Route>
        </Switch>
      </Router>
      :
      <div>Loading...</div>
    }
    </>
  );
}

//Reference: https://reactrouter.com/web/example/route-config
const routes = [
  {
    path: "/home",
    component: UserDash,
    protected: true
  },
  {
    path: "/",
    component: HomePage,
    protected: false
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      exact path={route.path}
      render={(props) => {
        //check if route is protected
        if ((route.protected && Auth.authenticated) || !route.protected) {
          // pass the sub-routes down to keep nesting
          return <route.component {...props} routes={route.routes} />;
        } else {
          return <Redirect to={{ pathname: "/", state: { from: props.location } }}/>;
        }
      }}
    />
  );
}
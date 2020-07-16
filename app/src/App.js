import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  HomePage
} from "./components";

export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

//Reference: https://reactrouter.com/web/example/route-config
const routes = [
  {
    path: "/",
    component: HomePage,
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
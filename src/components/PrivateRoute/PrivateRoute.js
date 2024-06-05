// src/components/PrivateRoute.js
import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading, isSubscribed } = useAuth();

  if (isLoading) {
    return (
      <Route {...rest}>
        <Loading />
      </Route>
    );
  }

  return (
    <Route {...rest}>
      {({ location }) =>
        user ? (
          isSubscribed ? (
            children
          ) : (
            <Redirect to={{ pathname: "/subscribe", state: { from: location } }} />
          )
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    </Route>
  );
};

export default PrivateRoute;
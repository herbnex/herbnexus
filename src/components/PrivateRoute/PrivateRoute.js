import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children, requireSubscription = true, ...rest }) => {
  const { user, isLoading, isSubscribed, isDoctor } = useAuth();

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
          requireSubscription && !isSubscribed && !isDoctor ? (
            <Redirect to={{ pathname: "/subscribe", state: { from: location } }} />
          ) : (
            children
          )
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    </Route>
  );
};

export default PrivateRoute;

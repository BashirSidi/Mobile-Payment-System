import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ role, isPrivate, ...props }) => {
  const { user, loading, ready } = useContext(AuthContext);

  if (!ready) {
    return null;
  }

  if (loading || !ready) {
    return null;
  }

  if (user && !isPrivate) {
    return (
      <Redirect
        to={{
          pathname: props.location.state?.from.pathname || "/dashboard",
          state: { from: props.location },
        }}
      />
    );
  } else if (!user && isPrivate) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  } else {
    return <Route {...props} />;
  }
};

const AuthedRoute = (isPrivate) => (props) =>
  <ProtectedRoute {...{ isPrivate, ...props }} />;

export const InternalRoute = AuthedRoute(true);
export const ExternalRoute = AuthedRoute(false);

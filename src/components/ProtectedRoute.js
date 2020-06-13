import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout";

function ProtectedRoute({ component: Component, ...rest }) {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.info ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
}

export default ProtectedRoute;

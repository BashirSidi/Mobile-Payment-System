import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/protectedRoute";
import { Route, Switch } from "react-router-dom";
import Registration from "./pages/registration/registration";
import Authentication from "./pages/authentication/authentication";
import Dashboard from "./pages";
import Customers from "./pages/customer/customers";
import Complain from "./pages/customer/complain";

function App() {
  return (
    <React.Fragment>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-right"
      >
        <AuthProvider>
          {/* <Provider store={store}> */}
          {/* <Router> */}
          <Switch>
            <ProtectedRoute
              exact
              isPrivate={false}
              path="/"
              component={() => "Well come to mobile bill system"}
            />
            <ProtectedRoute
              exact
              isPrivate={false}
              path="/login"
              component={Authentication}
            />

            <ProtectedRoute
              exact
              isPrivate={false}
              path="/register"
              component={Registration}
            />
            <ProtectedRoute
              exact
              isPrivate={true}
              path="/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              isPrivate={true}
              path="/dashboard/all-customers"
              component={Customers}
            />
            <ProtectedRoute
              exact
              isPrivate={true}
              path="/dashboard/make-complain"
              component={Complain}
            />
            <Route component={() => "PAGE NOT FOUND"} />
          </Switch>
          {/* </Router> */}
          {/* </Provider> */}
        </AuthProvider>
      </ToastProvider>
    </React.Fragment>
  );
}

export default App;

import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

//ProtectedRoute
import ProtectedRouter from "./components/ProtectedRoute";

import AuthLoading from "./components/AuthLoading";

// Views
import { SignInView, SignUpView, SignOutView } from "./views/auth";
import DashboardView from "./views/dashboard";
import { AllProducts } from "./views/product";
import { FormProduct } from "./views/productnew";
import { FormIngredientes } from "./views/ingredientes";
import { AllTables } from "./views/table";
import { AllDeliverys } from "./views/delivery";
import { AllKitchens } from "./views/kitchen";
import { AllBars } from "./views/bar";
import { Error404 } from "./views/errors";

const App = () => {
  // if (loggedIn) {
  return (
    <Provider store={store}>
      <AuthLoading>
        <BrowserRouter>
          <Switch>
            <ProtectedRouter exact path="/" component={DashboardView} />
            <ProtectedRouter exact path="/products" component={AllProducts} />
            <ProtectedRouter
              exact
              path="/product/new"
              component={FormProduct}
            />
            <ProtectedRouter
              exact
              path="/ingredientes"
              component={FormIngredientes}
            />
            <ProtectedRouter exact path="/tables" component={AllTables} />
            <ProtectedRouter exact path="/deliverys" component={AllDeliverys} />
            <ProtectedRouter exact path="/kitchens" component={AllKitchens} />
            <ProtectedRouter exact path="/bars" component={AllBars} />
            {/* <ProtectedRouter exact path="/sign-out" component={SignOutView} /> */}
            <Route exact path="/sign-in" component={SignInView} />
            <Route exact path="/sign-up" component={SignUpView} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </AuthLoading>
    </Provider>
  );
  // } else {
  //   routes = (
  //     <Switch>
  //       <Route exact path="/sign-in" component={SignInView} />
  //       <Route exact path="/sign-up" component={SignUpView} />
  //       <Redirect path="/sign-out" to="/" />
  //       <Redirect path="/" to="/sign-in" />
  //       <Route component={Error404} />
  //     </Switch>
  //   );
  // }
  // return routes;
};

// const mapStateToProps = ({ firebase }) => ({
//   loggedIn: firebase.auth.uid ? true : null,
// });

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
// import Auth from "layouts/Auth.js"; // FIX: Commented out Auth layout import


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* Admin layout routes */}
      <Route path="/admin" component={Admin} />
      
      {/* FIX: Commented out the Auth layout route */}
      {/* <Route path="/auth" component={Auth} /> */}
      
      {/* Redirect root path to the admin dashboard */}
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

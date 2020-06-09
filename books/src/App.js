import React, { lazy, Suspense } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// styling
import "./css/bootstrap.min.css";
import "./css/plugins.css";
import "./css/style.css";
import "./css/custom.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const HomeComponent = lazy(() => import("./components/home/Home"));
const BooksListComponent = lazy(() => import("./components/BooksList"));
const CommunityComponent = lazy(() => import("./components/Community"));
const SingleBookComponent = lazy(() => import("./components/BookPage"));
const WishListComponent = lazy(() => import("./components/Wishlist"));
const AccountComponent = lazy(() => import("./components/Account"));
const NoMatchComponent = lazy(() => import("./components/NoMatch"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={HomeComponent}
            ></PrivateRoute>
            <Route path="/community">
              <CommunityComponent />
            </Route>
            <Route path="/book/:id">
              <SingleBookComponent />
            </Route>
            <Route path="/books">
              <BooksListComponent />
            </Route>
            <Route path="/wishlist">
              <WishListComponent />
            </Route>
            <Route path="/account">
              <AccountComponent />
            </Route>
            <Route path="*">
              <NoMatchComponent />
            </Route>
          </Switch>
          <Footer />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;

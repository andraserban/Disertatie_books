import React, {lazy, Suspense} from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';

// styling
import "./css/bootstrap.min.css";
import "./css/plugins.css";
import "./css/style.css";
import "./css/custom.css";
import "./styles/global.scss";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./PrivateRoute";
import {AuthProvider} from "./Auth";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ClubProvider} from "./ClubProvider";

const HomeComponent = lazy(() => import("./components/home/Home"));
const BooksListComponent = lazy(() => import("./components/BooksList"));
const CommunityComponent = lazy(() => import("./components/Community"));
const SingleBookComponent = lazy(() => import("./components/BookPage"));
const WishListComponent = lazy(() => import("./components/Wishlist"));
const AccountComponent = lazy(() => import("./components/Account"));
const ProfileComponent = lazy(() => import("./components/Profile"));
const BookClubComponent = lazy(() => import("./components/club/BookClub"));
const BookClubArticleComponent = lazy(() => import("./components/club/BookClubArticle"));
const BookClubAdminComponent = lazy(() => import("./components/club/BookClubAdmin"));

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Header/>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomeComponent} />

                        <Route path="/account">
                            <AccountComponent/>
                        </Route>

                        <PrivateRoute path="/community" component={CommunityComponent} />
                        <PrivateRoute path="/book/:id" component={SingleBookComponent} />
                        <PrivateRoute path="/books" component={BooksListComponent} />
                        <PrivateRoute path="/wishlist" component={WishListComponent} />
                        <PrivateRoute path="/profile" component={ProfileComponent} />

                        <ClubProvider>
                            <PrivateRoute path="/club" exact component={BookClubComponent} />
                            <PrivateRoute path="/club/admin/submit" exact component={BookClubAdminComponent} />
                            <PrivateRoute path="/club/:uid" exact component={BookClubArticleComponent} />
                        </ClubProvider>

                    </Switch>
                    <Footer/>
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;

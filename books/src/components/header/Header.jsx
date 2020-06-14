import {Link} from "react-router-dom";
import React, {useContext} from "react";
import "../header/header.scss";
import logoImg from "../../images/logo/logo.png";
import firebase from '../../firebase';
import {AuthContext} from "../../Auth";
import { useRouteMatch } from "react-router-dom";

export default function Header() {
    const {currentUser} = useContext(AuthContext);
    const match = useRouteMatch();

    if (!currentUser) {
        return <></>;
    }

    return (
        <header id="wn__header" className="header__area header__absolute sticky__header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-6 col-lg-2">
                        <div className="logo">
                            <Link to="/">
                                <img src={logoImg} alt="logo images"/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8 d-none d-lg-block">
                        <nav className="mainmenu__nav d-flex justify-content-between">
                            <ul className="meninmenu header__sidebar__right d-flex justify-content-start">
                                <li className="drop with--one--item"><Link to="/">Home</Link></li>
                                <li className="drop"><Link to="/books">Library</Link></li>
                                <li className="drop"><Link to="#">Book club</Link>
                                    <div className="megamenu dropdown">
                                        <ul className="item item01">
                                            <li><Link to="/club">Dashboard</Link></li>
                                            <li><Link to="/club/admin/submit">Submit</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="wishlist"><Link to="/wishlist">Wishlist</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-6 col-sm-6 col-6 col-lg-2">
                        <nav className="mainmenu__nav">
                            <ul className="header__sidebar__right meninmenu d-flex justify-content-end align-items-center">
                                {currentUser && <li className="drop"><Link to="/profile">{currentUser.username}</Link></li>}
                                <li><Link to="#" onClick={() => firebase.auth().signOut()}>Log out</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

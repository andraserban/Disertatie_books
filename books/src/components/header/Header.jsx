import {Link} from "react-router-dom";
import React, {useContext} from "react";
import "../header/header.scss";
import logoImg from "../../images/logo/logo.png";
import firebase from '../../firebase';
import {AuthContext} from "../../Auth";

export default function Header() {
    const {currentUser} = useContext(AuthContext);

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
                                <li className="drop"><Link to="/books">Books</Link></li>
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

                <div className="row d-none">
                    <div className="col-lg-12 d-none">
                        <nav className="mobilemenu__nav">
                            <ul className="meninmenu">
                                <li><Link to="index.html">Home</Link>
                                    <ul>
                                        <li><Link to="index.html">Home Style Default</Link></li>
                                        <li><Link to="index-2.html">Home Style Two</Link></li>
                                        <li><Link to="index-3.html">Home Style Three</Link></li>
                                        <li><Link to="index-box.html">Home Box Style</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="#">Pages</Link>
                                    <ul>
                                        <li><Link to="about.html">About Page</Link></li>
                                        <li><Link to="portfolio.html">Portfolio</Link>
                                            <ul>
                                                <li><Link to="portfolio.html">Portfolio</Link></li>
                                                <li><Link to="portfolio-three-column.html">Portfolio 3 Column</Link>
                                                </li>
                                                <li><Link to="portfolio-details.html">Portfolio Details</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="my-account.html">My Account</Link></li>
                                        <li><Link to="cart.html">Cart Page</Link></li>
                                        <li><Link to="checkout.html">Checkout Page</Link></li>
                                        <li><Link to="wishlist.html">Wishlist Page</Link></li>
                                        <li><Link to="error404.html">404 Page</Link></li>
                                        <li><Link to="faq.html">Faq Page</Link></li>
                                        <li><Link to="team.html">Team Page</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="shop-grid.html">Shop</Link>
                                    <ul>
                                        <li><Link to="shop-grid.html">Shop Grid</Link></li>
                                        <li><Link to="shop-list.html">Shop List</Link></li>
                                        <li><Link to="shop-left-sidebar.html">Shop Left Sidebar</Link></li>
                                        <li><Link to="shop-right-sidebar.html">Shop Right Sidebar</Link></li>
                                        <li><Link to="shop-no-sidebar.html">Shop No sidebar</Link></li>
                                        <li><Link to="single-product.html">Single Product</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="blog.html">Blog</Link>
                                    <ul>
                                        <li><Link to="blog.html">Blog Page</Link></li>
                                        <li><Link to="blog-left-sidebar.html">Blog Left Sidebar</Link></li>
                                        <li><Link to="blog-no-sidebar.html">Blog No Sidebar</Link></li>
                                        <li><Link to="blog-details.html">Blog Details</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="contact.html">Contact</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="#" onClick={() => firebase.auth().signOut()}>Log out</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="mobile-menu d-block d-lg-none">
                </div>

            </div>
        </header>
    );
}

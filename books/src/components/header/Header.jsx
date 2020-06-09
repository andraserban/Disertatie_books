import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "../header/header.scss";
import logoImg from "../../images/logo/logo.png";
import firebase from '../../firebase';
import { AuthContext } from "../../Auth";

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
                        <Link to="index.html">
                            <img src={logoImg} alt="logo images"/>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-8 d-none d-lg-block">
                    <nav className="mainmenu__nav">
                        <ul className="meninmenu d-flex justify-content-start">
                            <li className="drop with--one--item"><Link to="index.html">Home</Link>
                                <div className="megamenu dropdown">
                                    <ul className="item item01">
                                        <li><Link to="index.html">Home Style Default</Link></li>
                                        <li><Link to="index-2.html">Home Style Two</Link></li>
                                        <li><Link to="index-3.html">Home Style Three</Link></li>
                                        <li><Link to="index-box.html">Home Box Style</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="drop"><Link to="#">Shop</Link>
                                <div className="megamenu mega03">
                                    <ul className="item item03">
                                        <li className="title">Shop Layout</li>
                                        <li><Link to="shop-grid.html">Shop Grid</Link></li>
                                        <li><Link to="shop-list.html">Shop List</Link></li>
                                        <li><Link to="shop-left-sidebar.html">Shop Left Sidebar</Link></li>
                                        <li><Link to="shop-right-sidebar.html">Shop Right Sidebar</Link></li>
                                        <li><Link to="shop-no-sidebar.html">Shop No sidebar</Link></li>
                                        <li><Link to="single-product.html">Single Product</Link></li>
                                    </ul>
                                    <ul className="item item03">
                                        <li className="title">Shop Page</li>
                                        <li><Link to="my-account.html">My Account</Link></li>
                                        <li><Link to="cart.html">Cart Page</Link></li>
                                        <li><Link to="checkout.html">Checkout Page</Link></li>
                                        <li><Link to="wishlist.html">Wishlist Page</Link></li>
                                        <li><Link to="error404.html">404 Page</Link></li>
                                        <li><Link to="faq.html">Faq Page</Link></li>
                                    </ul>
                                    <ul className="item item03">
                                        <li className="title">Bargain Books</li>
                                        <li><Link to="shop-grid.html">Bargain Bestsellers</Link></li>
                                        <li><Link to="shop-grid.html">Activity Kits</Link></li>
                                        <li><Link to="shop-grid.html">B&N classNameics</Link></li>
                                        <li><Link to="shop-grid.html">Books Under $5</Link></li>
                                        <li><Link to="shop-grid.html">Bargain Books</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="drop"><Link to="shop-grid.html">Books</Link>
                                <div className="megamenu mega03">
                                    <ul className="item item03">
                                        <li className="title">Categories</li>
                                        <li><Link to="shop-grid.html">Biography </Link></li>
                                        <li><Link to="shop-grid.html">Business </Link></li>
                                        <li><Link to="shop-grid.html">Cookbooks </Link></li>
                                        <li><Link to="shop-grid.html">Health & Fitness </Link></li>
                                        <li><Link to="shop-grid.html">History </Link></li>
                                    </ul>
                                    <ul className="item item03">
                                        <li className="title">Customer Favourite</li>
                                        <li><Link to="shop-grid.html">Mystery</Link></li>
                                        <li><Link to="shop-grid.html">Religion & Inspiration</Link></li>
                                        <li><Link to="shop-grid.html">Romance</Link></li>
                                        <li><Link to="shop-grid.html">Fiction/Fantasy</Link></li>
                                        <li><Link to="shop-grid.html">Sleeveless</Link></li>
                                    </ul>
                                    <ul className="item item03">
                                        <li className="title">Collections</li>
                                        <li><Link to="shop-grid.html">Science </Link></li>
                                        <li><Link to="shop-grid.html">Fiction/Fantasy</Link></li>
                                        <li><Link to="shop-grid.html">Self-Improvemen</Link></li>
                                        <li><Link to="shop-grid.html">Home & Garden</Link></li>
                                        <li><Link to="shop-grid.html">Humor Books</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="drop"><Link to="shop-grid.html">Kids</Link>
                                <div className="megamenu mega02">
                                    <ul className="item item02">
                                        <li className="title">Top Collections</li>
                                        <li><Link to="shop-grid.html">American Girl</Link></li>
                                        <li><Link to="shop-grid.html">Diary Wimpy Kid</Link></li>
                                        <li><Link to="shop-grid.html">Finding Dory</Link></li>
                                        <li><Link to="shop-grid.html">Harry Potter</Link></li>
                                        <li><Link to="shop-grid.html">Land of Stories</Link></li>
                                    </ul>
                                    <ul className="item item02">
                                        <li className="title">More For Kids</li>
                                        <li><Link to="shop-grid.html">B&N Educators</Link></li>
                                        <li><Link to="shop-grid.html">B&N Kids' Club</Link></li>
                                        <li><Link to="shop-grid.html">Kids' Music</Link></li>
                                        <li><Link to="shop-grid.html">Toys & Games</Link></li>
                                        <li><Link to="shop-grid.html">Hoodies</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="drop"><Link to="#">Pages</Link>
                                <div className="megamenu dropdown">
                                    <ul className="item item01">
                                        <li><Link to="about.html">About Page</Link></li>
                                        <li className="label2"><Link to="portfolio.html">Portfolio</Link>
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
                                </div>
                            </li>
                            <li className="drop"><Link to="blog.html">Blog</Link>
                                <div className="megamenu dropdown">
                                    <ul className="item item01">
                                        <li><Link to="blog.html">Blog Page</Link></li>
                                        <li><Link to="blog-left-sidebar.html">Blog Left Sidebar</Link></li>
                                        <li><Link to="blog-no-sidebar.html">Blog No Sidebar</Link></li>
                                        <li><Link to="blog-details.html">Blog Details</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li><Link to="contact.html">Contact</Link></li>
                            <li><Link to="#" onClick={() => firebase.auth().signOut()}>Log out</Link></li>

                        </ul>
                    </nav>
                </div>
                <div className="col-md-6 col-sm-6 col-6 col-lg-2">
                    <ul className="header__sidebar__right d-flex justify-content-end align-items-center">
                        
                        <li className="wishlist"><Link to="#"></Link></li>
                        <li className="shopcart">
                            
                            <div className="block-minicart minicart__active">
                                <div className="minicart-content-wrapper">
                                    <div className="micart__close">
                                        <span>close</span>
                                    </div>
                                    <div className="items-total d-flex justify-content-between">
                                        <span>3 items</span>
                                        <span>Cart Subtotal</span>
                                    </div>
                                    <div className="total_amount text-right">
                                        <span>$66.00</span>
                                    </div>
                                    <div className="mini_action checkout">
                                        <a className="checkout__btn" href="cart.html">Go to Checkout</a>
                                    </div>
                                    <div className="single__items">
                                        <div className="miniproduct">
                                            <div className="item01 d-flex">
                                                <div className="thumb">
                                                    <Link to="product-details.html"><img
                                                            src="images/product/sm-img/1.jpg"
                                                            alt="product images"/></Link>
                                                </div>
                                                <div className="content">
                                                    <h6><Link to="product-details.html">Voyage Yoga Bag</Link></h6>
                                                    <span className="prize">$30.00</span>
                                                    <div className="product_prize d-flex justify-content-between">
                                                        <span className="qun">Qty: 01</span>
                                                        <ul className="d-flex justify-content-end">
                                                            <li><Link to="#"><i className="zmdi zmdi-settings"></i></Link>
                                                            </li>
                                                            <li><Link to="#"><i className="zmdi zmdi-delete"></i></Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item01 d-flex mt--20">
                                                <div className="thumb">
                                                    <Link to="product-details.html"><img
                                                            src="images/product/sm-img/3.jpg"
                                                            alt="product images"/></Link>
                                                </div>
                                                <div className="content">
                                                    <h6><Link to="product-details.html">Impulse Duffle</Link></h6>
                                                    <span className="prize">$40.00</span>
                                                    <div className="product_prize d-flex justify-content-between">
                                                        <span className="qun">Qty: 03</span>
                                                        <ul className="d-flex justify-content-end">
                                                            <li><Link to="#"><i className="zmdi zmdi-settings"></i></Link>
                                                            </li>
                                                            <li><Link to="#"><i className="zmdi zmdi-delete"></i></Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item01 d-flex mt--20">
                                                <div className="thumb">
                                                    <Link to="product-details.html"><img
                                                            src="images/product/sm-img/2.jpg"
                                                            alt="product images"/></Link>
                                                </div>
                                                <div className="content">
                                                    <h6><Link to="product-details.html">Compete Track Tote</Link></h6>
                                                    <span className="prize">$40.00</span>
                                                    <div className="product_prize d-flex justify-content-between">
                                                        <span className="qun">Qty: 03</span>
                                                        <ul className="d-flex justify-content-end">
                                                            <li><Link to="#"><i className="zmdi zmdi-settings"></i></Link>
                                                            </li>
                                                            <li><Link to="#"><i className="zmdi zmdi-delete"></i></Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mini_action cart">
                                        <a className="cart__btn" href="cart.html">View and edit cart</a>
                                    </div>
                                </div>
                            </div>
                           
                        </li>
                        <li className="setting__bar__icon"><a className="setting__active" href="#"></a>
                            <div className="searchbar__content setting__block">
                                <div className="content-inner">
                                    <div className="switcher-currency">
                                        <strong className="label switcher-label">
                                            <span>Currency</span>
                                        </strong>
                                        <div className="switcher-options">
                                            <div className="switcher-currency-trigger">
                                                <span className="currency-trigger">USD - US Dollar</span>
                                                <ul className="switcher-dropdown">
                                                    <li>GBP - British Pound Sterling</li>
                                                    <li>EUR - Euro</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="switcher-currency">
                                        <strong className="label switcher-label">
                                            <span>Language</span>
                                        </strong>
                                        <div className="switcher-options">
                                            <div className="switcher-currency-trigger">
                                                <span className="currency-trigger">English01</span>
                                                <ul className="switcher-dropdown">
                                                    <li>English02</li>
                                                    <li>English03</li>
                                                    <li>English04</li>
                                                    <li>English05</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="switcher-currency">
                                        <strong className="label switcher-label">
                                            <span>Select Store</span>
                                        </strong>
                                        <div className="switcher-options">
                                            <div className="switcher-currency-trigger">
                                                <span className="currency-trigger">Fashion Store</span>
                                                <ul className="switcher-dropdown">
                                                    <li>Furniture</li>
                                                    <li>Shoes</li>
                                                    <li>Speaker Store</li>
                                                    <li>Furniture</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="switcher-currency">
                                        <strong className="label switcher-label">
                                            <span>My Account</span>
                                        </strong>
                                        <div className="switcher-options">
                                            <div className="switcher-currency-trigger">
                                                <div className="setting__menu">
                                                    <span><Link to="#">Compare Product</Link></span>
                                                    <span><Link to="#">My Account</Link></span>
                                                    <span><Link to="#">My Wishlist</Link></span>
                                                    <span><Link to="#">Sign In</Link></span>
                                                    <span><Link to="#">Create An Account</Link></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
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
                                            <li><Link to="portfolio-three-column.html">Portfolio 3 Column</Link></li>
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

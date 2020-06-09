import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../Auth";

export default function Footer() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <></>;
  }

  return (
    <footer id="wn__footer" className="footer__area bg__cat--8 brown--color">
      <div className="footer-static-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer__widget footer__menu">
                <div className="ft__logo">
                  <Link to="index.html">
                    <img src="images/logo/3.png" alt="logo" />
                  </Link>
                </div>
                <p>A room without books is like a body without a soul.</p>

                <div className="footer__content">
                  <ul className="social__net social__net--2 d-flex justify-content-center">
                    <li>
                      <Link to="#">
                        <i className="bi bi-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="bi bi-google"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="bi bi-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="bi bi-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="bi bi-youtube"></i>
                      </Link>
                    </li>
                  </ul>
                  <ul className="mainmenu d-flex justify-content-center">
                    <li>
                      <Link to="index.html">Trending</Link>
                    </li>
                    <li>
                      <Link to="index.html">Best Seller</Link>
                    </li>
                    <li>
                      <Link to="index.html">All Product</Link>
                    </li>
                    <li>
                      <Link to="index.html">Wishlist</Link>
                    </li>
                    <li>
                      <Link to="index.html">Blog</Link>
                    </li>
                    <li>
                      <Link to="index.html">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="copyright">
                <div className="copy__right__inner text-left">
                  <p>
                    Copyright <i className="fa fa-copyright"></i>{" "}
                    <Link to="#">Books Lovers</Link> All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="payment text-right">
                <img src="images/icons/payment.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

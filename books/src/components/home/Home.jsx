import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import harryPotter1Img from "../../images/fantasy/HarryPotter1.jpg";
import markerImg from "../../images/mistery/Marker.jpg";
import daVinciCodeImg from "../../images/mistery/DaVinciCode.jpg";
import centralParkImg from "../../images/love/CentralPark.jpg";
import harryPotter2Img from "../../images/fantasy/HarryPotter2.jpg";
import harryPotter3Img from "../../images/fantasy/HarryPotter3.jpg";
import harryPotter4Img from "../../images/fantasy/HarryPotter4.jpg";
import oneDayImg from "../../images/best_seller/oneDay.jpg";
import perksImg from "../../images/best_seller/Perks.jpg";
import divergentImg from "../../images/best_seller/divergent.jpg";



export default function Home() {
  const [users, setUsers] = useState([]);
 
  const getUsers = () => {
    firebase
        .firestore()
        .collection("users")
        .get()
        .then(snapshot => {
          const allUsers = snapshot.docs.map(doc => doc.data());
          
          setUsers(allUsers);
        })
  }

  useEffect(() => {
     getUsers();
  }, []);


  return (
    <div>
      <ul>
        {users.map((user, key) => (
          <li key={key}>{user.userID}</li>
        ))}
      </ul>
      <section className="wn__product__area brown--color pt--80  pb--30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center">
                <h2 className="title__be--2">
                  New <span className="color--theme">Products</span>
                </h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered lebmid alteration in
                  some ledmid form
                </p>
              </div>
            </div>
          </div>

          <div className="furniture--4 border--round arrows_style owl-carousel owl-theme mt--50">
            <div className="product product__style--3">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html">
                  <img src={harryPotter1Img} alt="harry potter 1 book" />
                </Link>
                <Link className="second__img animation1" to="single-product.html">
                  <img src={harryPotter1Img} alt="harry potter 1 images" />
                </Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SELLER</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4>
                  <Link to="single-product.html">
                    Harry Potter And The Philosopher's Stone
                  </Link>
                </h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li>
                        <Link className="cart" to="cart.html">
                          <i className="bi bi-shopping-bag4"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="wishlist" to="wishlist.html">
                          <i className="bi bi-shopping-cart-full"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="compare" to="#">
                          <i className="bi bi-heart-beat"></i>
                        </Link>
                      </li>
                      <li>
                        <a
                          data-toggle="modal"
                          title="Quick View"
                          className="quickview modal-view detail-link"
                          href="#productmodal"
                        >
                          <i className="bi bi-search"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product__hover--content">
                  <ul className="rating d-flex">
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="product product__style--3">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html">
                  <img src={markerImg} alt="marker book" />
                </Link>
                <Link className="second__img animation1" to="single-product.html">
                  <img src="images/books/4.jpg" alt="product image" />
                </Link>
                <div className="hot__box color--2">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4>
                  <Link to="single-product.html">Marker</Link>
                </h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li>
                        <Link className="cart" to="cart.html">
                          <i className="bi bi-shopping-bag4"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="wishlist" to="wishlist.html">
                          <i className="bi bi-shopping-cart-full"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="compare" to="#">
                          <i className="bi bi-heart-beat"></i>
                        </Link>
                      </li>
                      <li>
                        <a
                          data-toggle="modal"
                          title="Quick View"
                          className="quickview modal-view detail-link"
                          href="#productmodal"
                        >
                          <i className="bi bi-search"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product__hover--content">
                  <ul className="rating d-flex">
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="product product__style--3">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html">
                  <img src={daVinciCodeImg} alt="DaViniCode book" />
                </Link>
                <Link className="second__img animation1" to="single-product.html">
                  <img src="images/books/6.jpg" alt="product image" />
                </Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALLER</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4>
                  <Link to="single-product.html">DaVinci Code</Link>
                </h4>
                <ul className="prize d-flex">
                  <li>$40.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li>
                        <Link className="cart" to="cart.html">
                          <i className="bi bi-shopping-bag4"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="wishlist" to="wishlist.html">
                          <i className="bi bi-shopping-cart-full"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="compare" to="#">
                          <i className="bi bi-heart-beat"></i>
                        </Link>
                      </li>
                      <li>
                        <a
                          data-toggle="modal"
                          title="Quick View"
                          className="quickview modal-view detail-link"
                          href="#productmodal"
                        >
                          <i className="bi bi-search"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product__hover--content">
                  <ul className="rating d-flex">
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="product product__style--3">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html">
                  <img src={centralParkImg} alt="Central Park book" />
                </Link>
                <Link className="second__img animation1" to="single-product.html">
                  <img src="images/books/8.jpg" alt="product image" />
                </Link>
                <div className="hot__box">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4>
                  <Link to="single-product.html">Central Park</Link>
                </h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$50.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li>
                        <Link className="cart" to="cart.html">
                          <i className="bi bi-shopping-bag4"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="wishlist" to="wishlist.html">
                          <i className="bi bi-shopping-cart-full"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="compare" to="#">
                          <i className="bi bi-heart-beat"></i>
                        </Link>
                      </li>
                      <li>
                        <a
                          data-toggle="modal"
                          title="Quick View"
                          className="quickview modal-view detail-link"
                          href="#productmodal"
                        >
                          <i className="bi bi-search"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product__hover--content">
                  <ul className="rating d-flex">
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="product product__style--3">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html">
                  <img src={harryPotter2Img} alt="harry potter 2 book" />
                </Link>
                <Link className="second__img animation1" to="single-product.html">
                  <img src="images/books/10.jpg" alt="product image" />
                </Link>
                <div className="hot__box">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4>
                  <Link to="single-product.html">
                    Harry Potter and the Chamber of Secrets
                  </Link>
                </h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li>
                        <Link className="cart" to="cart.html">
                          <i className="bi bi-shopping-bag4"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="wishlist" to="wishlist.html">
                          <i className="bi bi-shopping-cart-full"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="compare" to="#">
                          <i className="bi bi-heart-beat"></i>
                        </Link>
                      </li>
                      <li>
                        <a
                          data-toggle="modal"
                          title="Quick View"
                          className="quickview modal-view detail-link"
                          href="#productmodal"
                        >
                          <i className="bi bi-search"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product__hover--content">
                  <ul className="rating d-flex">
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="product product__style--3">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html">
                  <img src={harryPotter3Img} alt="harry potter 3 book" />
                </Link>
                <Link className="second__img animation1" to="single-product.html">
                  <img src="images/books/2.jpg" alt="product image" />
                </Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALER</span>
                </div>
              </div>
              <div className="product__content content--center content--center">
                <h4>
                  <Link to="single-product.html">
                    Harry Potter and the Prisoner Of Azkaban
                  </Link>
                </h4>
                <ul className="prize d-flex">
                  <li>$50.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li>
                        <Link className="cart" to="cart.html">
                          <i className="bi bi-shopping-bag4"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="wishlist" to="wishlist.html">
                          <i className="bi bi-shopping-cart-full"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="compare" to="#">
                          <i className="bi bi-heart-beat"></i>
                        </Link>
                      </li>
                      <li>
                        <a
                          data-toggle="modal"
                          title="Quick View"
                          className="quickview modal-view detail-link"
                          href="#productmodal"
                        >
                          <i className="bi bi-search"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product__hover--content">
                  <ul className="rating d-flex">
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="on">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wn__recent__post bg--gray ptb--80">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section__title text-center">
							<h2 className="title__be--2">Book <span className="color--theme">Club</span></h2>
							<p>
              Best books to read for a great book club discussion. Suggest books that your group has read that led to a lively discussion, whether people loved or hated them.</p>
						</div>
					</div>
				</div>
				<div className="row mt--50">
					<div className="col-md-6 col-lg-4 col-sm-12">
						<div className="post__itam">
							<div className="content">
								<h3><Link to="blog-details.html">International activities of the Frankfurt Book </Link></h3>
								<p>We are proud to announce the very first the edition of the frankfurt news.We are
									proud to announce the very first of edition of the fault frankfurt news for us.</p>
								<div className="post__time">
									<span className="day">Dec 06, 18</span>
									<div className="post-meta">
										<ul>
											<li><Link to="#"><i className="bi bi-love"></i>72</Link></li>
											<li><Link to="#"><i className="bi bi-chat-bubble"></i>27</Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-lg-4 col-sm-12">
						<div className="post__itam">
							<div className="content">
								<h3><Link to="blog-details.html">Reading has a signficant info number of benefits</Link>
								</h3>
								<p>Find all the information you need to ensure your experience.Find all the information
									you need to ensure your experience . Find all the information you of.</p>
								<div className="post__time">
									<span className="day">Mar 08, 18</span>
									<div className="post-meta">
										<ul>
											<li><Link to="#"><i className="bi bi-love"></i>72</Link></li>
											<li><Link to="#"><i className="bi bi-chat-bubble"></i>27</Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-lg-4 col-sm-12">
						<div className="post__itam">
							<div className="content">
								<h3><Link to="blog-details.html">The London Book Fair is to be packed with exciting </Link>
								</h3>
								<p>The London Book Fair is the global area inon marketplace for rights negotiation.The
									year London Book Fair is the global area inon forg marketplace for rights.</p>
								<div className="post__time">
									<span className="day">Nov 11, 18</span>
									<div className="post-meta">
										<ul>
											<li><Link to="#"><i className="bi bi-love"></i>72</Link></li>
											<li><Link to="#"><i className="bi bi-chat-bubble"></i>27</Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	
		<section className="best-seel-area pt--80 pb--60">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section__title text-center pb--50">
							<h2 className="title__be--2">Best <span className="color--theme">Seller </span></h2>
							<p>There are many variations of passages of Lorem Ipsum available, but the majority have
								suffered lebmid alteration in some ledmid form</p>
						</div>
					</div>
				</div>
			</div>
			<div className="slider center">
				
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html">
            <img src={daVinciCodeImg} alt="davinci code book" />

              </Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" href="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
				
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html">
            <img src={perksImg} alt="perks book" />
             </Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" to="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
			
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html">
            <img src={harryPotter3Img} alt="harry potter 3 book" />
              </Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" to="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
			
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html">
            <img src={harryPotter1Img} alt="harry potter 1 book" />
							</Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" to="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
			
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html">

            <img src={oneDayImg} alt="one day book" />
            </Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" to="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
			
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html">
            <img src={perksImg} alt="perks book" /> 
            
            </Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" href="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
			
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html">
            <img src={divergentImg} alt="divergent book" /> 
							</Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" to="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
			
				<div className="product product__style--3">
					<div className="product__thumb">
						<Link className="first__img" to="single-product.html"><img src="images/best-sell-product/8.jpg"
								alt="product image"/></Link>
					</div>
					<div className="product__content content--center">
						<div className="action">
							<div className="actions_inner">
								<ul className="add_to_links">
									<li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
									<li><Link className="wishlist" to="wishlist.html"><i
												className="bi bi-shopping-cart-full"></i></Link></li>
									<li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
									<li><a data-toggle="modal" title="Quick View"
											className="quickview modal-view detail-link" to="#productmodal"><i
												className="bi bi-search"></i></a></li>
								</ul>
							</div>
						</div>
						<div className="product__hover--content">
							<ul className="rating d-flex">
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li className="on"><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
								<li><i className="fa fa-star-o"></i></li>
							</ul>
						</div>
					</div>
				</div>
		
			</div>
		</section>

    </div>
  );
}

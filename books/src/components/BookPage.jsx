import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "../firebase";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './book-page.scss';

export default function BookPage() {
  const [book, setBook] = useState(null);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [isDone, setIsDone] = useState(false);
  const {id} = useParams();


  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }


  const getBookData = () => {
    firebase
        .firestore()
        .collection("books")
        .where('id', '==', Number(id))
        .get()
        .then(snapshot => {
          const book = snapshot.docs.map(doc => {
            firebase.firestore()
            .collection('books')
            .doc(doc.id)
            .collection('images')
            .get()
            .then(snap => {
                const images = snap.docs.map(image => image.data());
  
                setImages(images && images[0] && images[0].list);
            });
            return doc.data()
          });

          setBook(book[0]);
        })
  };

  const addToWishList = () => {
    firebase
    .firestore()
    .collection("wishlist")
    .add({
      title: book.title,
      author: book.author,
      id: book.id
    })
    .then()
  };

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <Fragment>
   {book && <div className="book-page-container maincontent bg--white pt--80 pb--55">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 col-12">
          <div className="wn__single__product">
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="wn__fotorama__wrapper">
                  <div className="fotorama wn__fotorama__action" data-nav="thumbs">
                    {images && images.map((image, key) => {
                      return (
                        <Link key={key} to="1.jpg"><img src={`${process.env.REACT_APP_IMAGESFOLDER}/${image}`}/></Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="product__info__main">
                      <h1>{book.title}</h1>
                  <div className="product-reviews-summary d-flex">
                    <ul className="rating-summary d-flex">
                    <li><i className="zmdi zmdi-star-outline"></i></li>
                    <li><i className="zmdi zmdi-star-outline"></i></li>
                    <li><i className="zmdi zmdi-star-outline"></i></li>
                    <li className="off"><i className="zmdi zmdi-star-outline"></i></li>
                    <li className="off"><i className="zmdi zmdi-star-outline"></i></li>
                    </ul>
                  </div>
                  <div className="author-box">
                    <span>{book.author}</span>
                  </div>
              <div className="product__overview">
                    <p>{book.description}</p>
                   
                  </div>
                  <div className="box-tocart d-flex">
                   
                <div className="product-addto-links clearfix">
                  <Link className="wishlist" to="#" onClick={addToWishList}>
                  </Link>
                 
                </div>
                  </div>
              <div className="product_meta">
                <span className="posted_in">Categories: 
                  <Link to="#">Adventure</Link>
                  <Link  to="#">Kids' Music"</Link>
                </span>
              </div>

                </div>
              </div>
            </div>
          </div>
          <div className="product__info__detailed">
          <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Reviews
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <div className="description__attribute">
										<p>Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises
											superior warmth with every wear. Thick material blocks out the wind as
											ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather
											training or work outdoors, the Chaz Hoodie promises superior warmth with
											every wear. Thick material blocks out the wind as ribbed cuffs and bottom
											band seal in body heat.Ideal for cold-weather training or work outdoors, the
											Chaz Hoodie promises superior warmth with every wear. Thick material blocks
											out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for
											cold-weather training or work outdoors, the Chaz Hoodie promises superior
											warmth with every wear. Thick material blocks out the wind as ribbed cuffs
											and bottom band seal in body heat.</p>
										<ul>
											<li>• Two-tone gray heather hoodie.</li>
											<li>• Drawstring-adjustable hood. </li>
											<li>• Machine wash/dry.</li>
										</ul>
									</div>
        </TabPane>
        <TabPane tabId="2">
									<div className="review-fieldset">
								
										<div className="review-field-ratings">
											<div className="product-review-table">
												<div className="review-field-rating d-flex">
													<span>Your rating</span>
													<ul className="rating d-flex">
                          <li><i className="star fas fa-star text-warning"></i></li>
                          <li><i className="star fas fa-star text-warning"></i></li>
                          <li><i className="star fas fa-star text-warning"></i></li>
                          <li><i className="star fas fa-star text-warning"></i></li>
                          <li><i className="star fas fa-star text-warning"></i></li>
													</ul>
												</div>
											
											</div>
										</div>
										<div className="review_form_field">
											<div className="input__box">
												<span>Nickname</span>
												<input id="nickname_field" type="text" name="nickname"/>
											</div>
											<div className="input__box">
												<span>Summary</span>
												<input id="summery_field" type="text" name="summery"/>
											</div>
											<div className="input__box">
												<span>Review</span>
												<textarea name="review"></textarea>
											</div>
											<div className="review-form-actions">
												<button>Submit Review</button>
											</div>
										</div>
									</div>
        </TabPane>
      </TabContent>
          </div>
          
      <div className="wn__related__product pt--80 pb--50">
        <div className="section__title text-center">
          <h2 className="title__be--2">Related Products</h2>
        </div>
        <div className="row mt--60">
          <div className="productcategory__slide--2 arrows_style owl-carousel owl-theme">
           
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src={`${process.env.REACT_APP_IMAGESFOLDER}/${book.path}`}
 alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src={book.image} alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALLER</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">robin parrish</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
           
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/3.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/4.jpg" alt="product image"/></Link>
                <div className="hot__box color--2">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">The Remainng</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
           
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/7.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/8.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">Lando</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$50.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
            
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/9.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/10.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">Doctor Wldo</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
          
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/11.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/2.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALER</span>
                </div>
              </div>
              <div className="product__content content--center content--center">
                <h4><Link to="single-product.html">Animals Life</Link></h4>
                <ul className="prize d-flex">
                  <li>$50.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
            
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/1.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/6.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALER</span>
                </div>
              </div>
              <div className="product__content content--center content--center">
                <h4><Link to="single-product.html">Olio Madu</Link></h4>
                <ul className="prize d-flex">
                  <li>$50.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
        </div>
      </div>
      <div className="wn__related__product">
        <div className="section__title text-center">
          <h2 className="title__be--2">upsell products</h2>
        </div>
        <div className="row mt--60">
          <div className="productcategory__slide--2 arrows_style owl-carousel owl-theme">
            
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/1.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/2.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALLER</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">robin parrish</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
       
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/3.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/4.jpg" alt="product image"/></Link>
                <div className="hot__box color--2">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">The Remainng</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
       
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/7.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/8.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">Lando</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$50.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
         
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/9.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/10.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">HOT</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4><Link to="single-product.html">Doctor Wldo</Link></h4>
                <ul className="prize d-flex">
                  <li>$35.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
      
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/11.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/2.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALER</span>
                </div>
              </div>
              <div className="product__content content--center content--center">
                <h4><Link to="single-product.html">Animals Life</Link></h4>
                <ul className="prize d-flex">
                  <li>$50.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
     
            <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="product__thumb">
                <Link className="first__img" to="single-product.html"><img src="images/books/1.jpg" alt="product image"/></Link>
                <Link className="second__img animation1" to="single-product.html"><img src="images/books/6.jpg" alt="product image"/></Link>
                <div className="hot__box">
                  <span className="hot-label">BEST SALER</span>
                </div>
              </div>
              <div className="product__content content--center content--center">
                <h4><Link to="single-product.html">Olio Madu</Link></h4>
                <ul className="prize d-flex">
                  <li>$50.00</li>
                  <li className="old_prize">$35.00</li>
                </ul>
                <div className="action">
                  <div className="actions_inner">
                    <ul className="add_to_links">
                      <li><Link className="cart" to="cart.html"><i className="bi bi-shopping-bag4"></i></Link></li>
                      <li><Link className="wishlist" to="wishlist.html"><i className="bi bi-shopping-cart-full"></i></Link></li>
                      <li><Link className="compare" to="#"><i className="bi bi-heart-beat"></i></Link></li>
                      <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" to="#productmodal"><i className="bi bi-search"></i></a></li>
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
        </div>
      </div>
        </div>
        <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
          <div className="shop__sidebar">
            <aside className="wedget__categories poroduct--cat">
              <h3 className="wedget__title">Product Categories</h3>
              <ul>
                <li><Link to="#">Biography <span>(3)</span></Link></li>
                <li><Link to="#">Business <span>(4)</span></Link></li>
                <li><Link to="#">Cookbooks <span>(6)</span></Link></li>
                <li><Link to="#">Health & Fitness <span>(7)</span></Link></li>
                <li><Link to="#">History <span>(8)</span></Link></li>
                <li><Link to="#">Mystery <span>(9)</span></Link></li>
                <li><Link to="#">Inspiration <span>(13)</span></Link></li>
                <li><Link to="#">Romance <span>(20)</span></Link></li>
                <li><Link to="#">Fiction/Fantasy <span>(22)</span></Link></li>
                <li><Link to="#">Self-Improvement <span>(13)</span></Link></li>
                <li><Link to="#">Humor Books <span>(17)</span></Link></li>
                <li><Link to="#">Harry Potter <span>(20)</span></Link></li>
                <li><Link to="#">Land of Stories <span>(34)</span></Link></li>
                <li><Link to="#">Kids' Music <span>(60)</span></Link></li>
                <li><Link to="#">Toys & Games <span>(3)</span></Link></li>
                <li><Link to="#">hoodies <span>(3)</span></Link></li>
              </ul>
            </aside>
            <aside className="wedget__categories pro--range">
              <h3 className="wedget__title">Filter by price</h3>
              <div className="content-shopby">
                  <div className="price_filter s-filter clear">
                      <form action="#" method="GET">
                          <div id="slider-range"></div>
                          <div className="slider__range--output">
                              <div className="price__output--wrap">
                                  <div className="price--output">
                                      <span>Price :</span><input type="text" id="amount" readOnly=""/>
                                  </div>
                                  <div className="price--filter">
                                      <Link to="#">Filter</Link>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
            </aside>
            <aside className="wedget__categories poroduct--compare">
              <h3 className="wedget__title">Compare</h3>
              <ul>
                <li><Link to="#">x</Link><Link to="#">Condimentum posuere</Link></li>
                <li><Link to="#">x</Link><Link to="#">Condimentum posuere</Link></li>
                <li><Link to="#">x</Link><Link to="#">Dignissim venenatis</Link></li>
              </ul>
            </aside>
            <aside className="wedget__categories poroduct--tag">
              <h3 className="wedget__title">Product Tags</h3>
              <ul>
                <li><Link to="#">Biography</Link></li>
                <li><Link to="#">Business</Link></li>
                <li><Link to="#">Cookbooks</Link></li>
                <li><Link to="#">Health  Fitness</Link></li>
                <li><Link to="#">History</Link></li>
                <li><Link to="#">Mystery</Link></li>
                <li><Link to="#">Inspiration</Link></li>
                <li><Link to="#">Religion</Link></li>
                <li><Link to="#">Fiction</Link></li>
                <li><Link to="#">Fantasy</Link></li>
                <li><Link to="#">Music</Link></li>
                <li><Link to="#">Toys</Link></li>
                <li><Link to="#">Hoodies</Link></li>
              </ul>
            </aside>
            <aside className="wedget__categories sidebar--banner">
          <img src="images/others/banner_left.jpg" alt="banner images"/>
          <div className="text">
            <h2>new products</h2>
            <h6>save up to <br/> <strong>40%</strong>off </h6>
          </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </div>}
  </Fragment>
);
}

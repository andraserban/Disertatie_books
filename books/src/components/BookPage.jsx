import React, {Fragment, useContext, useEffect, useRef, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import firebase from "../firebase";
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import './book-page.scss';
import {toast, ToastContainer} from 'react-toastify';
import {AuthContext} from "../Auth";
import format from "date-fns/format";
import Slider from "react-slick";
import BookCategories from "./BookCategories";

const initialReview = {
    name: '',
    date: new firebase.firestore.Timestamp.now(),
    body: '',
    stars: '',
    book: ''
}

export default function BookPage() {
    const [book, setBook] = useState(null);
    const [activeTab, setActiveTab] = useState('2');
    const [images, setImages] = useState([]);
    const [review, setReview] = useState(initialReview);
    const [reviews, setReviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [canAddToFavorite, setCanAddToFavorite] = useState(true);
    const {id} = useParams();
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);

    const sliderSettings = {
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1,
        dots: true,
        infinite: true,
        adaptiveHeight: true
    };

    const STARS_RATINGS = [1, 2, 3, 4, 5];
    const starsHolder = useRef();

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const getReviewStars = (rating) => {
        const starPercentage = (rating / 5) * 100;
        const starWidth = `${(Math.round(starPercentage / 10) * 10)}%`;

        return (
            <div className="stars-outer">
                <div className="stars-inner" style={{width: starWidth}}/>
            </div>
        );
    };

    const getBookCategories = (bookCategories) => {
        firebase.firestore()
            .collection('categories')
            .where('id', 'in', bookCategories)
            .get()
            .then(snap => {
                const data = snap.docs.map(review => review.data());

                setCategories(data);
            });
    };

    const handleCategoryClick = (categoryId) => {
        history.push(`/books?category=${categoryId}`);
    };

    const resetReviewStars = () => {
        Array.from(starsHolder.current.children).forEach((listItem) => {
            Array.from(listItem.children).forEach(star => {
                star.classList.remove('text-warning');
                star.classList.add('text-gray');
            });
        });
    }

    const onReviewStarsInteract = (rating) => {
        Array.from(starsHolder.current.children).forEach((listItem) => {
            Array.from(listItem.children).forEach(star => {
                const currentRating = Number(star.getAttribute('data-star'));

                star.classList.remove('text-warning');
                star.classList.add('text-gray');

                if (currentRating <= rating) {
                    star.classList.remove('text-gray');
                    star.classList.add('text-warning');
                }
            })
        });

        setReview({
            ...review,
            stars: String(rating)
        })
    };

    const getReviewDate = (review) => {
        return format(new firebase.firestore.Timestamp(review.date.seconds, review.date.nanoseconds).toDate(), 'MMM dd, yyyy');
    }

    const onReviewPost = (event) => {
        event.preventDefault();

        setReview({
            ...review,
            book: book.uid,
            name: currentUser.username,
            ...(!review.stars && {
                stars: '1'
            })
        });

        const payload = {
            ...review,
            name: currentUser.username,
            book: book.uid,
            ...(!review.stars && {
                stars: '1'
            })
        };

        firebase.firestore()
            .collection("books")
            .doc(book.uid)
            .collection("reviews")
            .add(payload)
            .then(() => {
                const updatedReviews = [...reviews, payload];
                const ratings = updatedReviews.map(({stars}) => Number(stars));
                const ratingsSum = ratings.reduce((acc, current) => acc + current, 0);
                const updatedAverageRating = (ratingsSum / ratings.length).toFixed(2) || 0;

                firebase.firestore()
                    .collection("books")
                    .doc(book.uid)
                    .set({
                        rating: updatedAverageRating
                    }, {merge: true})
                    .then(() => {
                        setBook({...book, rating: updatedAverageRating});
                    })
                    .then(() => setReviews(updatedReviews));
            });

        resetReviewStars();
        setReview(initialReview);
    };

    const onReviewBodyTyping = (event) => {
        setReview({
            ...review,
            body: event.target.value
        })
    }

    const checkIfAddedToFavorites = () => {
        firebase
            .firestore()
            .collection("wishlist")
            .where('id', '==', Number(id))
            .get()
            .then(snap => {
                const data = snap.docs.map(doc => doc.data());

                setCanAddToFavorite(!data.length);
            })
    };

    const getReviewsData = (document) => {
        firebase.firestore()
            .collection('books')
            .doc(document.id)
            .collection('reviews')
            .orderBy('date', 'asc')
            .get()
            .then(snap => {
                const reviews = snap.docs.map(review => review.data());

                setReviews(reviews);
            });
    };

    const getBookData = () => {
        firebase
            .firestore()
            .collection("books")
            .where('id', '==', Number(id))
            .get()
            .then(snapshot => {
                const bookUid = snapshot.docs.map(doc => doc.id);
                const book = snapshot.docs.map(doc => {

                    getReviewsData(doc);

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

                getBookCategories(book[0].category || []);

                setBook({
                    ...book[0],
                    uid: bookUid[0]
                });
            })
    };

    const addToWishList = () => {
        if (canAddToFavorite) {
            firebase
                .firestore()
                .collection("wishlist")
                .add({
                    title: book.title,
                    author: book.author,
                    id: book.id
                })
                .then(() => setCanAddToFavorite(false))
                .then(() => {
                    toast.success('🚀 Added to wishlist!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } else {
            firebase
                .firestore()
                .collection("wishlist")
                .where('id', '==', Number(book.id))
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        firebase
                            .firestore()
                            .collection("wishlist")
                            .doc(doc.id)
                            .delete()
                            .then(() => setCanAddToFavorite(true))
                            .then(() => {
                                toast.error('😕 Removed from wishlist', {
                                    position: "bottom-center",
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            });
                    });
                });
        }
    };

    useEffect(() => {
        getBookData();
        checkIfAddedToFavorites();
    }, []);

    return (
        <Fragment>
            <div className="ht__bradcaump__area bg-image--4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bradcaump__inner text-center">
                                <h2 className="bradcaump-title">Book club</h2>
                                <nav className="bradcaump-content">
                                    <Link className="breadcrumb_item" to="/">Home</Link>
                                    <span className="brd-separetor">/</span>
                                    <span className="breadcrumb_item active">Book club</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {book && <div className="book-page-container maincontent bg--white pt--80 pb--55">
                <ToastContainer/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-12">
                            <div className="wn__single__product">
                                <div className="row">
                                    <div className="col-lg-6 col-12" style={{paddingRight: '25px'}}>
                                        <Slider {...sliderSettings} className="book-page-slider">
                                            {images && images.map((image, key) =>
                                                <img key={key} src={`${process.env.REACT_APP_IMAGESFOLDER}/${image}`}/>
                                            )}
                                        </Slider>

                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="product__info__main">
                                            <h1>{book.title}</h1>
                                            <div className="author-box">
                                                <span>{book.author}</span>
                                            </div>
                                            <div className="product-reviews-summary mt-3 d-flex"
                                                 title={`${book.rating} stars`}>
                                                {getReviewStars(book.rating)}
                                            </div>
                                            <div className="product__overview">
                                                <p>{book.description}</p>
                                            </div>
                                            <div className="box-tocart d-flex">

                                                <div className="product-addto-links clearfix">
                                                    <Link className={`wishlist ${canAddToFavorite ? '' : 'added'}`}
                                                          to="#"
                                                          onClick={addToWishList}
                                                          title={`${canAddToFavorite ? 'Add to favorites' : 'Already added'}`}
                                                    >
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="product_meta">
                                                <div className="posted_in d-flex">
                                                    <div className="mr-2 font-weight-bold">Categories:</div>
                                                    {categories && categories.map((category, key) => (
                                                        <Link to={`/books?category=${category.id}`}
                                                              className="ml-2" key={key}>{category.name}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__info__detailed">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: activeTab === '1'})}
                                            onClick={() => {
                                                toggle('1');
                                            }}
                                        >
                                            Details
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({active: activeTab === '2'})}
                                            onClick={() => {
                                                toggle('2');
                                            }}
                                        >
                                            Reviews
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <div className="description__attribute">
                                            <p>Ideal for cold-weather training or work outdoors, the Chaz Hoodie
                                                promises
                                                superior warmth with every wear. Thick material blocks out the wind as
                                                ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather
                                                training or work outdoors, the Chaz Hoodie promises superior warmth with
                                                every wear. Thick material blocks out the wind as ribbed cuffs and
                                                bottom
                                                band seal in body heat.Ideal for cold-weather training or work outdoors,
                                                the
                                                Chaz Hoodie promises superior warmth with every wear. Thick material
                                                blocks
                                                out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for
                                                cold-weather training or work outdoors, the Chaz Hoodie promises
                                                superior
                                                warmth with every wear. Thick material blocks out the wind as ribbed
                                                cuffs
                                                and bottom band seal in body heat.</p>
                                            <ul>
                                                <li>• Two-tone gray heather hoodie.</li>
                                                <li>• Drawstring-adjustable hood.</li>
                                                <li>• Machine wash/dry.</li>
                                            </ul>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <div className="review-fieldset">
                                            <div className="blog-details">
                                                <div className="comments_area">
                                                    <ul className="comment__list">
                                                        {reviews && reviews.map((review, key) =>
                                                            <li key={key}>
                                                                <div className="wn__comment">
                                                                    <div className="content">
                                                                        <div
                                                                            className="comnt__author d-flex justify-content-between">
                                                                            <div><h6
                                                                                style={{fontWeight: 400}}>{review.name}</h6>
                                                                            </div>
                                                                            <div>
                                                                                {getReviewStars(Number(review.stars))}
                                                                                <span
                                                                                    className="ml-3">{getReviewDate(review)}</span>
                                                                            </div>
                                                                        </div>
                                                                        <p className="mt-2">{review.body}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className="comment_respond">
                                                    <h3 className="reply_title">Leave a Review</h3>
                                                    <form className="comment__form" onSubmit={onReviewPost}>
                                                        <div className="input__box">
                                                        <textarea name="comment"
                                                                  placeholder="Your review here..."
                                                                  onChange={onReviewBodyTyping}
                                                                  value={review.body}
                                                        />
                                                        </div>
                                                        <div className="review-field-ratings">
                                                            <div className="product-review-table">
                                                                <div className="review-field-rating d-flex">
                                                                    <span>Your rating</span>
                                                                    <ul className="rating d-flex" ref={starsHolder}>
                                                                        {STARS_RATINGS.map((rating, index) =>
                                                                            (
                                                                                <li key={index}><i
                                                                                    className="star fas fa-star text-gray"
                                                                                    data-star={index + 1}
                                                                                    onClick={() => onReviewStarsInteract(rating, index)}/>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="submite__btn">
                                                            <button type="submit">Post review</button>
                                                        </div>
                                                    </form>
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
                                                <Link className="first__img" to="single-product.html"><img
                                                    src={`${process.env.REACT_APP_IMAGESFOLDER}/${book.path}`}
                                                    alt="product image"/></Link>
                                                <Link className="second__img animation1" to="single-product.html"><img
                                                    src={book.image} alt="product image"/></Link>
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
                                                            <li><Link className="cart" to="cart.html"><i
                                                                className="bi bi-shopping-bag4"></i></Link></li>
                                                            <li><Link className="wishlist" to="wishlist.html"><i
                                                                className="bi bi-shopping-cart-full"></i></Link></li>
                                                            <li><Link className="compare" to="#"><i
                                                                className="bi bi-heart-beat"></i></Link></li>
                                                            <li><a data-toggle="modal" title="Quick View"
                                                                   className="quickview modal-view detail-link"
                                                                   to="#productmodal"><i
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

                                        <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="product__thumb">
                                                <Link className="first__img" to="single-product.html"><img
                                                    src="images/books/3.jpg" alt="product image"/></Link>
                                                <Link className="second__img animation1" to="single-product.html"><img
                                                    src="images/books/4.jpg" alt="product image"/></Link>
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
                                                            <li><Link className="cart" to="cart.html"><i
                                                                className="bi bi-shopping-bag4"></i></Link></li>
                                                            <li><Link className="wishlist" to="wishlist.html"><i
                                                                className="bi bi-shopping-cart-full"></i></Link></li>
                                                            <li><Link className="compare" to="#"><i
                                                                className="bi bi-heart-beat"></i></Link></li>
                                                            <li><a data-toggle="modal" title="Quick View"
                                                                   className="quickview modal-view detail-link"
                                                                   to="#productmodal"><i
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

                                        <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="product__thumb">
                                                <Link className="first__img" to="single-product.html"><img
                                                    src="images/books/7.jpg" alt="product image"/></Link>
                                                <Link className="second__img animation1" to="single-product.html"><img
                                                    src="images/books/8.jpg" alt="product image"/></Link>
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
                                                            <li><Link className="cart" to="cart.html"><i
                                                                className="bi bi-shopping-bag4"></i></Link></li>
                                                            <li><Link className="wishlist" to="wishlist.html"><i
                                                                className="bi bi-shopping-cart-full"></i></Link></li>
                                                            <li><Link className="compare" to="#"><i
                                                                className="bi bi-heart-beat"></i></Link></li>
                                                            <li><a data-toggle="modal" title="Quick View"
                                                                   className="quickview modal-view detail-link"
                                                                   to="#productmodal"><i
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

                                        <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="product__thumb">
                                                <Link className="first__img" to="single-product.html"><img
                                                    src="images/books/9.jpg" alt="product image"/></Link>
                                                <Link className="second__img animation1" to="single-product.html"><img
                                                    src="images/books/10.jpg" alt="product image"/></Link>
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
                                                            <li><Link className="cart" to="cart.html"><i
                                                                className="bi bi-shopping-bag4"></i></Link></li>
                                                            <li><Link className="wishlist" to="wishlist.html"><i
                                                                className="bi bi-shopping-cart-full"></i></Link></li>
                                                            <li><Link className="compare" to="#"><i
                                                                className="bi bi-heart-beat"></i></Link></li>
                                                            <li><a data-toggle="modal" title="Quick View"
                                                                   className="quickview modal-view detail-link"
                                                                   to="#productmodal"><i
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

                                        <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="product__thumb">
                                                <Link className="first__img" to="single-product.html"><img
                                                    src="images/books/11.jpg" alt="product image"/></Link>
                                                <Link className="second__img animation1" to="single-product.html"><img
                                                    src="images/books/2.jpg" alt="product image"/></Link>
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
                                                            <li><Link className="cart" to="cart.html"><i
                                                                className="bi bi-shopping-bag4"></i></Link></li>
                                                            <li><Link className="wishlist" to="wishlist.html"><i
                                                                className="bi bi-shopping-cart-full"></i></Link></li>
                                                            <li><Link className="compare" to="#"><i
                                                                className="bi bi-heart-beat"></i></Link></li>
                                                            <li><a data-toggle="modal" title="Quick View"
                                                                   className="quickview modal-view detail-link"
                                                                   to="#productmodal"><i
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

                                        <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="product__thumb">
                                                <Link className="first__img" to="single-product.html"><img
                                                    src="images/books/1.jpg" alt="product image"/></Link>
                                                <Link className="second__img animation1" to="single-product.html"><img
                                                    src="images/books/6.jpg" alt="product image"/></Link>
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
                                                            <li><Link className="cart" to="cart.html"><i
                                                                className="bi bi-shopping-bag4"></i></Link></li>
                                                            <li><Link className="wishlist" to="wishlist.html"><i
                                                                className="bi bi-shopping-cart-full"></i></Link></li>
                                                            <li><Link className="compare" to="#"><i
                                                                className="bi bi-heart-beat"></i></Link></li>
                                                            <li><a data-toggle="modal" title="Quick View"
                                                                   className="quickview modal-view detail-link"
                                                                   to="#productmodal"><i
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
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
                            <div className="shop__sidebar">
                                <BookCategories onCategoryClick={handleCategoryClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Fragment>
    );
}

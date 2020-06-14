import React, {useState, useEffect} from "react";
import firebase from "../../firebase";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import format from "date-fns/format";
import parse from "html-react-parser";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [mostReviews, setMostReviews] = useState([]);
    const [bestRated, setBestRated] = useState([]);
    const sliderSettings = {
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 5,
        dots: true,
        infinite: true,
        variableWidth: true
    };

    const getBookClubArticles = () => {
        firebase
            .firestore()
            .collection("club")
            .orderBy('date', 'desc')
            .limit(3)
            .get()
            .then(async snapshot => {
                const articles = await Promise.all(snapshot.docs.map(async doc => {
                    const commentsResponse = await firebase
                        .firestore()
                        .collection("club")
                        .doc(doc.id)
                        .collection("comments")
                        .get();

                    const comments = commentsResponse.docs.map((document => document.data()))

                    return {
                        ...doc.data(),
                        uid: doc.id,
                        comments: comments.length
                    };
                }));

                setArticles(articles);
            });
    };

    const getMostReviewed = () => {
        firebase
            .firestore()
            .collection("books")
            .get()
            .then(async snapshot => {
                const mostReviewed = await Promise.all(snapshot.docs.map(async doc => {
                    const reviewsResponse = await firebase
                        .firestore()
                        .collection("books")
                        .doc(doc.id)
                        .collection("reviews")
                        .get();

                    const reviews = reviewsResponse.docs.map((document => document.data()))

                    return {
                        ...doc.data(),
                        uid: doc.id,
                        reviews: reviews.length
                    };
                }));
                const topMostReviewed = mostReviewed.sort((a, b) => b.reviews - a.reviews).slice(0, 4);

                setMostReviews(topMostReviewed);
            });

    }

    const getBestRated = () => {
        firebase
            .firestore()
            .collection("books")
            .orderBy('rating', 'desc')
            .limit(8)
            .get()
            .then(snapshot => {
                const data = snapshot.docs.map(doc => doc.data());

                setBestRated(data);
            });
    }

    const getFirstParagraph = (content) => {
        const filteredEmptyParagraphs = content.replace('<p>&nbsp;</p>', '');
        const frag = document.createRange().createContextualFragment(filteredEmptyParagraphs);
        const paragraph = frag.querySelector('p');

        return parse(String(paragraph.innerHTML));
    };

    const getFormattedDate = (date) => {
        return format(new firebase.firestore.Timestamp(date.seconds, date.nanoseconds).toDate(), 'MMM dd, yyyy');
    };

    const getReviewStars = (rating) => {
        const starPercentage = (rating / 5) * 100;
        const starWidth = `${(Math.round(starPercentage / 10) * 10)}%`;

        return (
            <div className="stars-outer">
                <div className="stars-inner" style={{width: starWidth}}/>
            </div>
        );
    };

    useEffect(() => {
        getBookClubArticles();
        getMostReviewed();
        getBestRated();
    }, []);

    return (
        <div>
            <div className="ht__bradcaump__area bg-image--6 home-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bradcaump__inner text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="wn__product__area brown--color pt--80  pb--30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section__title text-center">
                                <h2 className="title__be--2">
                                    Most <span className="color--theme">reviews</span>
                                </h2>
                                <p>
                                    There are many variations of passages of Lorem Ipsum
                                    available, but the majority have suffered lebmid alteration in
                                    some ledmid form
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="furniture--4 border--round mt--50 d-flex">
                        {mostReviews && mostReviews.map((rated, key) =>
                            <div className="product product__style--3" key={key}
                                 style={{width: '270px', marginRight: '30px'}}>
                            <div className="product__thumb">
                                <Link className="first__img" to={`/book/${rated.id}`}>
                                    <img src={`${process.env.REACT_APP_IMAGESFOLDER}/${rated.path}`}
                                         alt="most rated book cover"/>
                                </Link>
                            </div>
                            <div className="product__content content--center">
                                <h4>
                                    <Link to={`/book/${rated.id}`}>
                                        {rated.title}
                                    </Link>
                                </h4>
                                <div className="action">
                                    <div className="actions_inner">
                                        <ul className="add_to_links">
                                            <li>
                                                <Link
                                                    title="Quick View"
                                                    className="quickview modal-view detail-link"
                                                    to={`/book/${rated.id}`}
                                                >
                                                    <i className="bi bi-search"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="product__hover--content">
                                    <ul className="rating d-flex">
                                        {getReviewStars(rated.rating)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="wn__newsletter__area bg-image--2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
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
                                    Best books to read for a great book club discussion. Suggest books that your group
                                    has read that led to a lively discussion, whether people loved or hated them.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--50">
                        {articles && articles.map((article, key) =>
                            <div className="col-md-6 col-lg-4 col-sm-12" key={key}>
                                <div className="post__itam">
                                    <div className="content">
                                        <h3><Link to={`/club/${article.uid}`}>{article.title}</Link></h3>
                                        {getFirstParagraph(article.content)}
                                        <div className="post__time">
                                            <span className="day">{getFormattedDate(article.date)}</span>
                                            <div className="post-meta">
                                                <ul>
                                                    <li>
                                                        <Link to={`/club/${article.uid}`}>
                                                            <i className="bi bi-chat-bubble"/>
                                                            {article.comments}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="best-seel-area" style={{padding: '80px 50px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section__title text-center pb--50">
                                <h2 className="title__be--2">Best <span className="color--theme">rated </span></h2>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered lebmid alteration in some ledmid form</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider center">

                    <Slider {...sliderSettings}>

                        {bestRated && bestRated.map((rated, key) =>
                            <div className="product product__style--3" key={key}>
                            <div className="product__thumb">
                                <Link className="first__img" to={`/book/${rated.id}`}>
                                    <img src={`${process.env.REACT_APP_IMAGESFOLDER}/${rated.path}`}
                                         alt="best rated cover"/>
                                </Link>
                            </div>
                            <div className="product__content content--center">
                                <div className="product__hover--content">
                                    <ul className="rating d-flex">
                                        {getReviewStars(rated.rating)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        )}

                    </Slider>


                </div>
            </section>

        </div>
    );
}

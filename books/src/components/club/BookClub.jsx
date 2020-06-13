import React, {useEffect, useState} from "react";
import firebase from "../../firebase";
import {Link} from "react-router-dom";
import BookClubSidebar from "./BookClubSidebar";
import format from "date-fns/format";
import parse from 'html-react-parser';

export default function BookClub() {
    const [articles, setArticles] = useState([]);

    const getArticles = () => {
        firebase
            .firestore()
            .collection("club")
            .orderBy('date', 'asc')
            .get()
            .then(snapshot => {
                const articles = snapshot.docs.map(doc => ({...doc.data(), uid: doc.id}));

                setArticles(articles);
            });
    };

    const getFormattedDate = (data) => {
        return format(new firebase.firestore.Timestamp(data.seconds, data.nanoseconds).toDate(), 'MMM dd, yyyy');
    };

    const getFirstParagraph = (content) => {
        const filteredEmptyParagraphs = content.replace('<p>&nbsp;</p>', '');
        const frag = document.createRange().createContextualFragment(filteredEmptyParagraphs);
        const paragraph = frag.querySelector('p');

        return parse(String(paragraph.innerHTML));
    };

    useEffect(getArticles, []);

    return (
        <div>
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
            <div className="page-blog bg--white section-padding--lg blog-sidebar right-sidebar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-12">
                            <div className="blog-page">
                                <div className="page__header">
                                    <h2>Book Club articles</h2>
                                </div>
                                {articles && articles.map((article, key) => (
                                    <article className="blog__post d-flex flex-wrap" key={key}>
                                        <div className="thumb">
                                            <Link to={`/club/${article.uid}`}>
                                                <img src={article.banner} alt="blog images"/>
                                            </Link>
                                        </div>
                                        <div className="content">
                                            <h4><Link to={`/club/${article.uid}`}>{article.title}</Link></h4>
                                            <ul className="post__meta">
                                                <li>Article by : <a href="#">{article.author}</a></li>
                                                <li className="post_separator">/</li>
                                                <li>{getFormattedDate(article.date)}</li>
                                            </ul>
                                            <p className="line-clamp"
                                               style={{
                                                   maxWidth: '390px',
                                                   maxHeight: '100px'
                                               }}>
                                                {getFirstParagraph(article.content)}
                                            </p>
                                            <div className="blog__btn">
                                                <Link to={`/club/${article.uid}`}>Read more...</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                        <BookClubSidebar/>
                    </div>
                </div>
            </div>
        </div>
    );
}

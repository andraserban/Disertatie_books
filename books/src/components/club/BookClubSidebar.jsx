import React, {useContext, useEffect, useState} from "react";
import firebase from "../../firebase";
import {Link} from "react-router-dom";
import format from "date-fns/format";
import { useRouteMatch } from "react-router-dom";
import {ClubContext} from "../../ClubProvider";
import {getCommentsAction} from "../../ClubReducer";


export default function BookClubSidebar() {
    const match = useRouteMatch();
    const [articles, setArticles] = useState([]);
    const {comments, commentsDispatch} = useContext(ClubContext)

    const getFormattedDate = (date) => {
        return format(new firebase.firestore.Timestamp(date.seconds, date.nanoseconds).toDate(), 'MMM dd, yyyy');
    };

    const getRecentArticles = () => {
        firebase
            .firestore()
            .collection("club")
            .orderBy('date', 'desc')
            .limit(6)
            .get()
            .then(snapshot => {
                const articles = snapshot.docs.map(doc => ({...doc.data(), uid: doc.id}));

                setArticles(articles);
            });
    };

    useEffect(() => {
        commentsDispatch(getCommentsAction());
        getRecentArticles();
    }, [])

    return (
        <div className="col-lg-3 col-12 md-mt-40 sm-mt-40">
            <div className="wn__sidebar">
                <aside className="widget recent_widget">
                    <h3 className="widget-title">Recent</h3>
                    <div className="recent-posts">
                        <ul>
                            {articles && articles.map((article, key) => (
                                <li key={key}>
                                    <div className="post-wrapper d-flex">
                                        <div className="thumb">
                                            <Link to={`${match.url}/${article.uid}`}>
                                                <img src={article.banner} alt="blog images"/>
                                            </Link>
                                        </div>
                                        <div className="content">
                                            <h4><Link to={`/club/${article.uid}`}>{article.title}</Link></h4>
                                            <p>{getFormattedDate(article.date)}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
                <aside className="widget comment_widget">
                    <h3 className="widget-title">Comments</h3>
                    <ul>
                        {comments && comments.map((comment, key) => (
                            <li key={key}>
                            <div className="post-wrapper">
                                <div className="thumb">
                                    <i className="fas fa-comments"/>
                                </div>
                                <div className="content">
                                    <p>{comment.name} says:</p>
                                    <Link to={`/club/${comment.article}`}>
                                        <p className="line-clamp mt-2" style={{width: '200px', fontSize: '13px'}}>
                                            {comment.body}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
}

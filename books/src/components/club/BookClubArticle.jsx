import React, {useContext, useEffect, useState} from "react";
import firebase from "../../firebase";
import {AuthContext} from "../../Auth";
import {Link, withRouter} from "react-router-dom";
import BookClubSidebar from "./BookClubSidebar";
import parse from 'html-react-parser';
import format from "date-fns/format";
import {ClubContext, ClubProvider} from "../../ClubProvider";
import {addCommentAction} from "../../ClubReducer";

const BookClubArticle = ({match}) => {
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const {_, commentsDispatch} = useContext(ClubContext);
    const {currentUser} = useContext(AuthContext);

    const initialComment = {
        name: currentUser.username || '',
        date: new firebase.firestore.Timestamp.now(),
        body: '',
        article: match.params.uid
    }

    const [newComment, setNewComment] = useState(initialComment);

    const getFormattedDate = (date) => {
        if (date) {
            return format(new firebase.firestore.Timestamp(date.seconds, date.nanoseconds).toDate(), 'MMM dd, yyyy');
        }

        return '';
    };

    const onCommentPost = (event) => {
        event.preventDefault();

        firebase.firestore()
            .collection("club")
            .doc(match.params.uid)
            .collection("comments")
            .add(newComment)
            .then(() => setComments([...comments, newComment]))
            .then(() => commentsDispatch(addCommentAction((newComment))))
            .then(() => setNewComment(initialComment));
    };

    const onCommentBodyTyping = (event) => {
        setNewComment({
            ...newComment,
            body: event.target.value
        })
    };

    const getArticle = () => {
        firebase
            .firestore()
            .collection("club")
            .doc(match.params.uid)
            .get()
            .then(snapshot => setArticle({...snapshot.data(), uid: snapshot.id}));
    };

    const getComments = () => {
        firebase
            .firestore()
            .collection("club")
            .doc(match.params.uid)
            .collection("comments")
            .orderBy('date', 'asc')
            .get()
            .then(snapshot => setComments(snapshot.docs.map(doc => doc.data())));
    };

    useEffect(() => {
        getArticle();
        getComments()
    }, [match.params.uid])

    return (
        <div>
            <div className="ht__bradcaump__area bg-image--6">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bradcaump__inner text-center">
                                <nav className="bradcaump-content">
                                    <Link className="breadcrumb_item" to="/">Home</Link>
                                    <span className="brd-separetor">/</span>
                                    <Link className="breadcrumb_item" to="/club">Club</Link>
                                    <span className="brd-separetor">/</span>
                                    {article && <span className="breadcrumb_item active">{article.title}</span>}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {article &&
                <div className="page-blog-details section-padding--lg bg--white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-12">
                            <div className="blog-details content">
                                <article className="blog-post-details">
                                    <div className="post-thumbnail">
                                        <img src={article.banner} alt="blog images"/>
                                    </div>
                                    <div className="post_wrapper">
                                        <div className="post_header">
                                            <h2>{article.title}</h2>
                                            <div className="blog-date-categori">
                                                <ul>
                                                    <li>{getFormattedDate(article.date)}</li>
                                                    <li><Link to="#" title="Posts by boighor"
                                                              rel="author">{article.author}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="post_content">
                                            {parse(article.content)}
                                        </div>
                                        {!!comments.length && <ul className="blog_meta">
                                            <li><a
                                                href="#">{`${comments.length} comment${comments.length > 1 ? 's' : ''}`}</a>
                                            </li>
                                        </ul>
                                        }
                                    </div>
                                </article>
                                <div className="blog-details">
                                    <div className="comments_area">
                                        <ul className="comment__list">
                                            {comments && comments.map((comment, key) =>
                                                <li key={key}>
                                                    <div className="wn__comment">
                                                        <div className="content">
                                                            <div className="comnt__author d-flex justify-content-between">
                                                                <div><h6 style={{fontWeight: 400}}>{comment.name}</h6></div>
                                                                <div>
                                                                    <span className="ml-3">{getFormattedDate(comment.date)}</span>
                                                                </div>
                                                            </div>
                                                            <p className="mt-2">{comment.body}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="comment_respond mt-5">
                                        <h3 className="reply_title">Enjoyed it? Share your thoughts.</h3>
                                        <form className="comment__form" onSubmit={onCommentPost}>
                                            <div className="input__box">
                                                        <textarea name="comment"
                                                                  placeholder="Your comment..."
                                                                  onChange={onCommentBodyTyping}
                                                                  value={newComment.body}
                                                        />
                                            </div>
                                            <div className="submite__btn">
                                                <button type="submit">Post comment</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <BookClubSidebar/>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default withRouter(BookClubArticle);

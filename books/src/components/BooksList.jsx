import React, {useState} from "react";
import {useEffect} from "react";
import firebase from "../firebase";
import BookListCard from "./BookListCard";
import BookCategories from "./BookCategories";
import TextField from "@material-ui/core/TextField";
import {Link, useHistory, useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function BooksList() {
    const [books, setBooks] = useState([]);
    const [lastVisibleBook, setLastVisibleBook] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [search, setSearch] = useState("");
    const history = useHistory();
    const queryString = useQuery();
    const categoryQueryString = queryString.get('category');

    const getBooks = async () => {
        let query = firebase
            .firestore()
            .collection("books")
            .orderBy("title", "asc")
            .limit(6);

        if (categoryQueryString) {
           query = query.where('category', 'array-contains', Number(categoryQueryString));
        }

        const snapshot = await query.get();
        const allBooks = snapshot.docs.map(doc => doc.data());
        const lastVisible = allBooks[allBooks.length - 1] ? allBooks[allBooks.length - 1].title : null;

        setBooks(allBooks);
        setLastVisibleBook(lastVisible);
        setIsDone(allBooks.length < 6);
    };

    const handleCategoryClick = (categoryId) => {
        history.replace(`/books?category=${categoryId}`);

        firebase.firestore()
            .collection('books')
            .where('category', 'array-contains', Number(categoryId))
            .get()
            .then((snap) => {
                const books = snap.docs.map(doc => doc.data());

                setBooks(books);
                setIsDone(true);
            })
    };

    const getMoreBooks = async () => {
        let query =  firebase
            .firestore()
            .collection("books")
            .orderBy("title", "asc")
            .startAfter(lastVisibleBook)
            .limit(6);

        if (categoryQueryString) {
            query = query.where('category', 'array-contains', Number(categoryQueryString));
        }

        const snapshot = await query.get();
        const newBooks = snapshot.docs.map(doc => doc.data());
        const lastVisible = newBooks[newBooks.length - 1] ? newBooks[newBooks.length - 1].title : null;

        setLastVisibleBook(lastVisible);
        setBooks([...books, ...newBooks]);
        setIsDone(newBooks.length < 6);
    };

    const addDatabaseField = () => {
        firebase
            .firestore()
            .collection("books")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    firebase
                        .firestore()
                        .collection("books")
                        .doc(doc.id)
                        .set(
                            {
                                search: ["", `${doc.data().title.toLowerCase()}`].concat(
                                    doc
                                        .data()
                                        .title.toLowerCase()
                                        .split(" ")
                                )
                            },
                            {
                                merge: true
                            }
                        )
                        .then();
                });
            });
    };

    const onSearchTyping = event => {
        setSearch(event.target.value);
    };

    const onSearchSubmit = event => {
        if (event.key === "Enter") {
            searchBooks();
        }
    };

    const searchBooks = () => {
        firebase
            .firestore()
            .collection("books")
            .where("search", "array-contains", search.toLowerCase())
            .orderBy("title", "asc")
            .get()
            .then(snapshot => {
                const searchedBooks = snapshot.docs.map(doc => doc.data());

                setBooks(searchedBooks);
                setIsDone(true);
            });
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div>
            <div className="ht__bradcaump__area bg-image--5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bradcaump__inner text-center">
                                <nav className="bradcaump-content">
                                    <Link className="breadcrumb_item" to="/">Home</Link>
                                    <span className="brd-separetor">/</span>
                                    <span className="breadcrumb_item active">Library</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-shop-sidebar left--sidebar bg--white section-padding--lg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
                            <div className="shop__sidebar">
                                <BookCategories onCategoryClick={handleCategoryClick}/>
                            </div>
                        </div>
                        <div className="col-lg-9 col-12 order-1 order-lg-2">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div
                                        className="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
                                        <div>
                                            <TextField
                                                label="Search"
                                                onChange={onSearchTyping}
                                                onKeyPress={onSearchSubmit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab__container">
                                <div
                                    className="shop-grid tab-pane fade show active"
                                    id="nav-grid"
                                    role="tabpanel"
                                >
                                    <div className="row">
                                        {books.map((book, key) => {
                                            return <BookListCard key={key} book={book}/>;
                                        })}
                                    </div>

                                    {!isDone && (
                                        <div>
                                            <button className="books-button d-flex" style={{margin: '0 auto'}}
                                                    onClick={getMoreBooks}>
                                                Show more
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

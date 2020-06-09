import React, { useState } from "react";
import { useEffect } from "react";
import firebase from "../firebase";
import BookListCard from "./BookListCard";
import BookCategories from "./BookCategories";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "reactstrap";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [lastVisibleBook, setLastVisibleBook] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const getBooks = () => {
    firebase
      .firestore()
      .collection("books")
      .orderBy("title", "asc")
      .limit(6)
      .get()
      .then(snapshot => {
        const allBooks = snapshot.docs.map(doc => doc.data());
        const lastVisible = allBooks[allBooks.length - 1]
          ? allBooks[allBooks.length - 1].title
          : null;

        setBooks(allBooks);
        setLastVisibleBook(lastVisible);
        setIsDone(allBooks.length < 6);
      });
  };

  const getAllBooks = () => {
    firebase
      .firestore()
      .collection("books")
      .get()
      .then(snapshot => {
        snapshot.docs.map(async doc => {
          const currentCategories = await firebase
            .firestore()
            .collection("books")
            .doc(doc.id)
            .collection("categories")
            .get()
            .then(snap => snap.docs.map(category => category.data().name));

          setCategories(categories.concat(currentCategories));

          return doc.data();
        });
      });
  };

  const getCategories = () => {
    firebase
      .firestore()
      .collection("categories")
      .get()
      .then(snapshot => {
        const categories = snapshot.docs.map(doc => doc.data());
        setCategories(categories);
        console.log(categories);
      });
  };

  const getMoreBooks = () => {
    firebase
      .firestore()
      .collection("books")
      .orderBy("title", "asc")
      .startAfter(lastVisibleBook)
      .limit(6)
      .get()
      .then(snapshot => {
        const newBooks = snapshot.docs.map(doc => doc.data());
        const lastVisible = newBooks[newBooks.length - 1]
          ? newBooks[newBooks.length - 1].title
          : null;

        setLastVisibleBook(lastVisible);
        setBooks([...books, ...newBooks]);
        setIsDone(newBooks.length < 6);
      });
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
    getCategories();
    getBooks();
    (async function asyncFn() {
      await getAllBooks();
    })();
  }, []);

  return (
    <div className="page-shop-sidebar left--sidebar bg--white section-padding--lg">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
            <div className="shop__sidebar">
              <BookCategories />

              <aside className="wedget__categories poroduct__tag">
                <h3 className="wedget__title">Product Tags</h3>
                <ul>
                  <li>
                    <Link to="#">Biography</Link>
                  </li>
                  <li>
                    <Link to="#">Business</Link>
                  </li>
                  <li>
                    <Link to="#">Cookbooks</Link>
                  </li>
                  <li>
                    <Link to="#">Health Fitness</Link>
                  </li>
                  <li>
                    <Link to="#">History</Link>
                  </li>
                  <li>
                    <Link to="#">Mystery</Link>
                  </li>
                  <li>
                    <Link to="#">Inspiration</Link>
                  </li>
                  <li>
                    <Link to="#">Religion</Link>
                  </li>
                  <li>
                    <Link to="#">Fiction</Link>
                  </li>
                  <li>
                    <Link to="#">Fantasy</Link>
                  </li>
                  <li>
                    <Link to="#">Music</Link>
                  </li>
                  <li>
                    <Link to="#">Toys</Link>
                  </li>
                  <li>
                    <Link to="#">Hoodies</Link>
                  </li>
                </ul>
              </aside>
              <aside className="wedget__categories sidebar--banner">
                <img src="images/others/banner_left.jpg" alt="banner images" />
                <div className="text">
                  <h2>new products</h2>
                  <h6>
                    save up to <br /> <strong>40%</strong>off
                  </h6>
                </div>
              </aside>
            </div>
          </div>
          <div className="col-lg-9 col-12 order-1 order-lg-2">
            <div className="row">
              <div className="col-lg-12">
                <div className="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
                  <div>
                    <TextField
                      label="Search"
                      onChange={onSearchTyping}
                      onKeyPress={onSearchSubmit}
                    />
                  </div>
                  <div>
                    <FormControl style={{ minWidth: 250 }}>
                      <InputLabel id="book-list-sort-by">Sort by</InputLabel>
                      <Select labelId="book-list-sort-by">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
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
                    return <BookListCard key={key} book={book} />;
                  })}
                </div>

                {!isDone && (
                  <div>
                    <Button color="secondary" onClick={getMoreBooks}>
                      SHOW MORE
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

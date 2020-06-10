import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import firebase from "../firebase";

export default function WishList() {
  const [books, setBooks] = useState([]);

  const getBooksFromWishlist = () => {
    firebase
      .firestore()
      .collection("wishlist")
      .get()
      .then(snapshot => {
        const allBooksFromWishlist = snapshot.docs.map(doc => doc.data());

        setBooks(allBooksFromWishlist);
      });
  };
  const deleteItemFromWishlist = bookId => {
    firebase
      .firestore()
      .collection("wishlist")
      .where("id", "==", Number(bookId))
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          firebase
            .firestore()
            .collection("wishlist")
            .doc(doc.id)
            .delete()
            .then(() => {
              const remainingBooks = books.filter(item => item.id !== bookId);

              setBooks(remainingBooks);
            });
        });
      });
  };

  useEffect(() => {
    getBooksFromWishlist();
  }, []);

  return (
    <div className="wishlist-area section-padding--lg bg__white">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="wishlist-content">
              <form action="#">
                <div className="wishlist-table wnro__table table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="product-remove"></th>
                        <th className="product-thumbnail"></th>
                        <th className="product-name">
                          <span className="nobr">Book Name</span>
                        </th>
                        <th className="product-price">
                          <span className="nobr"> Author </span>
                        </th>

                        <th className="product-add-to-cart"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {books &&
                        books.map((book, key) => {
                          return (
                            <tr key={key}>
                              <td
                                className="product-remove"
                                onClick={() => deleteItemFromWishlist(book.id)}
                              >
                                <Link to="#" style={{padding: 0}}>×</Link>
                              </td>
                              <td className="product-thumbnail">
                                <Link to="#">
                                  <img src="images/product/sm-3/1.jpg" alt="" />
                                </Link>
                              </td>
                              <td className="product-name">
                                <Link to="#">{book.title}</Link>
                              </td>
                              <td className="product-price">
                                <span className="amount">{book.author}</span>
                              </td>
                              <td className="product-add-to-cart">
                                <Link to="#"> Add to Community</Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

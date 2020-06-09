import React from "react";
import { Link } from "react-router-dom";

export default function BookListCard({ book }) {
  return (
    <div className="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
      <div className="product__thumb">
        <Link className="img1" to={`book/${book.id}`}>
          <img
            src={`${process.env.REACT_APP_IMAGESFOLDER}/${book.path}`}
            alt="product image"
          />
        </Link>

        <div className="hot__box">
          <span className="hot-label">{book.tag}</span>
        </div>
      </div>
      <div className="product__content content--center">
        <h4>
          <Link to={`book/${book.id}`}>{book.title}</Link>
        </h4>

        <div className="action">
          <div className="actions_inner">
            <ul className="add_to_links">
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
  );
}

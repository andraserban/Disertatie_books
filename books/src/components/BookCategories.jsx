import React from "react";
import { Link } from "react-router-dom";

export default function BookCategories({ categories }) {
  return (
    <aside className="wedget__categories poroduct--cat">
      <h3 className="wedget__title">Product Categories</h3>
      <ul>
        {categories &&
          categories.map(category => (
            <li>
              <Link className to="#">
                {category}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function BookCategories({ categories, onCategoryClick }) {
  return (
    <aside className="wedget__categories poroduct--cat">
      <h3 className="wedget__title">Product Categories</h3>
      <ul>
        {categories &&
          categories.map((category, key) => (
            <li className="d-flex justify-content-between align-items-center cursor-pointer" key={key}>
              <span style={{fontSize: '14px', color: '#333'}} onClick={() => onCategoryClick(category.id)}>
                {category.name}
              </span>
                <span className="mt-2" style={{fontSize: '14px', color: '#333'}}>
                    ({category.books.length})
                </span>
            </li>
          ))}
      </ul>
    </aside>
  );
}

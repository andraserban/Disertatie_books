import React, {useEffect, useState} from "react";
import firebase from "../firebase";

export default function BookCategories({onCategoryClick}) {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        firebase
            .firestore()
            .collection("categories")
            .get()
            .then(snapshot => {
                const categories = snapshot.docs.map(doc => doc.data());
                setCategories(categories);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <aside className="wedget__categories poroduct--cat">
            <h3 className="wedget__title">Our Categories</h3>
            <ul>
                {categories &&
                categories.map((category, key) => (
                    <li className="d-flex justify-content-between align-items-center cursor-pointer" key={key}>
              <span
                  style={{fontSize: '14px', color: '#333'}}
                  onClick={() => onCategoryClick(category.id)}
              >
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

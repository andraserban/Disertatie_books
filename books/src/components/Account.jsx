import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";

export default function Account() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  //test git

  const register = async (event) => {
    event.preventDefault();

    const {
      emailRegister,
      nameRegister,
      passwordRegister,
    } = event.target.elements;

    try {
      const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          emailRegister.value,
          passwordRegister.value
        );

      await firebase.firestore().collection("users").doc(data.user.uid).set({
        email: emailRegister.value,
        name: nameRegister.value,
      });

      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <section className="my_account_area pt--80 pb--55 bg--white">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="my__account__wrapper">
              <h3 className="account__title">Login</h3>
              <form onSubmit={login}>
                <div className="account__form">
                  <div className="input__box">
                    <label>
                      Email address <span>*</span>
                    </label>
                    <input type="text" name="email" />
                  </div>
                  <div className="input__box">
                    <label>
                      Password<span>*</span>
                    </label>
                    <input type="password" name="password" />
                  </div>
                  <div className="form__btn">
                    <button type="submit">Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="my__account__wrapper">
              <h3 className="account__title">Register</h3>
              <form onSubmit={register}>
                <div className="account__form">
                  <div className="input__box">
                    <label>
                      Display name <span>*</span>
                    </label>
                    <input type="text" name="nameRegister" />
                  </div>
                  <div className="input__box">
                    <label>
                      Email address <span>*</span>
                    </label>
                    <input type="email" name="emailRegister" />
                  </div>
                  <div className="input__box">
                    <label>
                      Password<span>*</span>
                    </label>
                    <input type="password" name="passwordRegister" />
                  </div>
                  <div className="form__btn">
                    <button type="submit">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

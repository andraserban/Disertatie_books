import React, {useContext, useReducer} from "react";
import {Redirect, useHistory} from "react-router-dom";
import firebase from "../firebase";
import {AuthContext} from "../Auth";
import {updateUserAction} from "../AuthReducer";

export default function Account() {
  const history = useHistory();
  const { currentUser, dispatch } = useContext(AuthContext);

  const register = async (event) => {
    event.preventDefault();

    const {
      emailRegister,
      nameRegister,
      passwordRegister,
    } = event.target.elements;

    try {

      const data = {
        username: nameRegister.value,
        email: emailRegister.value
      };

      const registerData = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          emailRegister.value,
          passwordRegister.value
        );

      await firebase.firestore().collection("users").doc(registerData.user.uid).set({...data});
      dispatch(updateUserAction({...data, uid: registerData.user.uid}));
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

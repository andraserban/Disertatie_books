import React, {useContext, useEffect, useState} from "react";
import firebase from "../firebase";
import {AuthContext} from "../Auth";
import {updateUserAction} from "../AuthReducer";
import {toast, ToastContainer} from 'react-toastify';

const initialPayload = {
    username: '',
    email: ''
}

export default function Profile() {
    const [payload, setPayload] = useState(initialPayload);
    const [password, setPassword] = useState('');
    const {currentUser, dispatch} = useContext(AuthContext);

    const updatePayload = (event) => {
        event.persist();

        setPayload({
            ...payload,
            [event.target.name]: event.target.value
        })
    }

    const onProfileUpdate = (event) => {
        event.preventDefault();

        if (currentUser.username !== payload.username) {
            firebase.auth().currentUser.updateProfile({
                displayName: payload.username
            })
                .then(() => {
                    firebase
                        .firestore()
                        .collection('users')
                        .doc(currentUser.uid)
                        .set({
                            username: payload.username
                        }, {merge: true})
                        .then(() => dispatch(updateUserAction(payload)))
                        .then(() => {
                            toast.success('Profile updated successfully!', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        })
                })
                .catch(err => alert(err.message));
        }

        if (currentUser.email !== payload.email) {
            firebase.auth().currentUser.updateEmail(payload.email)
                .then(() => {
                    firebase
                        .firestore()
                        .collection('users')
                        .doc(currentUser.uid)
                        .set({
                            email: payload.email
                        }, {merge: true})
                        .then(() => dispatch(updateUserAction(payload)))
                        .then(() => {
                            toast.success('Profile updated successfully!', {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        });
                })
                .catch(err => alert(err.message));
        }
    };

    const onPasswordSubmit = (event) => {
        event.preventDefault();

        firebase.auth().currentUser.updatePassword(password)
            .then(() => {
                toast.success('Password updated successfully!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => alert(err.message));

        event.target.reset();
    };

    useEffect(() => setPayload(currentUser), [currentUser]);

    return (
        <section className="my_account_area pt--80 pb--55 bg--white">
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="my__account__wrapper">
                            <form onSubmit={onProfileUpdate}>
                                <div className="account__form">
                                    <div className="input__box">
                                        <label>
                                            Username<span></span>
                                        </label>
                                        <input type="text"
                                               value={payload.username}
                                               onChange={updatePayload}
                                               name="username"
                                        />
                                    </div>
                                    <div className="input__box">
                                        <label>
                                            E-mail<span></span>
                                        </label>
                                        <input type="text" value={payload.email} onChange={updatePayload} name="email"/>
                                    </div>
                                    <div className="form__btn">
                                        <button type="submit">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="my__account__wrapper">
                            <form onSubmit={onPasswordSubmit}>
                                <div className="account__form">
                                    <div className="input__box">
                                        <label>
                                            Change password
                                        </label>
                                        <input type="password" onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </div>
                                    <div className="form__btn">
                                        <button type="submit">Change</button>
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

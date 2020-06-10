import React, {useEffect, useReducer, useState} from "react";
import firebase from "./firebase.js";
import {AuthReducer, updateUserAction} from "./AuthReducer";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, dispatch] = useReducer(AuthReducer, null);
    const [pending, setPending] = useState(true);

    const isNewUser = () => {
        if (!firebase.auth().currentUser) {
            return false;
        }

        return firebase.auth().currentUser.metadata.creationTime === firebase.auth().currentUser.metadata.lastSignInTime;
    }

    const logUser = () => {
        firebase.auth().onAuthStateChanged(async (user) => {
            let data = null;

            if (user) {
                const response = await firebase.firestore().collection('users').doc(user.uid).get();
                data = {...response.data(), uid: user.uid};
            }
            if (!isNewUser()) {
                dispatch(updateUserAction(data));
            }
            setPending(false);
        });
    }

    useEffect(() => {
        (async function asyncFn() {
            await logUser();
        })();
    }, []);

    if (pending) {
        return <>Loading...</>;
    }

    return (
        <AuthContext.Provider value={{currentUser, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

import React, {useReducer} from "react";
import {ClubReducer} from "./ClubReducer";

export const ClubContext = React.createContext();

export const ClubProvider = ({children}) => {
    const [comments, commentsDispatch] = useReducer(ClubReducer, []);

    return (
        <ClubContext.Provider value={{comments, commentsDispatch}}>
            {children}
        </ClubContext.Provider>
    );
}


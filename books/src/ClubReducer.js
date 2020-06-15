import firebase from "./firebase";

export function addCommentAction(data) {
    return {type: 'ADD_COMMENT', data};
}

export function getCommentsAction(dispatch) {
    firebase
        .firestore()
        .collectionGroup("comments")
        .orderBy('date', 'desc')
        .limit(6)
        .get()
        .then(snap => {
            const response = snap.docs.map(doc => doc.data());

            dispatch({type: 'GET_COMMENTS', data: response});
        });
}

export const ClubReducer = (state, {type, data}) => {
    switch (type) {
        case 'GET_COMMENTS':
            return data;

        case 'ADD_COMMENT':
            if (state.length >= 6) {
                return [data, ...state].slice(0, -1);
            } else {
                return [data, ...state]
            }

        default:
            return state;
    }
};

import firebase from "./firebase";

export function addCommentAction(data) {
    return {type: 'ADD_COMMENT', data};
}

export async function getCommentsAction() {
    const response = await firebase
        .firestore()
        .collectionGroup("comments")
        .orderBy('date', 'desc')
        .limit(6)
        .get()
        .then(snap => snap.docs.map(doc => doc.data()));

    return {type: 'GET_COMMENTS', data: response};
}

export const ClubReducer = (state, {type, data}) => {
    console.log('reducer?', data);
    switch (type) {
        case 'GET_COMMENTS':
            return data;

        case 'ADD_COMMENT':
            return [data, ...state];

        default:
            return state;
    }
};

export function updateUserAction(data) {
    return {type: 'UPDATE_USER', data};
}

export const AuthReducer = (state, {type, data}) => {
    switch (type) {
        case 'UPDATE_USER':
            return data;

        default:
            return state;
    }
};

import { AnyAction } from 'redux';

const initialState = {
    users: [],
    usersLoadingStatus: 'idle'
}

const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'USERS_FETCHING':
            return {
                ...state,
                usersLoadingStatus: 'loading'
            }
        case 'USERS_FETCHED':
            return {
                ...state,
                users: action.payload,
                usersLoadingStatus: 'idle'
            }
        case 'USERS_FETCHING_ERROR':
            return {
                ...state,
                usersLoadingStatus: 'error'
            }
        default: return state
    }
}

export default reducer;
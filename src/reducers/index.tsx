import { AnyAction } from 'redux';

const initialState = {
    users: [],
    usersLoadingStatus: 'idle',
    filters: [{name: ''}]
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
        case 'FILTERS_UPDATED':
            return {
                ...state,
                filters: action.payload
            }
        default: return state
    }
}

export default reducer;
import { AnyAction } from 'redux';

const initialState = {
    users: [],
    usersLoadingStatus: 'idle',
    filters: {name: '', username: '', email: '', phone: ''},
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
            const filterName = Object.keys(action.payload)[0],
            filterValue = action.payload[filterName];
            
            return {
                ...state,
                filters: {...state.filters, [filterName]: filterValue}
            }
        default: return state
    }
}

export default reducer;
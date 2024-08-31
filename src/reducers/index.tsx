const initialState = {
    users: [],
    usersLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action: any) => {
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
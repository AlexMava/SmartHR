export const usersFetching = () => {
    return {
        type: 'USERS_FETCHING'
    }
}

export const usersFetched = (users: any) => {
    return {
        type: 'USERS_FETCHED',
        payload: users
    }
}

export const usersFetchingError = () => {
    return {
        type: 'USERS_FETCHING_ERROR'
    }
}
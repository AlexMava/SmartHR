import {User} from '../user';

export const usersFetching = () => {
    return {
        type: 'USERS_FETCHING'
    }
}

export const usersFetched = (users: User[]) => {
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
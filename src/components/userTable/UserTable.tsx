import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import {usersFetching, usersFetched, usersFetchingError} from '../../actions';
import SearchFilter from "../searchFilter/SearchFilter";
import {User} from '../../user';
import './UserTable.css';

interface IState {
    users: User[];
    usersLoadingStatus: string,
    filters: any
}

const UserTable = () => {
    const {users, usersLoadingStatus, filters} = useSelector((state: IState) => state);
   
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(usersFetching());
        request("https://jsonplaceholder.typicode.com/users/")
            .then(data => dispatch(usersFetched(data)))
            .catch(() => dispatch(usersFetchingError()))
        // eslint-disable-next-line
    }, []);


    function filterUsers(users: User[], filters: any) {
        return users.filter((item: any) => Object.entries(filters).every(([key, value]: any) => item[key].toLowerCase().includes(value.toLowerCase())))
    }

    const renderUsersList = (arr: User[]) => {
        if (arr.length === 0) return <tr className="table-status-field"><td colSpan={4}><h5 className="">No users found!</h5></td></tr>

        return arr.map((item: User) => {
            const {id, name, username, email, phone} = item;
            return  (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                </tr>
            )
        })
    }
    
    let elements = renderUsersList(filterUsers(users, filters));
    const filtersArray = Object.keys(filters);

    const renderFilters = (arr: string[]) => {
        if (arr.length > 0) {
            return arr.map((item: string) => {
                return(
                    <th key={item}>
                        <SearchFilter filter={item} />
                    </th>  
                ) 
            })
        }
    }

    const renderTitles = (arr: string[]) => {
        if (arr.length > 0) return arr.map((item: string) => <th key={item}>{item}</th>)
    }

    if (usersLoadingStatus === "loading") {
        return <h5 className="">Loading...</h5>
    } else if (usersLoadingStatus === "error") {
        return <h5 className="">Something went wrong, please try again later!</h5>
    }

    return (
        <section className="users-box">
            <div className="container">
                <div className="row">
                    <table>
                        <thead>
                            <tr>{renderFilters(filtersArray)}</tr>
                            <tr>{renderTitles(filtersArray)}</tr>
                        </thead>

                        <tbody>{elements}</tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default UserTable;
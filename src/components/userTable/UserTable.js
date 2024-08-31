import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { usersFetching, usersFetched, usersFetchingError } from '../../actions';

import './UserTable.css';

const UserTable = () => {
    const {users, usersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(usersFetching());
        request("https://jsonplaceholder.typicode.com/users/")
            .then(data => dispatch(usersFetched(data)))
            .catch(() => dispatch(usersFetchingError()))
        // eslint-disable-next-line
    }, []);

    if (usersLoadingStatus === "loading") {
        return <h5 className="">Loading...</h5>
    } else if (usersLoadingStatus === "error") {
        return <h5 className="">Something went wrong, please try again later!</h5>
    }

    const renderUsersList = (arr) => {

        if (arr.length === 0) {
            return (
                <tr className="">
                    <td>No users found!</td>
                </tr>
            )
        }

        return arr.map((item) => {
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

    const elements = renderUsersList(users);

    return (
        <section className="users-box">
            <div className="container">
                <div className="row">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th> 
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>

                        <tbody>
                            {elements}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default UserTable;
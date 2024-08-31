import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

import {useHttp} from '../../hooks/http.hook';
import { usersFetching, usersFetched, usersFetchingError } from '../../actions';

import './UserTable.css';

const UserTable = () => {
    const {users, usersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        dispatch(usersFetching());
        request("https://jsonplaceholder.typicode.com/users/")
            .then(data => dispatch(usersFetched(data)))
            .catch(() => dispatch(usersFetchingError()))

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);


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

    function handleInputChange(e) {
        const searchString = e.target.value;

        const filteredItems = users.filter((item) =>
            item.name.toLowerCase().includes(searchString.toLowerCase())
        );

        setFilteredUsers(filteredItems);
    } 
    
    let elements = renderUsersList(filteredUsers);

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
                            <tr>
                                <th>
                                    <p>
                                        <label htmlFor="name">Seach by name</label>
                                    </p>

                                    <p>
                                        <input onChange={handleInputChange} type="text" id="name" name="name" />
                                    </p>
                                </th>
                                <th></th> 
                                <th></th>
                                <th></th>
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
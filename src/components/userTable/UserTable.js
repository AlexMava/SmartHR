import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

import {useHttp} from '../../hooks/http.hook';
import { usersFetching, usersFetched, usersFetchingError } from '../../actions';

import SearchFilter from "../searchFilter/SearchFilter";

import './UserTable.css';

const UserTable = () => {
    const {users, usersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [filteredUsers, setFilteredUsers] = useState(users);
    const [activeFilter, setActiveFilter] = useState({name: 'name', value: ''});

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

    useEffect(() => {
        const filterName = activeFilter.name,
            filterValue = activeFilter.value;

        if (users.length > 0) { 
            const filteredItems = users.filter((item) => {

                return item[filterName].toLowerCase().includes(filterValue.toLowerCase())
            });
    
            setFilteredUsers(filteredItems);
        }
    }, [activeFilter]);


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


    const onFilterUpdate = (e) => {
        const searchString = e.target.value,
        filterName = e.target.id;

        setActiveFilter({name: filterName, value: searchString});

        const searchInputs = document.querySelectorAll("input");

        searchInputs.forEach((input) => {
            if (input !== e.target) {
                input.value = '';
            }
        });
    };
    
    let elements = renderUsersList(filteredUsers);

    const filtersArray = ['name', 'username', 'email', 'phone'];

    const renderFilters = (arr) => {
        if (arr.length > 0) {
            return arr.map((item) => {
                return(
                    <th key={item}>
                        <SearchFilter filter={{name: item}} onFilterUpdate={(e) => onFilterUpdate(e)} />
                    </th>  
                ) 
            })
        }
    }

    const allFilters = renderFilters(filtersArray);

    const renderTitles = (arr) => {
        if (arr.length > 0) {
            return arr.map((item) => {
                return <th key={item}>{item}</th>
            })
        }
    }

    const allTitles = renderTitles(filtersArray);

    return (
        <section className="users-box">
            <div className="container">
                <div className="row">
                    <table>
                        <thead>
                            <tr>
                                {allFilters}
                            </tr>

                            <tr>
                                {allTitles}
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
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import {usersFetching, usersFetched, usersFetchingError, filtersUpdated} from '../../actions';
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

    const filterName = Object.keys(filters[0])[0],
        filterValue = filters[0][filterName];
    
    const dispatch = useDispatch();
    const {request} = useHttp();

    const filteredUsersList = useMemo(() => {
        return users.filter((user: any) => user[filterName].toLowerCase().includes(filterValue.toLowerCase()));
      }, [users, filterValue]);

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

    const renderUsersList = (arr: User[]) => {
        if (arr.length === 0) {
            return (
                <tr className="">
                    <td>No users found!</td>
                </tr>
            )
        }

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

    const onFilterUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = e.target.value,
        filterName = e.target.id;

        dispatch(filtersUpdated([{[filterName]: searchString}]));

        const searchInputs = document.querySelectorAll("input");
        searchInputs.forEach((input) => {
            if (input !== e.target) {
                input.value = '';
            }
        });
    };
    
    let elements = renderUsersList(filteredUsersList);

    const filtersArray = ['name', 'username', 'email', 'phone'];

    const renderFilters = (arr: string[]) => {
        if (arr.length > 0) {
            return arr.map((item: string) => {
                return(
                    <th key={item}>
                        <SearchFilter filter={item} onFilterUpdate={(e: React.ChangeEvent<HTMLInputElement>) => onFilterUpdate(e)} />
                    </th>  
                ) 
            })
        }
    }

    const allFilters = renderFilters(filtersArray);

    const renderTitles = (arr: string[]) => {
        if (arr.length > 0) {
            return arr.map((item: string) => {
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
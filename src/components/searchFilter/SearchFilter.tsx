import { useDispatch, useSelector } from 'react-redux';
import { filtersUpdated } from '../../actions';
type FilterdProps = {
    filter: string
};

const SearchFilter = ({filter}: FilterdProps) => {
    const filters = useSelector((state: any) => state.filters);

    const dispatch = useDispatch();
    const onFilterUpdate = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(filtersUpdated({[e.target.id]: e.target.value}));

    return (
        <>
            <p><label htmlFor="name">Seach by {filter}</label></p>

            <p>
                <input value={filters[filter]} onChange={(e) => onFilterUpdate(e)} type="text" id={filter} />
            </p>
        </>
    )
}

export default SearchFilter;
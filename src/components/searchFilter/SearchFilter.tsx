type FilterdProps = {
    filter: string;
    onFilterUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchFilter = ({filter, onFilterUpdate}: FilterdProps) => {
    return (
        <>
            <p>
                <label htmlFor="name">Seach by {filter}</label>
            </p>

            <p>
                <input onChange={(e) => onFilterUpdate(e)} type="text" id={filter} />
            </p>
        </>
    )
}

export default SearchFilter;
const SearchFilter = ({filter, onFilterUpdate}) => {
    return (
        <>
            <p>
                <label htmlFor="name">Seach by {filter.name}</label>
            </p>

            <p>
                <input onChange={(e) => onFilterUpdate(e)} type="text" id={filter.name} />
            </p>
        </>
    )
}

export default SearchFilter;
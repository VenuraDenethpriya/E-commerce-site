
function SortBy(props) {

    const handleSortSelect = (e) => {
        props.handleSortSelect(e);
    }

    return ( 
        <select name="sortBy" id="sortBy" onChange={handleSortSelect}>
            <option value="">Sort by price:</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>

     );
}

export default SortBy;
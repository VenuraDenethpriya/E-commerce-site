
function SortBy(props) {
  const handleSortChange = (event) => {
    props.handleSortChange(event);
  }
  return (
    <div className="flex">
      <div>
        <select className="rounded-full bg-[#edeef1] p-1" onChange={handleSortChange}>
          <option value="0">Sort by:</option>
          <option value="ascending">Ascending</option>
          <option value="dscending">Descending</option>
        </select>
      </div>
    </div>
  );
}


export default SortBy;
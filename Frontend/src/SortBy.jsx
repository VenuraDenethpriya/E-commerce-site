
function SortBy(props) {
  const handleSortChange = (event) => {
    props.handleSortChange(event);
  }
  return (
    <div className="flex">
      <div>
        <select className="rounded-lg bg-[#edeef1]" onChange={handleSortChange}>
          <option value="">Sort by:</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
    </div>
  );
}


export default SortBy;
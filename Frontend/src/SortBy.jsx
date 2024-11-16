
function SortBy(props) {
  const handleChange = (event) => {
    props.handleChange(event);
  };
  return (
    <div className="flex">
      <div className="flex">
        <p>Sort by price:</p>
      </div>
      <div>
        <select className="rounded-lg bg-[#edeef1]" onChange={handleChange}>
          <option value="0">Select order</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default SortBy;

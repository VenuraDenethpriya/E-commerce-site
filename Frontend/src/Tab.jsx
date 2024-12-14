function Tab(props) {
    const handleClick = (e) => {
        props.onTabClick(props._id);
    };
  
    if(props._id === props.selectedCategoryId) {
        return (
            <button 
                className="border border-[#edeef1] px-2 py-1 rounded-md bg-[#edeef1]"
                
            >
                {props.name}
            </button>
        )
    }
    return ( 
        <button 
            className="border border-[#edeef1] px-2 py-1 rounded-md hover:bg-[#f3f5f7]"
            onClick={handleClick}
        >
            {props.name}
        </button>
     );
}

export default Tab;
import { Button } from "@/components/ui/button";
function SortBy(props) {
    const handleChange = (event) =>{
        props.handleChange(event)
    }
    if(props.sort === "Ascending"){
        return(
            <div className="flex">
                <div className="flex mt-2">
                    <p>Sort by price:</p>
                </div>
                <div className="flex">
                    <Button variant="ghost" className="bg-[#edeef1]" onClick={handleChange} value="Ascending">Ascending</Button>
                    <Button variant="ghost" onClick={handleChange} value="Descending">Descending</Button>
                </div>
                
            </div>
        )    
    }
    else if(props.sort === "Descending"){
        return(
            <div className="flex">
                <div className="flex mt-2">
                    <p>Sort by price:</p>
                </div>
                <div className="flex">
                    <Button variant="ghost" onClick={handleChange} value="Ascending">Ascending</Button>
                    <Button variant="ghost" className="bg-[#edeef1]" onClick={handleChange} value="Descending">Descending</Button>
                </div>
                
            </div>
        )  
    }
    else{
        return(
            <div className="flex">
                <div className="flex mt-2">
                    <p>Sort by price:</p>
                </div>
                <div className="flex">
                    <Button variant="ghost" onClick={handleChange} value="Ascending">Ascending</Button>
                    <Button variant="ghost" onClick={handleChange} value="Descending">Descending</Button>
                </div>
                
            </div>
        ) 
    }       
}

export default SortBy;
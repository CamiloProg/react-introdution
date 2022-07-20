import React from "react";



function TodoSearch({searchValue, setSearchValue,filter}){

    const onSearchValueChange= (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
        filter(event.target.value);
    }

    return(
        <div className="search">
            <input 
            className="TodoSearch" 
            placeholder="Search your tasks"
            value={searchValue}
            onChange={onSearchValueChange}  
        />
        </div>
    )
}

export {TodoSearch}
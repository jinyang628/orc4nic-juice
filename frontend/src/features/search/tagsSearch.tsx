import React from 'react'

function TagsSearch() {
    const tagsList = ['Bitter Gourd', 'Recipe', 'Orange', 'Apple'];
    return (
        <input 
            className="filterTags formInput"
            type="text" 
            placeholder="Filter Posts"
        />
    )
}

export default TagsSearch;

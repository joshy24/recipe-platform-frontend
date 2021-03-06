

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const SearchInput = ({searchClicked, onSearchChanged, closeSearchClicked}) => {

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
              event.preventDefault();
      
              searchClicked();
            }
        };
      
        document.addEventListener('keydown', keyDownHandler);
    })

    return <div className="ptSearchInput">
        <input type="text" name="searchTerm" onChange={onSearchChanged} placeholder="Enter a search term" /> 
        <button onClick={searchClicked} style={{margin: "0px"}}><FontAwesomeIcon icon={faSearch} /></button>
        <button onClick={closeSearchClicked}><FontAwesomeIcon  icon={faXmark} /></button>
    </div>
}

export default SearchInput;
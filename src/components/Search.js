import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = ({ searchChange, searchInput, setSearchResult, searchByEnter }) => {
    return (
        <div className="row justify-content-center mb-5">
            <div className="input-group col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <input type="text" className="form-control search-input" onChange={searchChange} value={searchInput} placeholder="Search Keyword" aria-label="Waste lookup search keyword" />
            </div>

            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                <div tabIndex="0" className="search-button" onClick={setSearchResult} onKeyPress={searchByEnter}>
                    <FontAwesomeIcon icon="search" className="fa-flip-horizontal" />
                </div>
            </div>
        </div>
    );
}

export default Search;
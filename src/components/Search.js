import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = () => (
    <div className="row justify-content-center">
        <div className="input-group col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <input type="text" className="form-control search-input" placeholder="Search Keyword" aria-label="Waste lookup search keyword" />
        </div>
        {/* col for search input */}

        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <div className="search-button">
                <FontAwesomeIcon icon="search" className="fa-flip-horizontal"/>
            </div>
            {/* .search-button */}
        </div>
        {/* col for search button */}
    </div>
);

export default Search;
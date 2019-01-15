import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './components/Header';
import WasteList from './components/WasteList';

library.add(faSearch)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    }

    this.searchChange = this.searchChange.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
  }

  /**
   * Onchange function triggered by search input value change
   * and update the state
   * @param {*} e 
   */
  searchChange(e) {
    const value = e.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        searchInput: value
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <Header />

          {/* Search Section */}
          <div className="row justify-content-center">
            <div className="input-group col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
              <input type="text" className="form-control search-input" onChange={this.searchChange} value={this.state.searchInput} placeholder="Search Keyword" aria-label="Waste lookup search keyword" />
            </div>
            {/* col for search input */}

            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
              <div className="search-button" onClick={this.searchKeyword}>
                <FontAwesomeIcon icon="search" className="fa-flip-horizontal" />
              </div>
              {/* .search-button */}
            </div>
            {/* col for search button */}
          </div>
          {/* End of Search Section */}

          <WasteList />
        </div>
      </div>
    );
  }
}

export default App;

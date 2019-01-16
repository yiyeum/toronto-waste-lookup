import React, { Component } from 'react';
import Axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './components/Header';
import WasteList from './components/WasteList';
const LOOKUP_API_URL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000/';

library.add(faSearch)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookupData: [],
      searchInput: "",
      searchResult: []
    }

    this.searchChange = this.searchChange.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.setSearchResult = this.setSearchResult.bind(this);
  }

  async componentWillMount() {
    try {
      const resp = await Axios.get(LOOKUP_API_URL);
      const data = resp.data;
      this.setState((prevState) => {
        return {
          ...prevState,
          lookupData: data
        }
      });
    } catch (err) {
      console.log("Get Lookup data failed");
    }
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

  /**
   * Search keyword from the lookup data and return the filtered array
   */
  searchKeyword() {
    const query = this.state.searchInput.split(' ');
    return (query.map(q => {
      return this.state.lookupData.filter(data => data.keywords.includes(q));
    }));
  }

  setSearchResult() {
    let filteredData = [];
    filteredData = this.searchKeyword();

    this.setState((prevState) => {
      return {
        ...prevState,
        searchResult: filteredData
      }
    });
  }

  render() {
    console.log(this.state, " this is the state");
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
              <div className="search-button" onClick={this.setSearchResult}>
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

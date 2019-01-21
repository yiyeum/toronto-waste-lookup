import React, { Component } from 'react';
import Axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import WasteList from './components/WasteList';
import Header from './components/Header';
import Search from './components/Search';
const LOOKUP_API_URL = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000/';

library.add(faSearch, faStar)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookupData: [],
      searchInput: "",
      searchResult: [],
      favList: [],
      resultMessage: ""
    }

    this.searchChange = this.searchChange.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.setSearchResult = this.setSearchResult.bind(this);
    this.addToFavList = this.addToFavList.bind(this);
    this.removeFromFavList = this.removeFromFavList.bind(this);
    this.searchByEnter = this.searchByEnter.bind(this);
    this.setResultMessage = this.setResultMessage.bind(this);
  }

  /**
   * Get the lookup data using Axios and store in the state
   * when the component mounts
   */
  async componentDidMount() {
    window.addEventListener('keypress', this.searchByEnter);

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
      console.log("Get Lookup data failed", err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchInput !== this.state.searchInput && this.state.searchInput.length === 0) {
      this.setState({ searchResult: [], resultMessage: '' });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.searchByEnter);
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
    if (this.state.searchInput.length > 0) {
      const query = this.state.searchInput.toLowerCase().split(' ');
      const result = [];

      query.forEach(q => result.push(...this.state.lookupData.filter(data => data.keywords.includes(q))));

      return result;
    } else {
      return [];
    }
  }

  /**
   * Set the search result in the state
   */
  setSearchResult() {
    this.setState({ searchResult: this.searchKeyword() }, this.setResultMessage);
  }

  /**
   * Add the selected list to the favourites
   * @param {*} selectedList 
   */
  addToFavList(selectedList) {
    let newList = [];
    if (!(this.state.favList.includes(selectedList))) {
      newList = [...this.state.favList, selectedList];
    } else {
      newList = [...this.state.favList];
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        favList: newList
      }
    });
  }

  /**
   * Remove the selected list from the favourites
   * @param {*} selectedList 
   */
  removeFromFavList(selectedList) {
    let newList = this.state.favList.filter(list => list !== selectedList);

    this.setState((prevState) => {
      return {
        ...prevState,
        favList: newList
      }
    });
  }

  /**
   * Search button triggered by enter key
   * @param {*} e 
   */
  searchByEnter(e) {
    if (e.charCode === 13) {
      this.setSearchResult();
    }
  }

  /**
   * Set result message with the number of result 
   */
  setResultMessage() {
    if (this.state.searchResult.length > 1) {
      this.setState({ resultMessage: `${this.state.searchResult.length} results found` })
    } else {
      this.setState({ resultMessage: `${this.state.searchResult.length} result found` })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <Header />
          <Search
            searchChange={this.searchChange}
            searchInput={this.state.searchInput}
            setSearchResult={this.setSearchResult}
            searchByEnter={this.searchByEnter}
          />

          <div className="waste-list-wrapper">
            <WasteList
              items={this.state.searchResult}
              favList={this.state.favList}
              removeFromFavList={this.removeFromFavList}
              addToFavList={this.addToFavList}
            />

            <p className="waste-list-result-number">
              {this.state.resultMessage}

            </p>

            {this.state.favList.length > 0 && <h3 className="title-fav mt-5">Favourites</h3>}

            <WasteList
              items={this.state.favList}
              favList={this.state.favList}
              removeFromFavList={this.removeFromFavList}
              addToFavList={this.addToFavList}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default App;

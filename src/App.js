import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import WasteList from './components/WasteList';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Search />
        <WasteList />
      </div>
    );
  }
}

export default App;

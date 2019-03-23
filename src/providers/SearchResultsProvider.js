import React, { Component } from 'react';

const SearchResultsContext = React.createContext();

class SearchResultsProvider extends Component {
  state = {
    results:[],
    updateSearchResults: updatedSearchResults => this.updateSearchResults(updatedSearchResults)
  }

  updateSearchResults = updatedSearchResults => {
    this.setState(prevState => ({
      results: updatedSearchResults
    }))
  }

  render () {
    return (
      <SearchResultsContext.Provider value={this.state}>
        {this.props.children}
      </SearchResultsContext.Provider>
    );
  }
}

const SearchResultsConsumer = SearchResultsContext.Consumer; 
export {SearchResultsProvider, SearchResultsConsumer};
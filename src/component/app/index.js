import React from 'react';
import axios from 'axios';
import SearchBar from '../search-bar';
import FlightList from '../flight-list';
import FlightHeader from '../flight-header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: [],
      flights: null,
      searchError: null,
    };
    this.renderIf = this.renderIf.bind(this);
    this.flightSearch = this.flightSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  // loads list of airports to populate search bar
  componentDidMount() {
    axios.get(`${__API_URL__}/api/airports`)
      .then(res => {
        let airport = res.data;
        this.setState({airport});
      });
  }

  // render flights component if matching results - otherwise, return not found message
  renderIf(status, component) { return status ? component : undefined; }

  flightSearch(departureAirport, arrivalAirport) {
    axios.get(`${__API_URL__}/api/flights/${departureAirport}/${arrivalAirport}`)
      .then(res => {
        console.log('request success - airports: ', res.data);
        this.setState({
          flights: res.data,
          searchError: null,
        });
      })
      .catch(err => {
        console.log('err:', err);
        this.setState({
          flights: null,
          searchError: 'Oops! Flight not available.',
        });
      });
  }

  handleSort(type) {
    console.log('handleSort: ', type);
  }

  componentDidUpdate() {
    console.log(':::::STATE::::', this.state);
  }

  render() {
    return (
      <main>
        <h1>This is the App Component</h1>

        <SearchBar airport={this.state.airport} handleSearch={this.flightSearch}/>
    
        {this.renderIf(this.state.flights,
          <FlightHeader columnSort={this.handleSort}/>)}

        {this.renderIf(this.state.flights,
          <FlightList flightList={this.state.flights}/>)}

        {this.renderIf(this.state.searchError,                    <p><span>{this.state.searchError}</span></p>)}

      </main>
    );
  }
}

export default App;

import React from 'react';
import axios from 'axios';
import SearchBar from '../search-bar';
import FlightList from '../flight-list';
// import FlightHeader from '../flight-header';

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
    this.sortAscendingPrice = this.sortAscendingPrice.bind(this);
    this.sortDescendingPrice = this.sortDescendingPrice.bind(this);
    this.sortAscendingTime = this.sortAscendingTime.bind(this);
    this.sortDescendingTime = this.sortDescendingTime.bind(this);
  }

  // loads list of airports to populate search bar
  componentDidMount() {
    axios.get(`${__API_URL__}/api/airports`)
      .then(res => {
        let airport = res.data;
        this.setState({airport});
      });
  }

  // ######  AIPORT  ######
  // render flights component, if matching results - otherwise, return not found message
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

  // ##### FLIGHTS SORT ###########
  handleSort(type, order) {
    console.log('handleSort type: ', type);
    console.log('handleSort order: ', order);

    switch(type) {
    case 'Departs':
      order ? this.sortAscendingTime(type) : this.sortDescendingTime(type);
      break;
    case 'Arrives':
      order ? this.sortAscendingTime(type) : this.sortDescendingTime(type);
      break;
    case 'MainCabinPrice':
      order ? this.sortAscendingPrice(type) : this.sortDescendingPrice(type);
      break;
    case 'FirstClassPrice':
      order ? this.sortAscendingPrice(type) : this.sortDescendingPrice(type);
      break;

    default: break;
    }
  }

  sortAscendingPrice(type){
    let flightsArr = this.state.flights;
    console.log('ASCENDING', type);

    let sortedByPriceAscending = flightsArr.sort((a,b) => {
      return parseInt(a[type]) - parseInt(b[type]);
    });
    this.setState({
      flights: sortedByPriceAscending,
    });

  }

  sortDescendingPrice(type){
    let flightsArr = this.state.flights;
    let sortedByPriceDescending = flightsArr.sort((a,b) => {
      return parseInt(b[type]) - parseInt(a[type]);
    });
    this.setState({
      flights: sortedByPriceDescending,
    });
  }

  sortAscendingTime(type){
    let flightsArr = this.state.flights;

    let sortedByTimeAscending = flightsArr.sort((a,b) => {
      return new Date('2017/01/01 ' + a[type]) - new Date('2017/01/01 ' + b[type]);
    });
    console.log('sorted ascending time', sortedByTimeAscending);

    this.setState({
      flights: sortedByTimeAscending,
    });
  }

  sortDescendingTime(type){
    let flightsArr = this.state.flights;

    let sortedByTimeDescending = flightsArr.sort((a,b) => {
      return new Date('2017/01/01 ' + b[type]) - new Date('2017/01/01 ' + a[type]);
    });
    this.setState({
      flights: sortedByTimeDescending,
    });
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
          <FlightList flightList={this.state.flights} columnSort={this.handleSort}/>)}

        {this.renderIf(this.state.searchError,                    <p><span>{this.state.searchError}</span></p>)}

      </main>
    );
  }
}

export default App;

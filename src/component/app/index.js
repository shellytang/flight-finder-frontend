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
    this.sortByPrice = this.sortByPrice.bind(this);
    this.sortByTime = this.sortByTime.bind(this);
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
    switch(type) {
    case 'Departs':
    case 'Arrives':
      this.sortByTime(type, order);
      break;
    case 'MainCabinPrice':
    case 'FirstClassPrice':
      this.sortByPrice(type, order);
      break;
    default: break;
    }
  }

  sortByPrice(type, order){
    let flightsArr = this.state.flights;
    let sortedByPrice = flightsArr.sort((a,b) => {
      return order ? parseInt(a[type]) - parseInt(b[type]) : parseInt(b[type]) - parseInt(a[type]);
    });
    this.setState({
      flights: sortedByPrice,
    });
  }

  sortByTime(type, order){
    let flightsArr = this.state.flights;
    let sortedByTime = flightsArr.sort((a,b) => {
      return order ? new Date('2017/01/01 ' + a[type]) - new Date('2017/01/01 ' + b[type]) :
        new Date('2017/01/01 ' + b[type]) - new Date('2017/01/01 ' + a[type]);
    });
    this.setState({
      flights: sortedByTime,
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

import React from 'react';
// import FlightHeader from '../flight-header';

class FlightList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      isAscending: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
    console.log('this was clicked:', e.target.id);

    this.setState({
      type: e.target.id, //
      isAscending: !this.state.isAscending, // toggles sort order
    }, () => this.props.columnSort(this.state.type, this.state.isAscending)); // callback to use update state
  }

  render() {

    let flightList = this.props.flightList || [];
    console.log('FLIGHTS: ', flightList);

    let flights = flightList.map(flight => {
      return (
        <tr key={flight.FlightNumber}>
          <td>{flight.From}</td>
          <td>{flight.To}</td>
          <td>{flight.FlightNumber}</td>
          <td>{flight.Departs}</td>
          <td>{flight.Arrives}</td>
          <td>${flight.MainCabinPrice}</td>
          <td>${flight.FirstClassPrice}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Flight Number</th>
            <th onClick={this.handleClick} id='Departs'>Departs</th>
            <th onClick={this.handleClick} id='Arrives'>Arrives</th>
            <th onClick={this.handleClick} id="MainCabinPrice">Main Cabin Price</th>
            <th onClick={this.handleClick} id="FirstClassPrice">First Class Price</th>
          </tr>
        </thead>
        <tbody>
          {flights}
        </tbody>
      </table>
    );
  }
}

export default FlightList;

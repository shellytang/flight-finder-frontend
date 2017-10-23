import React from 'react';

class FlightList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    let flightList = this.props.flightList || [];
    console.log('what is flightlist', flightList);

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
            <th onClick={this.props.columnSort} id='Departs'>Departs</th>
            <th onClick={this.props.columnSort} id='Arrives'>Arrives</th>
            <th onClick={this.props.columnSort} id="MainCabinPrice">Main Cabin Price</th>
            <th onClick={this.props.columnSort} id="FirstClassPrice">First Class Price</th>
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

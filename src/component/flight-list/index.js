import React from 'react';
import FlightHeader from '../flight-header';

class FlightList extends React.Component {
  constructor(props) {
    super(props);

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
        <tbody>
          {flights}
        </tbody>
      </table>
    );
  }
}

export default FlightList;

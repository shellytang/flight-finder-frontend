import React from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';

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
    this.setState({
      type: e.target.id, //column to sort by
      isAscending: !this.state.isAscending, // toggles sort order
    }, () => this.props.columnSort(this.state.type, this.state.isAscending)); // callback to use update state
  }

  render() {

    let flightList = this.props.flightList || [];

    // render each row with flight details
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
      <Table striped bordered hover responsive className='flightTable'>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Flight Number</th>
            <th>Departs<Button bsSize="xsmall" className='sortButton'><Glyphicon glyph="sort" onClick={this.handleClick} id='Departs'/></Button></th>

            <th>Arrives<Button bsSize="xsmall" className='sortButton'><Glyphicon glyph="sort" onClick={this.handleClick} id='Arrives'/></Button></th>

            <th>Main Cabin Price<Button bsSize="xsmall" className='sortButton'><Glyphicon glyph="sort" onClick={this.handleClick} id="MainCabinPrice"/></Button></th>

            <th>First Class Price<Button bsSize="xsmall" className='sortButton'><Glyphicon glyph="sort" onClick={this.handleClick} id="FirstClassPrice"/></Button></th>
          </tr>
        </thead>
        <tbody>
          {flights}
        </tbody>
      </Table>
    );
  }
}

export default FlightList;

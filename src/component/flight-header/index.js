import React from 'react';

class FlightHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {

    return (
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
    );
  }
}

export default FlightHeader;

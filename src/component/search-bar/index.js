import React from 'react';
import { Button, Form, ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departureAirport: '',
      arrivalAirport: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState ({
      [name]: value,  
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.departureAirport, this.state.arrivalAirport);
  }

  render() {
    let airports = this.props.airport;
    let names = airports.map(airport => {
      return (
        <option value={airport.Code} key={airport.Code}>{airport.Name}</option>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit} className='searchForm'>
        <FormGroup controlId="formInlineFrom">
          <label>From</label>
          <FormControl
            componentClass='select'
            placeholder='Select a departure city'
            require='required'
            name='departureAirport'
            value={this.state.departureAirport}
            onChange={this.handleChange}>
            <option>Select a departure city</option>
            {names}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formInlineTo">
          <label>To</label>
          <FormControl
            componentClass='select'
            placeholder='Select a destination'
            required='required'
            name='arrivalAirport'
            value={this.state.arrivalAirport}
            onChange={this.handleChange}>
            <option>Select an destination city</option>
            {names}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <Button bsStyle='primary' type='submit' value='Submit'>Find Flights</Button>
        </FormGroup>
      </Form>
    );
  }

}

export default SearchBar;

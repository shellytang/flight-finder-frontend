import React from 'react';

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


  componentDidUpdate() {
    console.log(':::::STATE: SEARCH BAR::::', this.state);
  }


  render() {
    let airports = this.props.airport;
    let names = airports.map(airport => {
      return (
        <option value={airport.Code} key={airport.Code}>{airport.Name}</option>
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>From</label>
          <select require='required'name='departureAirport' value={this.state.departureAirport} onChange={this.handleChange}>
            <option>Select a departure city</option>
            {names}
          </select>
        </div>

        <div>
          <label>To</label>
          <select required='required' name='arrivalAirport' value={this.state.arrivalAirport} onChange={this.handleChange}>
            <option>Select an destination city</option>
            {names}
          </select>
        </div>
        <button type='submit' value='Submit'>Search</button>
      </form>
    );
  }

}

export default SearchBar;

// import React from 'react';
//
// class FlightHeader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       type: ''
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   handleClick(e) {
//     e.preventDefault();
//     console.log('this was clicked:', e.target.id);
//     this.setState({
//       type: e.target.id, //
//     }, () => this.props.columnSort(this.state.type)); // callback to use update state
//   }
//
//   render() {
//
//     return (
//       <thead>
//         <tr>
//           <th>From</th>
//           <th>To</th>
//           <th>Flight Number</th>
//           <th onClick={this.handleClick} id='Departs'>Departs</th>
//           <th onClick={this.handleClick} id='Arrives'>Arrives</th>
//           <th onClick={this.handleClick} id="MainCabinPrice">Main Cabin Price</th>
//           <th onClick={this.handleClick} id="FirstClassPrice">First Class Price</th>
//         </tr>
//       </thead>
//     );
//   }
// }
//
// export default FlightHeader;

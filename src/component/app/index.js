import React from 'react';
import axios from 'axios';
// import SearchBar from '../search-bar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: [],
    };
  }

  componentDidMount() {
    axios.get(`${__API_URL__}/api/airports`)
      .then(res => {
        let airport = res.data;
        this.setState({airport});
      });
  }

  componentDidUpdate() {
    console.log(':::::STATE::::', this.state);
  }

  render() {
    return (
      <main>
        <h1>This is the App Component</h1>

      </main>
    );
  }
}

export default App;

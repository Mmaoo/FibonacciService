import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class FibonacciPage extends Component {
  state = {
    index: '',
    lastValue: '',
  };
  
  async fetchLastValue(index){
    const values = await axios.get('/api/values/current');
    this.setState({
      lastValue: {number: index,
    		value: values.data[index],}});
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.fetchLastValue(this.state.index);
    this.setState({ index: '' });
  };
  
  render() {
    return (
      <div>
        <h2>Fibonacci</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Wprowadź liczbę k: </label>
          <input
            type="number" min="0" max="20"
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Wyślij</button>
        </form>

	{this.state.lastValue !== '' && 
	  <div>
	    <h3>Wynik</h3>
	    <p>{this.state.lastValue.value}</p>
	  </div>
	}
	<Link to="/history">Historia</Link>
      </div>
    );
  }
}

export default FibonacciPage;

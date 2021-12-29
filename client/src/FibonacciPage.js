import React, { Component } from 'react';
import axios from 'axios';

class FibonacciPage extends Component {
  state = {
    seenIndexes: [],
    values: {},
    lastValues: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
    this.fetchLastValues();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }
  
  async fetchLastValues() {
    const indexes = await axios.get('/api/values/last');
    //console.log(indexes.data);
    const values = await axios.get('/api/values/current');
    //console.log(values.data);
    var lastValues = [];
    for(let i=0;i<indexes.data.length;i++){
    	//console.log(indexes.data[i]);
    	var num = indexes.data[i].number;
    	lastValues.push({number: num,
    			value: values.data[num],});
    }
    //var lastValues = indexes.data;
    this.setState({
      lastValues: lastValues,
    });
    //console.log(this.state.lastValues)
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });
    this.fetchLastValues();
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.lastValues) {
      entries.push(
        <div key={key}>
          For index {key}
        </div>
      );
    }

    return entries;
  }
  
  renderLastValues() {
    const entries = [];
    for (let key in this.state.lastValues) {
      entries.push(
        <tr key={key}>
           <td>{this.state.lastValues[key].number}</td>
           <td>{this.state.lastValues[key].value}</td>
        </tr>
      );
    }
    
    return entries;
  }

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

	<h3>Historia:</h3>
	<div>
	<table><thead>
	  <tr><td>Numer</td><td>Wartość</td></tr>
	</thead><tbody>
        {this.renderLastValues()}
	</tbody></table>
	</div>
      </div>
    );
  }
}

export default FibonacciPage;

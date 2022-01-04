import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class FibonacciPage extends Component {
  state = {
    lastValues: {},
  };

  componentDidMount() {
    this.fetchLastValues();
  }
  
  async fetchLastValues() {
    const indexes = await axios.get('/api/values/last/10');
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
    console.log(this.state.lastValue);
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
	<h3>Historia:</h3>
	<div>
	<table><thead>
	  <tr><td>Numer</td><td>Wartość</td></tr>
	</thead><tbody>
        {this.renderLastValues()}
	</tbody></table>
	</div>
	<Link to="/">Powrót</Link>
      </div>
    );
  }
}

export default FibonacciPage;

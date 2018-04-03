import React, {Component} from 'react';
import {subscribeToTimer} from '../api'

class RealTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet'
    }
    subscribeToTimer((err, timestamp)=>{
      this.setState({timestamp})
    })
  }

  render() {
    return (
      <div>
        Time stamp: {this.state.timestamp}
      </div>
    );
  }
}

export default RealTime;

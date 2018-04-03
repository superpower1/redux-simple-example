import React from "react";
import {connect} from 'react-redux';
import {changeInput} from '../actions';
import RealTime from './RealTime';
import Table from './Table';
import Graph from './Graph';

class FooComponent extends React.Component {
  handleChange = e => {
    this.props.dispatch(changeInput(e.target.value));
  }

  render() {
    return (
      <div>
        <RealTime/>
        <input type="text" onChange={this.handleChange}/>
        <p>{this.props.text}</p>
        <Table/>
        <Graph/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.inputReducer.input
  }
}

export default connect(mapStateToProps)(FooComponent);

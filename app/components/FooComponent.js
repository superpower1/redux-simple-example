import React from "react";
import {connect} from 'react-redux';
import {changeInput} from '../actions';
import RealTime from './RealTime';
import Table from './Table';
import Graph from './Graph';
import AutoComplete from './AutoComplete'

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
        <AutoComplete/>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque magni dolor facilis, impedit ea excepturi sapiente, sint voluptas culpa numquam reiciendis eveniet in deserunt asperiores iure, labore repudiandae provident tempore.</p>
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

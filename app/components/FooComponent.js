import React from "react";
import {connect} from 'react-redux';
import {changeInput} from '../actions';

class FooComponent extends React.Component {
  handleChange = e => {
    this.props.dispatch(changeInput(e.target.value));
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange}/>
        <p>{this.props.text}</p>
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

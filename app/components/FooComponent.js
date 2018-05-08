import React from "react";
import {connect} from 'react-redux';
import {changeInput} from '../actions';
// import RealTime from './RealTime';
import Graph from './Graph';
import RangeSlider from './RangeSlider';
import DragAndDrop from './DragAndDrop';
import swal from 'sweetalert2';

class FooComponent extends React.Component {
  handleChange = e => {
    this.props.dispatch(changeInput(e.target.value));
  }

  showAlert = () => {
    swal({
      title: 'Auto close alert!',
      text: 'I will close in 5 seconds.',
      timer: 5000,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer')
      }
    })
  }

  render() {
    return (
      <div>
        {/* <RealTime/> */}
        <input type="text" onChange={this.handleChange}/>
        <p>{this.props.text}</p>
        {/* <Graph/> */}
        <button onClick={this.showAlert}>Show Alert</button>
        <RangeSlider/>
        <DragAndDrop/>
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

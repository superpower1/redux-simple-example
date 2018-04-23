import React from "react";
import {connect} from 'react-redux';
import {changeInput} from '../actions';
import RealTime from './RealTime';
import Table from './Table';
import Graph from './Graph';
import AutoComplete from './AutoComplete';
import RangeSlider from './RangeSlider';
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
        <RealTime/>
        <input type="text" onChange={this.handleChange}/>
        <p>{this.props.text}</p>
        <Table/>
        {/* <Graph/> */}
        <AutoComplete/>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque magni dolor facilis, impedit ea excepturi sapiente, sint voluptas culpa numquam reiciendis eveniet in deserunt asperiores iure, labore repudiandae provident tempore.</p>
        <button onClick={this.showAlert}>Show Alert</button>
        <RangeSlider/>
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

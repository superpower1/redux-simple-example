import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {updateChart} from '../actions';

class Graph extends Component {

  componentDidMount() {
    setInterval(()=>{
      let {labels, data} = this.props;
      const randomNum = Math.floor(Math.random() * 100);
      labels = labels.slice(0);
      data = data.slice(0);

      labels.push('data');
      labels.shift();
      data.push(randomNum);
      data.shift();

      this.props.dispatch(updateChart({labels, data}))
    }, 1000)
  }

  render() {
    const line = {
      labels: this.props.labels,
      datasets: [
        {
          label: 'My First dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.data
        }
      ]
    };

    return (

      <div className="chart-wrapper">
        <Line data={line}
          height={50}
          options={{
            maintainAspectRatio: true,
            // responsive: true,
            scales: { xAxes: [{ display: false }], yAxes: [{ display: true }] },
            // scales: { yAxes: [{ ticks: {max:100, min:0} }] },
            legend: { display: false },
            animation: false
          }}
        />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    labels: state.chartReducer.labels,
    data: state.chartReducer.data
  }
}

export default connect(mapStateToProps)(Graph);

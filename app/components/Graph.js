import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data'],
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
  }

  componentDidMount() {
    setInterval(()=>{
      const randomNum = Math.floor(Math.random() * 100);
      let labels = this.state.labels.slice(0);
      let data = this.state.data.slice(0);

      labels.push('data');
      labels.shift();
      data.push(randomNum);
      data.shift();
      this.setState({labels, data});
    }, 1000)
  }

  render() {
    const line = {
      labels: this.state.labels,
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
          data: this.state.data
        }
      ]
    };

    return (

      <div className="chart-wrapper">
        <Line data={line}
              options={{
            maintainAspectRatio: true,
            // scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] },
            scales: { yAxes: [{ ticks: {max:100, min:0} }] },
            legend: { display: false },
            animation: false
          }}
        />
      </div>

    );
  }
}

export default Graph;

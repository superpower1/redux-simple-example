import React, {Component} from 'react';
import ReactTable from 'react-table';
import { makeData, Logo, Tips } from "../utils";
import "react-table/react-table.css";
import Graph from './Graph';

class Table extends Component {
  constructor() {
    super();
    const data = makeData();
    this.state = {
      data,
      showName: true,
      expanded: new Array(data.length).fill(false)
    };
  }

  toggleName = () => {
    const showName = !this.state.showName;
    this.setState({showName});
  }

  subMenu = (prop) => {
    return (
      <div>
        <ul>
          <li>Item1</li>
          <li>Item2</li>
          <li>Item3</li>
        </ul>
      </div>
    )
  }

  rowOnClick = (state, rowInfo, column) => {
    if(rowInfo != undefined) {
      return {
        onClick: (e) => {
          this.expandRow(rowInfo);
        }
      }
    }
    else return {}
  }

  expandRow = (rowInfo) => {
    const expanded = this.state.expanded.map((element, index) => {
       return (index === rowInfo.index ? !element : false);
     });
    this.setState({expanded});
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <input type="checkbox" onClick={this.toggleName} value="Show Name"/>
        <ReactTable
          data={data}
          columns={[{
            Header: 'Name',
            columns: [{
              Header: 'First Name',
              accessor: 'firstName',
              show: this.state.showName
            }, {
              Header: 'Last Name',
              id: 'lastName',
              accessor: d => d.lastName,
              show: this.state.showName
            }]
          }, {
            Header: 'Info',
            columns: [{
              Header: 'Profile Progress',
              accessor: 'progress',
              Cell: row => (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#dadada',
                    borderRadius: '2px'
                  }}
                >
                  <div
                    style={{
                      width: `${row.value}%`,
                      height: '100%',
                      backgroundColor: row.value > 66 ? '#85cc00'
                        : row.value > 33 ? '#ffbf00'
                        : '#ff2e00',
                      borderRadius: '2px',
                      transition: 'all .2s ease-out'
                    }}
                  />
                </div>
              )
            }, {
              Header: 'Status',
              accessor: 'status',
              Cell: row => (
                <span>
                  <span style={{
                    color: row.value === 'relationship' ? '#ff2e00'
                      : row.value === 'complicated' ? '#ffbf00'
                      : '#57d500',
                    transition: 'all .3s ease'
                  }}>
                    &#x25cf;
                  </span> {
                    row.value === 'relationship' ? 'In a relationship'
                    : row.value === 'complicated' ? `It's complicated`
                    : 'Single'
                  }
                </span>
              )
            }, {
              Header: 'Menu',
              expander: true,
              width: 65,
              Expander: ({ isExpanded, ...rest }) =>
                <div>
                  {isExpanded
                    ? <span>&#x2299;</span>
                    : <span>&#x2295;</span>}
                </div>,
              style: {
                cursor: "pointer",
                fontSize: 25,
                padding: "0",
                textAlign: "center",
                userSelect: "none"
              },
            }]
          }]}
          pageSize={this.state.data.length}
          className="-striped -highlight"
          SubComponent={this.subMenu}
          expanded={this.state.expanded}
          getTdProps={this.rowOnClick}
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default Table;

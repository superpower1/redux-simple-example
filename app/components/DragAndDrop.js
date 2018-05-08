import React, {Component} from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';

import Table from './Table';
import AutoComplete from './AutoComplete';
import Graph from './Graph';

const ResponsiveGridLayout = WidthProvider(Responsive);

const lgLayout = [
  {i: '1', x: 0, y: 0, w: 6, h: 2, static: true},
  {i: '2', x: 6, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
  {i: '3', x: 9, y: 0, w: 3, h: 2}
];
const mdLayout = [
  {i: '1', x: 0, y: 0, w: 10, h: 2, static: true},
  {i: '2', x: 0, y: 2, w: 6, h: 2, minW: 2},
  {i: '3', x: 6, y: 2, w: 4, h: 2}
];
// {lg: layout1, md: layout2, ...}
const layouts = {lg: lgLayout, md: mdLayout}
const originalLayouts = getFromLS("layouts") || layouts;

const originalItems = [{
  i: "input", x: 0, y: 0, w: 2, h: 2
}, {
  i: "output", x: 0, y: 0, w: 2, h: 2
}]
const savedItems = getFromLS("savedItems") || [];

class DragAndDrop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: savedItems,
      // newCounter: itemNum,
      layouts: originalLayouts,
      showWidget: {
        showInput: true,
        showOutput: true
      }
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: 'rgba(0,0,0,.5)'}}>
        <span className="text">{i}</span>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    const deleteItem = (item) => {
      return item.i !== i;
    }
    const items = this.state.items.filter(deleteItem);
    saveToLS("savedItems", items);
    this.setState({ items });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    saveToLS("savedItems", this.state.items);
    this.setState({ layouts });
  }

  resetLayout() {
    this.setState({ layouts });
  }

  toggleWidget(key) {
    console.log(key);
    let items = this.state.items;
    const item = items.find(item=>item.i===key);
    if (item) {
      items = items.filter((el) => {
        return el.i !== key;
      });
    } else {
      items.push(originalItems.find(item=>item.i===key));
    }
    this.setState({items});
    saveToLS("savedItems", items);
  }

  render() {
    const {showInput, showOutput} = this.state.showWidget;
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <button onClick={()=>{this.toggleWidget('input')}}>toggle input</button>
        <button onClick={()=>{this.toggleWidget('output')}}>toggle output</button>
        <ResponsiveGridLayout className="layout" layouts={this.state.layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }>
          <div key="1"><Table/></div>
          <div key="2" style={{backgroundColor: 'rgba(0,0,0,.5)'}}><Graph/></div>
          <div key="3" style={{backgroundColor: 'rgba(0,0,0,.5)'}}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque magni dolor facilis, impedit ea excepturi sapiente, sint voluptas culpa numquam reiciendis eveniet in deserunt asperiores iure, labore repudiandae provident tempore.</p>
          </div>
          {this.state.items.map(el => this.createElement(el))}
        </ResponsiveGridLayout>
      </div>
    )
  }
}

export default DragAndDrop;

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key));
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls;
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }
}

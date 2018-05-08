import React, {Component} from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';

import Table from './Table';
import AutoComplete from './AutoComplete';

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
const savedItems = getFromLS("savedItems") || [];
const itemNum = savedItems.length;

class DragAndDrop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: savedItems,
      newCounter: itemNum,
      layouts: originalLayouts
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
    this.removeAddonItems = this.removeAddonItems.bind(this);
    console.log(savedItems);
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

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    const items = this.state.items.concat({
      i: "n" + this.state.newCounter,
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    });
    saveToLS("savedItems", items);
    console.log(items);
    this.setState({
      // Add a new item. It must have a unique key!
      items,
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
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
    console.log('onLayoutChange');
    saveToLS("layouts", layouts);
    saveToLS("savedItems", this.state.items);
    this.setState({ layouts });
  }

  resetLayout() {
    this.setState({ layouts });
  }

  removeAddonItems() {
    this.setState({ items: [] });
    saveToLS("savedItems", []);
  }

  render() {

    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <button onClick={this.removeAddonItems}>Remove addon items</button>
        <ResponsiveGridLayout className="layout" layouts={this.state.layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }>
          <div key="1"><Table/></div>
          <div key="2" style={{backgroundColor: 'rgba(0,0,0,.5)'}}><AutoComplete/></div>
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

import React, {Component} from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';

import Table from './Table';
import AutoComplete from './AutoComplete';

const ResponsiveGridLayout = WidthProvider(Responsive);

class DragAndDrop extends React.Component {
  render() {
    var lgLayout = [
      {i: '1', x: 0, y: 0, w: 6, h: 2, static: true},
      {i: '2', x: 6, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: '3', x: 9, y: 0, w: 3, h: 2}
    ];
    var mdLayout = [
      {i: '1', x: 0, y: 0, w: 10, h: 2, static: true},
      {i: '2', x: 0, y: 2, w: 6, h: 2, minW: 2},
      {i: '3', x: 6, y: 2, w: 4, h: 2}
    ];
    // {lg: layout1, md: layout2, ...}
    var layouts = {lg: lgLayout, md: mdLayout}
    return (
      <ResponsiveGridLayout className="layout" layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key="1"><Table/></div>
        <div key="2" style={{backgroundColor: 'rgba(0,0,0,.5)'}}><AutoComplete/></div>
        <div key="3" style={{backgroundColor: 'rgba(0,0,0,.5)'}}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque magni dolor facilis, impedit ea excepturi sapiente, sint voluptas culpa numquam reiciendis eveniet in deserunt asperiores iure, labore repudiandae provident tempore.</p>
        </div>
      </ResponsiveGridLayout>
    )
  }
}

export default DragAndDrop;

import React, {Component} from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class RangeSlider extends Component {

  render() {
    const marks = {
      0: '11:30',
      10: '11:40',
      20: '11:50'
    }

    return (
      <div style={{padding: '50px'}}>
        <Range
          min={0}
          max={20}
          allowCross={false}
          pushable={5}
          defaultValue={[3, 10]}
          marks={marks} step={5}
          onAfterChange={value => console.log(value)}
          tipFormatter={value => `${value}%`} />
      </div>
    );
  }
}

export default RangeSlider;

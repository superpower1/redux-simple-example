import React, {Component} from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class RangeSlider extends Component {
  render() {
    return (
      <div>
        <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
      </div>
    );
  }
}

export default RangeSlider;

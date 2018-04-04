
import inputReducer from './inputReducer';
import chartReducer from './chartReducer';

import { combineReducers } from 'redux';

export default combineReducers({
  inputReducer,
  chartReducer
})

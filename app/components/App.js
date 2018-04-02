import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducers'
import PasswordInput from './PasswordInput'
import FooComponent from './FooComponent'

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const store = configureStore({inputReducer: {input: "hello"}});

    return (
      <Provider store={store}>
        <FooComponent/>
      </Provider>
    )
  }

}


const configureStore = (initialState) => {
  const store = createStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

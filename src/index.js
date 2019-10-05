import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import 'bootstrap/scss/bootstrap.scss';
import './scss/styles.scss';

import Tracker from './components/Tracker/Tracker';

const store = createStore(reducers, applyMiddleware(thunk));

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <Tracker />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

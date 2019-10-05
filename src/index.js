import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import Root from './components/Root/Root';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

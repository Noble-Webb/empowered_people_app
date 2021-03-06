import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import rootReducer from './reducers/index';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { register } from 'register-service-worker'
// import registerServiceWorker from 'registerServiceWorker';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
register();
reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/reducers';
import { App } from './components/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

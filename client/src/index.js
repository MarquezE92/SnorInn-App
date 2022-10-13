import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './Redux/Store/store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();


axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3002';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter >
    <App />
    </HashRouter>
    </Provider>
  </React.StrictMode>
);


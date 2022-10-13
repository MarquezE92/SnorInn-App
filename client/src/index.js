import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './Redux/Store/store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)


root.render(
  <>
    <Provider store={store}>
    <BrowserRouter>
    <PersistGate persistor = {persistor}>
    <App />
    </PersistGate>
    </BrowserRouter>
    </Provider>
  </>
);


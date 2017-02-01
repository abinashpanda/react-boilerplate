import React from 'react';
import Router from 'react-router/BrowserRouter';
import { render } from 'react-dom';
import App from './App';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app'),
);

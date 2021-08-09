import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'tachyons/css/tachyons.min.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

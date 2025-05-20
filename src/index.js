import React from 'react';
import { createRoot } from 'react-dom/client'; // Сучасний метод створення root
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import axios from 'axios';

// Base URL for API
axios.defaults.baseURL = 'http://localhost:5000';

// Сучасний метод рендерингу React 18+
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
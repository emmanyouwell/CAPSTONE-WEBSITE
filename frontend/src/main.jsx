import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import { setupAxiosInterceptors } from './api/setupInterceptor';
import { ThemeProvider } from '@material-tailwind/react';
import { theme } from './utils/theme.js';
setupAxiosInterceptors();
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider value={theme}>
    
      <App />
    
    </ThemeProvider>
  </Provider>
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <App />
                <ToastContainer />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
);

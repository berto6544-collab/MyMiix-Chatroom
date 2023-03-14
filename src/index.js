import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {HelmetProvider} from 'react-helmet-async';




ReactDOM.hydrate( 
    <HelmetProvider>
    <React.StrictMode>
        <App/>    
    </React.StrictMode>
    </HelmetProvider>,document.getElementById('root')
);



reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
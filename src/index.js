import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {DrinkServiceProvider} from './components/DrinkServiceContext';
import DrinkService from './service';
import 'bootstrap/dist/css/bootstrap.min.css';

const drinkService = new DrinkService();

ReactDOM.render(
    <DrinkServiceProvider value={drinkService}>
        <App />
    </DrinkServiceProvider>,
document.getElementById('root'));
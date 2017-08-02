/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/

import React from 'react';
import ReactDOM from 'react-dom';

import {applyMiddleware,createStore} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import routes from './routes';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';

const initialState=window.INITIAL_STATE;
const middleware=applyMiddleware(thunk,logger);
const store=createStore(reducers,initialState,middleware);




const Routers =(
    <Provider store={store} >
        <div>
            {routes}
        </div>
    </Provider>
);




ReactDOM.render(
    Routers
    , document.getElementById('root'));

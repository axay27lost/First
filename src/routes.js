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
import BooksList from './components/pages/bookList';
import Main from './main';
import Cart from './components/pages/cart';
import BookForm from './components/pages/BooksForm';

import {Router,Route,IndexRoute,browserHistory} from 'react-router';

const routes =(
        <div>
        <Router history={browserHistory}>
            <Route components={Main} path="/">
                <IndexRoute components={BooksList}/>
                <Route path="/admin" components={BookForm}/>
                <Route path="/cart" components={Cart}/>
            </Route>
        </Router>
        </div>
);
export default routes;
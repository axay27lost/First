/**
 * Created by Developer39 on 7/27/2017.
 */
import {combineReducers} from 'redux';

import {BookReducers} from './BookReducers';
import {cartReducer} from './cartReducer';

export default combineReducers({
    books:BookReducers,
    cart:cartReducer
});
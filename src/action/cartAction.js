/**
 * Created by Developer39 on 7/27/2017.
 */

import axios from 'axios';


//GET-CART

export function getCart() {
    return function (dispatch) {
        axios.get('/api/cart')
            .then(function (response) {
                dispatch({type:"GET_CART",payload:response.data})
            })
            .catch(function (err) {
                dispatch({type:"GET_CART_ERROR",msg:"error While Fatching Data"})
            })
    }
}
export function addToCart(cart) {
    return function (dispatch) {
        axios.post('/api/cart',cart)
            .then(function (response) {
                dispatch({type:"ADD_TO_CART",payload:response.data})
            })
            .catch(function (err) {
                dispatch({type:"ADD_TO_CART_ERROR",msg:"error while adding into cart"})
            })
    }
}

export function deleteToCart(cart) {
    return function (dispatch) {
        axios.post('/api/cart',cart)
            .then(function (response) {
                dispatch({type:"DELETE_CART_ITEM",payload:response.data})
            })
            .catch(function (err) {
                dispatch({type:"DELETE_CART_ITEM_ERROR",msg:"error while Deleting into cart"})
            })
    }
}
export function updateToCart(_id,unit,cart) {
    const currentBookToUpdate=cart;
    const indexToUpdate=currentBookToUpdate.findIndex(
        function (book) {
            return book._id===_id
        }
    )
    const newBookToUpdate={
        ...currentBookToUpdate[indexToUpdate],
        quantity:currentBookToUpdate[indexToUpdate].quantity+unit
    }
    let cartUpdate = [...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,...currentBookToUpdate.slice(indexToUpdate+1)];


    return function (dispatch) {
        axios.post('/api/cart',cartUpdate)
            .then(function (response) {
                dispatch({type:"UPDATE_CART",payload:response.data})
            })
            .catch(function (err) {
                dispatch({type:"UPDATE_CART_ERROR",msg:"error while adding into cart"})
            })
    }
}
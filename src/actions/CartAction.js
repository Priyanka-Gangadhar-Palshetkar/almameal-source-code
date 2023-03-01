import * as types from '../constants/ActionTypes';

export const getCart = () => (dispatch) => {
   dispatch({
     type: types.GET_CART_SUCCESS
   });
}

export const addToCart = (product, quantity) => (dispatch) => {
  const cartItem = {
      "id": product.id,
      "image": product.images[0].src,
      "name": product.name,
      "quantity": quantity
  }
  dispatch({
      type: types.ADD_TO_CART_SUCCESS,
      item: cartItem
  });
}

export const removeFromCart = (item) => (dispatch) => {
  dispatch({
      type: types.REMOVE_FROM_CART_SUCCESS,
      item: item
  });
}

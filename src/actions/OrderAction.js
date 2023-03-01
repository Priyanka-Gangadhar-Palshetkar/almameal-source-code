import axios from 'axios';

import * as types from '../constants/ActionTypes';
import { getCustId } from '../config/auth';
import { getAllOrders } from '../services/OrderService';

export function getAllOrdersForCustomer() {
    return (dispatch) => {
        return getAllOrders().then(response => {
            dispatch({
                type: types.GET_ORDERS_SUCCESS,
                orders: response.data
            }
        )}).catch(err => {
            console.log(err.error);
        })
    };
}

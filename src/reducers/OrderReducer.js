import * as types from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

export default function (state = InitialState.orders, action) {
	switch (action.type) {
		case types.GET_ORDERS_SUCCESS:
			return action.orders;
		default:
			return state;
	}
}

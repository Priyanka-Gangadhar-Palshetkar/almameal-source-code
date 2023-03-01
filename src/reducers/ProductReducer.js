import * as types from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

export default function (state = InitialState.products, action) {
	switch (action.type) {
		case types.GET_PRODUCTS_SUCCESS:
			return action.products;
		case types.GET_MINI_MEALS_SUCCESS:
			return action.products;
		case types.GET_FULL_MEALS_SUCCESS:
			return action.products;
		case types.GET_MINI_VEG_MEALS_SUCCESS:
			return action.products;
		case types.GET_FULL_VEG_MEALS_SUCCESS:
			return action.products;
		case types.GET_MINI_NONVEG_MEALS_SUCCESS:
			return action.products;
		case types.GET_FULL_NONVEG_MEALS_SUCCESS:
			return action.products;
		case types.GET_VEG_MEALS_SUCCESS:
			return action.products;
		case types.GET_NONVEG_MEALS_SUCCESS:
			return action.products;
		case types.GET_SWEETS_SUCCESS:
			return action.products;
		case types.GET_SPECIALS_SUCCESS:
			return action.products;
		default:
			return state;
	}
}

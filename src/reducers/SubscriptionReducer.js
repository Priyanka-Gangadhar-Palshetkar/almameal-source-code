import * as types from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

export default function (state = InitialState.subscription, action) {
		switch (action.type) {
			case types.GET_SUBSCRIPTION_SUCCESS:
				return action.subscription;
			default:
				return state;
		}
}

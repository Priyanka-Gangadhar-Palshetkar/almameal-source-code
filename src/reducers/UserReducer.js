import * as types from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

export default function (state = InitialState.user, action) {
	switch (action.type) {
		case types.GET_USERDATA_SUCCESS:
			return action.user;
		default:
			return state;
	}
}

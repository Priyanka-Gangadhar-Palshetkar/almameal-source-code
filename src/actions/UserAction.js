import axios from 'axios';

import * as types from '../constants/ActionTypes';
import { getUserDataFromDb, addUserToDb } from '../services/UserService';

export function getUserData() {
    return (dispatch) => {
        return getUserDataFromDb().then(response => {
            dispatch({
                type: types.GET_USERDATA_SUCCESS,
                user: response.data
            }
        )}).catch(err => {
            console.log(err.error);
        })
    };
}

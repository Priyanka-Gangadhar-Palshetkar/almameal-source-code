import axios from 'axios';
import * as types from '../constants/ActionTypes';
import UrlProps from '../constants/UrlProps';

export function getSubscriptionProducts() {
    return (dispatch) => {
        const url = `${UrlProps.URL.wc}products/2791/variations?per_page=100&consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}`

        return axios.get(url).then(response => {
          dispatch({
              type: types.GET_SUBSCRIPTION_SUCCESS,
              subscription: response.data
          }
        )}).catch(err => {
          console.log(err.error);
        })
    };
}

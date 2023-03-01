import UrlProps from '../constants/UrlProps';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

export async function getAllOrders() {
  const cust_id = await AsyncStorage.getItem('cust_id');
  const URL = `${UrlProps.URL.wc}orders?customer=${cust_id}&consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}`
  return axios.get(URL);
}

export const addOrderToDb = (json) => {
    const URL = `${UrlProps.URL.wc}orders?consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}`
    return fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => response.json());
}

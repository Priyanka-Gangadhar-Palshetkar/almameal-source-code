import UrlProps from '../constants/UrlProps';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const getUserToken = (json) => {
    const URL = `${UrlProps.URL.token}`;
    return  fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => response.json());
}

export const addUserToDb = (json) => {
    const URL = `${UrlProps.URL.wc}customers?consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}`
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

export async function getUserDataFromDb() {
  const custId = await AsyncStorage.getItem('cust_id');
  const URL = `${UrlProps.URL.wc}customers/${custId}?consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}`
  return axios.get(URL);
}

export async function updateUserData(json) {
  const custId = await AsyncStorage.getItem('cust_id');
  const URL = `${UrlProps.URL.wc}customers/${custId}?consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}`
  return fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  })
  .then((response) =>
    alert('Data Updated')
  )
}

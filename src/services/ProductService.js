import UrlProps from '../constants/UrlProps';
import axios from 'axios';

export const getAllProductsFromDb = () => {
    const URL = `${UrlProps.URL.wc}products?consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}&status=${UrlProps.PROPERTIES.status}`;
    return  axios.get(URL);
}

export const getMealsFromDbForCategoryId = (category_id) => {
    const URL = `${UrlProps.URL.wc}products?per_page=${UrlProps.PROPERTIES.per_page}&category=${category_id}&consumer_key=${UrlProps.KEYS.ConsumerKey}&consumer_secret=${UrlProps.KEYS.ConsumerSecret}&status=${UrlProps.PROPERTIES.status}`;
    return axios.get(URL);
}

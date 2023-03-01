import axios from 'axios';

import UrlProps from '../constants/UrlProps';
import * as types from '../constants/ActionTypes';
import { getAllProductsFromDb, getMealsFromDbForCategoryId } from '../services/ProductService';

export function getAllProducts() {
    return (dispatch) => {
        return getAllProductsFromDb().then(response => {
            dispatch({
                type: types.GET_PRODUCTS_SUCCESS,
                products: response.data
            }
        )}).catch(err => {
            console.log(err.error);
        })
    };
}

export function getAllMiniMeals() {
  return (dispatch) => {
      return getMealsFromDbForCategoryId(UrlProps.PROPERTIES.mini_meals_id).then(response => {
          dispatch({
              type: types.GET_MINI_MEALS_SUCCESS,
              products: response.data
          }
      )}).catch(err => {
          console.log(err.error);
      })
  };
}

export function getAllFullMeals() {
  return (dispatch) => {
      return getMealsFromDbForCategoryId(UrlProps.PROPERTIES.full_meals_id).then(response => {
          dispatch({
              type: types.GET_FULL_MEALS_SUCCESS,
              products: response.data
          }
      )}).catch(err => {
          console.log(err.error);
      })
  };
}

export function getAllVegMeals() {
  return (dispatch) => {
      return getMealsFromDbForCategoryId(UrlProps.PROPERTIES.veg_meals_id).then(response => {
          dispatch({
              type: types.GET_VEG_MEALS_SUCCESS,
              products: response.data
          }
      )}).catch(err => {
          console.log(err.error);
      })
  };
}

export function getAllNonVegMeals() {
  return (dispatch) => {
      return getMealsFromDbForCategoryId(UrlProps.PROPERTIES.nonveg_meals_id).then(response => {
          dispatch({
              type: types.GET_FULL_NONVEG_MEALS_SUCCESS,
              products: response.data
          }
      )}).catch(err => {
          console.log(err.error);
      })
  };
}

export function getAllSweets() {
  return (dispatch) => {
      return getMealsFromDbForCategoryId(UrlProps.PROPERTIES.sweets_id).then(response => {
          dispatch({
              type: types.GET_SWEETS_SUCCESS,
              products: response.data
          }
      )}).catch(err => {
          console.log(err.error);
      })
  };
}

export function getAllSpecials() {
  return (dispatch) => {
      return getMealsFromDbForCategoryId(UrlProps.PROPERTIES.specials_id).then(response => {
          dispatch({
              type: types.GET_SPECIALS_SUCCESS,
              products: response.data
          }
      )}).catch(err => {
          console.log(err.error);
      })
  };
}

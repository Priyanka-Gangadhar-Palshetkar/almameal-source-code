import { combineReducers } from 'redux';
import products from './ProductReducer';
import cart from './CartReducer';
import subscription from './SubscriptionReducer';
import orders from './OrderReducer';
import user from './UserReducer';

const RootReducer = combineReducers({
  products,
  cart,
  subscription,
  orders,
  user
});
export default RootReducer;

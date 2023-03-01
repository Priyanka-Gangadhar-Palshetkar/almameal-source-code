import { AsyncStorage } from 'react-native';

export const onSignIn = (token) => AsyncStorage.setItem('jwt', token);

export const onSignOut = () => AsyncStorage.removeItem('jwt');

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('jwt')
      .then(res => {
        if(res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
       .catch(err => reject(err));
  });
}

export const storeCustId = (id) => AsyncStorage.setItem('cust_id', id);

export const removeCustId = (id) => AsyncStorage.removeItem('cust_id');

export async function getCustId() {
  try {
    const value = await AsyncStorage.getItem('cust_id');
    console.log(value);
    return value;
  } catch (error) {
  }
}

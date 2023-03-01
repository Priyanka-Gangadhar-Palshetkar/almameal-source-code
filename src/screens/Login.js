import React from 'react';
import { View,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  Text } from 'react-native';

import { onSignIn, storeCustId } from '../config/auth';
import { getUserToken, getUserDataFromDb } from '../services/UserService';

const t = require('tcomb-form-native');
const Form = t.form.Form;

const Email = t.subtype(t.Str, (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
});

const User = t.struct({
  username: Email,
  password:  t.String
});

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: {
        email: '',
        password: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        email: '',
        password: null
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  _getFormOptions = () => {
  return {
    auto: 'placeholders',
    fields: {
      username: {
        autoFocus: true,
        autoCapitalize: 'none',
        autoCorrect: false,
        placeholder: 'Email',
        placeholderTextColor: '#f8bbd0',
        error: 'Please insert a valid email.',
        returnKeyType: 'next',
        keyboardType: 'email-address',
        onSubmitEditing: () => {this.refs.form.getComponent('password').refs.input.focus()}
      },
      password: {
        autoCapitalize: 'none',
        secureTextEntry: true,
        autoCorrect: false,
        placeholderTextColor: '#f8bbd0',
        returnKeyType: 'go',
        maxLength: 14,
        error: 'Please insert a valid password.'
      }
    }
  }
}

  _handleAdd = () => {
  const value = this.refs.form.getValue();
  if (value) {
    const data = {
      username: value.username,
      password: value.password
    }

    const json = JSON.stringify(data);
    getUserToken(json).then((res) => {
      if (res.hasOwnProperty("code")) {
          alert('Please enter a valid username/password.');
        } else if(res.hasOwnProperty("token")) {
          getUserDataFromDb(res.user_email).then((res) => {
            var cust_id = res.customer.id;
            storeCustId(cust_id.toString())
          }
          )
          onSignIn(res.token).then(() => {
            this.props.navigation.navigate("SignedIn");
          });
        }
    }).catch(() => {
        alert('There was an error logging in.');
      }).done()
    } else {
      alert('Please fix the errors listed and try again.')
    }

  }

  render(){
    var formOptions = this._getFormOptions();
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.outputContainer}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.logo}
            source={require('../images/Icon.png')} />
          <Form
            ref='form'
            options={formOptions}
            type={User}
            value={this.state.value}
            onChange={this._onChange}
          />
          <TouchableOpacity style={styles.buttonContainer}  onPress={this._handleAdd}>
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  outputContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputContainer: {
      padding: 40,
      marginBottom: 100,
      marginTop: 100,
      justifyContent: 'center',
    },
  logo: {
      height: 70,
      width: 70,
      marginBottom:30,
      alignSelf: 'center'
    },
  buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16,
    },
  buttonContainer: {
      backgroundColor: '#ec407a',
      paddingVertical: 10,
      marginTop: 10,
      borderRadius: 8,
    }
  });

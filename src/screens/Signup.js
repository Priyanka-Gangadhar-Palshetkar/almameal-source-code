import React from 'react';
import { View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar } from 'react-native';

import { addUserToDb } from '../services/UserService';

const t = require('tcomb-form-native');
const Form = t.form.Form;

const Email = t.subtype(t.Str, (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
});

const Phone = t.subtype(t.Str, (phone) => {
  const reg = /^[0]?[789]\d{9}$/;
  return reg.test(phone);
});

const newUser = t.struct({
  name: t.String,
  email: Email,
  password:  t.String,
  phone: Phone
});

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        password: '',
        phone: ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        name: '',
        email: '',
        password: '',
        phone: ''
      }
    }
  }

  _getFormOptions = () => {
    return {
    auto: 'placeholders',
    fields: {
        name: {
          autoCapitalize: 'none',
          autoCorrect: false,
          placeholderText: 'Email',
          placeholderTextColor: '#f8bbd0',
          returnKeyType: 'next',
          onSubmitEditing: () => {this.refs.form.getComponent('email').refs.input.focus()}
        },
        email: {
          autoCapitalize: 'none',
          autoCorrect: false,
          error: 'Please insert a valid email.',
          placeholderTextColor: '#f8bbd0',
          returnKeyType: 'next',
          keyboardType: 'email-address',
          onSubmitEditing: () => {this.refs.form.getComponent('password').refs.input.focus()}
        },
        password: {
          autoCapitalize: 'none',
          secureTextEntry: true,
          autoCorrect: false,
          placeholderTextColor: '#f8bbd0',
          returnKeyType: 'next',
          maxLength: 14,
          onSubmitEditing: () => {this.refs.form.getComponent('phone').refs.input.focus()}
        },
        phone: {
          placeholderTextColor: '#f8bbd0',
          keyboardType: 'numeric',
          maxLength: 10,
          error: 'Please insert a valid phone number.'
        }
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  _handleAdd = () => {
    const value = this.refs.form.getValue();
    if (value) {
      const data = {
        email: value.email,
        password: value.password,
        first_name: value.name,
        last_name: '',
        username: value.email,
        billing: {
          first_name: value.name,
          last_name: '',
          company: '',
          address_1: '',
          address_2: '' ,
          city: '',
          state: '',
          postcode: '',
          country: '',
          email: value.email,
          phone: value.phone
        },
        shipping: {
          first_name: value.name,
          last_name: '',
          company: '',
          address_1: '',
          address_2: '',
          city: '',
          state: '',
          postcode: '',
          country: ''
        }
      }
      const json = JSON.stringify(data);
      addUserToDb(json).then((res) => {
        alert('Success! You may now log in.');
        this.props.navigation.navigate("LogIn");
      }).catch((error) => {
          alert('There was an error creating your account.');
        }).done()
    } else {
        return;
    }
  }

  _login = () => {
    this.props.navigation.navigate("LogIn");
  }

  _changePassword = () => {

  }

  render() {
    var formOptions = this._getFormOptions();
    return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Sign Up</Text>
          <Form
            ref='form'
            type={newUser}
            options={formOptions}
            value={this.state.value}
            onChange={this._onChange}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={this._handleAdd}>
            <Text style={styles.buttonText}> Create Account </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={this._changePassword}>
            <Text style={styles.link}> Forgot Password? </Text>
          </TouchableOpacity>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={this._login}>
              <Text style={styles.link}> Login </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
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
  },
  loginText: {
    color: 'black',
    fontSize: 14
  },
  link: {
    color: '#f06292',
    fontSize: 14,
    marginLeft: 5,
    textAlign: 'center'
  },
  loginTextContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 13,
    justifyContent: 'center'
  },
  forgotPasswordContainer: {
    marginTop: 10,
    justifyContent: 'center'
  }
});

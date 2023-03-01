import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Dimensions, Picker } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavigationBar from 'navigationbar-react-native';
import {Dropdown} from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import * as CartAction from '../actions/CartAction';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      isModalVisible: false
    };
  }

  _decreaseQuantity = () => {
    if(this.state.quantity <= 1) {
      return;
    } else {
        this.setState({
            quantity: this.state.quantity - 1
        });
    }
  }

  _increaseQuantity = () => {
    if(this.state.quantity < 5) {
      this.setState({
        quantity: this.state.quantity + 1
      })
    } else {
      alert('You cannot order more than' + 5);
    }
  }

  _addToCart(product) {
     this.setState({
       isModalVisible: true
     });
      this.props.CartAction.addToCart(product, this.state.quantity);
  }

  render() {
    let data = [{
      value: 'Half Meal',
    }, {
      value: 'Full Meal',
    }];

    const product = this.props.navigation.state.params.product;
    const cat_id = this.props.navigation.state.params.cat_id;
    return(
      <View style={styles.container}>
        <NavigationBar
          navigationBarStyle= {{ backgroundColor: '#ec407a' }}
          statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: '#b4004e' }}
          componentRight = {
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 15 }}>
              <TouchableOpacity>
                <Icon name="shopping-cart" size={22} color='#fff' onPress={() => this.props.navigation.navigate("Cart")} />
              </TouchableOpacity>
            </View>
          }
          componentLeft = {
            <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 15 }}>
              <TouchableOpacity>
                <Icon name="angle-left" size={30} color='#fff' onPress={() => this.props.navigation.navigate("ProductScreen", {cat_id: cat_id})} />
              </TouchableOpacity>
            </View>
          }
        />
        <ScrollView>
        <View style={{alignItems: 'center', paddingTop: 10}}>
            <Image style={styles.image} source={{ uri: product.images[0].src }}/>
        </View>
            <Text style={styles.text}>{product.name}</Text>
            <Dropdown containerStyle= {styles.containerStyle} label='Select Meal Type' data={data}/>
            <View style={{ display: 'flex', flexDirection: 'row', padding: 10, marginLeft: 20, marginBottom: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.decreaseButton} onPress={this._decreaseQuantity}>
                        <Text> - </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        onChangeText={(quantity) => this.setState({ quantity })}
                        value={`${this.state.quantity}`}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.increaseButton} onPress={this._increaseQuantity} >
                        <Text> + </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this._addToCart(product)} >
                    <Text style={{ color: '#fff' }}> ADD TO CART </Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
      </View>
    );
  }
}

var { screenWidth } = Dimensions.get('window').width;
var { screenHeight } = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white'
  },
  containerStyle: {
    paddingLeft: 30,
    paddingRight: 30
  },
  image: {
    width: 330,
    height: 300,
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        height: 40,
        width: 50,
        borderWidth: 1,
        borderColor: 'rgba(27,31,35,0.05)',
        padding: 10,
        backgroundColor: 'rgba(27,31,35,0.05)',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ec407a',
        padding: 10,
        width: 150,
        height: 40,
        marginLeft: 20,
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
    },
    decreaseButton: {
        height: 40,
        width: 30,
        padding: 10,
        backgroundColor: 'rgba(27,31,35,0.05)',
        borderBottomLeftRadius: 17,
        borderTopLeftRadius: 17,
    },
    increaseButton: {
        height: 40,
        width: 30,
        padding: 8,
        backgroundColor: 'rgba(27,31,35,0.05)',
        borderBottomRightRadius: 17,
        borderTopRightRadius: 17,
    },

});

function mapDispatchToProps(dispatch) {
	return {
		CartAction: bindActionCreators(CartAction, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(Product);

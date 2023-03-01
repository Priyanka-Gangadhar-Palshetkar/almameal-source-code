import React from 'react';
import { View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { getCustId, onSignOut } from '../config/auth';
import { getAllOrders } from '../services/OrderService';
import LoadingAnimation from '../images/cart-loading.gif';
import * as OrderAction from '../actions/OrderAction';
import * as UserAction from '../actions/UserAction';


class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.orders !== this.props.orders){
      this.setState({
        data: nextProps.orders
      });
    }
  }

  componentDidMount(){
    this.props.UserAction.getUserData();
    this.props.OrderAction.getAllOrdersForCustomer();
  }


  _handleSignOut = () => {
    onSignOut().then(() => {
      this.props.navigation.navigate("SignedOut");
    });
  }

  _keyExtractor = (item, index) => item.id.toString();

  render(){
    const Items =
    <View style={styles.container}>
      <View style={styles.textContainerRow}>
        <Text style={styles.userText}>{this.props.user.first_name}</Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{color: '#ff77a9', fontWeight: 'bold'}}>EDIT</Text>
        </View>
      </View>
      <View style={styles.textContainerRow}>
        <Text style={styles.text}>{this.props.user.first_name}</Text>
        <Text>{this.props.user.username}</Text>
      </View>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, shadowColor: 'grey', marginBottom: 5, paddingTop: 20 }} />
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black', paddingTop: 10}}>ORDERS</Text>
        <FlatList numColumns={1}
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) =>
              <View style={{flex: 1, paddingTop: 10}}>
                <Text style={{fontSize: 16}}>{item.line_items[0].name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>Pramila's Kitchen</Text>
                  {item.line_items[0].price === 60 ?
                    <Text style={{paddingLeft: 160}}> Half Meal </Text> :
                    <Text style={{paddingLeft: 160}}> Full Meal </Text>
                  }
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text>Rs {item.line_items[0].price}</Text>
                  <Text style={{paddingLeft: 160}}>{item.date_created}</Text>
                </View>
              </View>
            }
            ItemSeparatorComponent = {() => <View style={{ borderBottomColor: '#c8c7cc', borderBottomWidth: 1, marginBottom: 5, paddingTop: 20 }} />}
          />
          <TouchableOpacity style={styles.buttonContainer}  onPress={() => onSignOut().then(() => {
              this.props.navigation.navigate("SignedOut");
            })}>
            <Text style={styles.buttonText}> Log Out </Text>
          </TouchableOpacity>
        </View>

    return(
        <ScrollView>
          {this.props.orders.length * this.props.user.length !==0 ? Items :
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image style={styles.loader} source={LoadingAnimation}/>
            </View>
          }
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  textContainerRow: {
    flexDirection: 'row'
  },
  text: {
    paddingRight: 20
  },
  buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'serif',
      fontSize: 13,
    },
  buttonContainer: {
      backgroundColor: '#ec407a',
      padding: 15,
      marginTop: 18,
      borderRadius: 20,
    }
});

function mapStateToProps(state) {
	return {
		orders: state.orders,
    user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		OrderAction: bindActionCreators(OrderAction, dispatch),
    UserAction: bindActionCreators(UserAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React from 'react';
import { View,
    ScrollView,
    TouchableHighlight,
    Image,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import NavigationBar from 'navigationbar-react-native';
import LottieView from 'lottie-react-native';

import * as SubscriptionAction from '../actions/SubscriptionAction';
import Colors from '../constants/Colors';

class Subscription extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {

      this.props.SubscriptionAction.getSubscriptionProducts();
  }

  _renderHeader = () => {
      return (
        <View>
          <View style={{paddingTop: 20}}>
          </View>
          <NavigationBar
            navigationBarStyle= {{ backgroundColor: Colors.primaryColor }}
            statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: Colors.primaryDarkColor}}
          />
        </View>
      );
    };

  _keyExtractor = (item, index) => item.id.toString();

  render(){
    const { navigate } = this.props.navigation;
    const Items = <FlatList contentContainerStyle={styles.list} numColumns={1}
          data={this.props.subscription}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) =>
            <TouchableHighlight onPress={() => navigate("Product", { subscription: item })} underlayColor="white">
              <View style={styles.productContainer} >
                <Image style={styles.image} source={{uri: item.image.src}} />
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text numberOfLines={1} style={styles.text}> {item.attributes[1].option} </Text>
                  <Text style={{marginLeft: 10, fontSize: 14, color: '#546e7a'}}>{item.attributes[0].option}</Text>
                  <Text style={{marginLeft: 10, fontSize: 14, color: '#546e7a'}}>{item.attributes[2].option}</Text>
                  <Text style={{marginLeft: 10, fontSize: 14, color: 'black'}}> ₹ {item.price}</Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          ListHeaderComponent={this._renderHeader}
        />
    return(
        <View style={{flex: 1}}>
            {this.props.subscription.length ? Items :
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <LottieView
                    source='material_loader.json'
                    loop
                    style={{
                      width: 80,
                      height: 80
                    }}
                    autoPlay
                  />
              </View>
            }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column'
  },
  productContainer: {
    padding: 15,
    padding: 15,
    flexDirection: 'row'
  },
  image: {
    width: 80,
    height: 80
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black'
  },
  button2: {
    borderRadius: 30,
    marginBottom: 0,
    width: 80,
    height: 50,
    marginLeft: 20,
  },
  icons2: {
    marginTop: 10,
    width: 30,
    height: 30,
  },
});

function mapStateToProps(state) {
	return {
		subscription: state.subscription
	};
}

function mapDispatchToProps(dispatch) {
	return {
		SubscriptionAction: bindActionCreators(SubscriptionAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);

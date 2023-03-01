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
    Dimensions,
    TextInput
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ProductAction from '../actions/ProductAction';

class Menu extends React.Component {
  constructor(props){
    super(props);
     this.state = {
       data: []
     }
    this.arrayHolder = [];
  }

  componentDidMount() {
      this._callValidAction();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.products !== this.props.products){
      this.setState({
        data: nextProps.products
      });
    }
  }

  _callValidAction = () => {
    const cat_id = this.props.navigation.state.params.cat_id;
    if(cat_id===1) {
      this.props.ProductAction.getAllMiniMeals();
    } else if(cat_id===2) {
      this.props.ProductAction.getAllFullMeals();
    } else if (cat_id===3) {
      this.props.ProductAction.getAllVegMeals();
    } else if(cat_id===4) {
      this.props.ProductAction.getAllNonVegMeals();
    } else if(cat_id===5) {
      this.props.ProductAction.getAllSpecials();
    } else if(cat_id===6) {
      this.props.ProductAction.getAllSweets();
    }
  }

  _renderHeader = () => {
      return (
        <View>
          <View style={{paddingTop: 20}}>
          </View>
          <SearchBar
            placeholder="What's your stomach craving today?"
            lightTheme
            round
            platform= {Platform.OS}
            clearIcon={true}
            onChangeText={text => this._searchFilterFunction(text)}
            cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            autoCorrect={false}
            containerStyle={{backgroundColor: '#fff'}}
            inputStyle={{backgroundColor: '#fff', paddingLeft: 30}}
          />
        </View>
      );
    };

  _renderSeparator = () => {
    return (
       <View
         style={{
           height: Platform.OS === 'ios' ? 1 : 0,
           width: '100%',
           backgroundColor: '#CED0CE',
         }}
       />
     );
  };

  _searchFilterFunction = text => {
     const newData = this.arrayHolder.filter(item => {
       const itemData = `${item.name.toUpperCase()}`;
       const textData = text.toUpperCase();
       return itemData.indexOf(textData) > -1;
     });
      this.setState({
          data: newData
      })
   }

  _keyExtractor = (item, index) => item.id.toString();

  render(){
    const { navigate } = this.props.navigation;
    const cat_id = this.props.navigation.state.params.cat_id;
    this.arrayHolder = this.props.products;
    const Items = <FlatList contentContainerStyle={styles.list} numColumns={1}
        data={this.state.data}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) =>
            <View style={styles.productContainer} >
              <Image style={styles.image} source={{uri: item.images[0].src}} />
              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.text}> {item.name} </Text>
                <Text style={{marginLeft: 15, fontSize: 14, color: '#546e7a'}}>Pramila's kitchen</Text>
                <View style={{paddingTop: 20}}></View>
                <View style={{flex:1, flexDirection: 'row'}}>
                  <Text style={{marginLeft: 15, fontSize: 14, color: 'black'}}> ₹ {item.price}</Text>
                  <TouchableHighlight style={styles.button} onPress={() => navigate('Product', {product: item, cat_id: cat_id})}>
                    <Text>Add</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
        }
        ItemSeparatorComponent={this._renderSeparator}
        ListHeaderComponent={this._renderHeader}
      />
      
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
            {this.props.products.length ? Items :
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <LottieView
                  source='cooking.json'
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
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1
  },
  loader: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  image: {
    width: 80,
    height: 80
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black'
  },
  button: {
  flex: 1,
  backgroundColor: '#ff77a9',
  padding: 5,
  alignItems: 'flex-end'
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
		products: state.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ProductAction: bindActionCreators(ProductAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

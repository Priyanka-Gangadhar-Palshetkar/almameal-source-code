import React from 'react';
import { View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'navigationbar-react-native';

import Colors from '../constants/Colors';

export default class Home extends React.Component {
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style = {styles.outerContainer}>
        <NavigationBar
          navigationBarStyle= {{ backgroundColor: Colors.primaryColor }}
          statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: Colors.primaryDarkColor }}
          componentRight = {
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 15 }}>
              <Icon name="mobile" size={24} color='#fff' onPress={() => this.props.navigation.navigate("Contact")} />
            </View>
          }
          componentLeft = {
            <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 15 }}>
              <TouchableOpacity>
                <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>AUNDH</Text>
              </TouchableOpacity>
            </View>
          }
        />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
            <Text style={styles.headerText1}>Missing Ghar Ka Khana?</Text>
            <Text style={styles.bodyText}>Order delicious homemade meals now.</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollviewContainer}>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 1})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/imgg.jpg')}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 2})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/img2.jpg')}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 3})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/img3.jpg')}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 4})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/imgg.jpg')}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 5})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/img2.jpg')}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 6})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/img3.jpg')}/>
              </TouchableHighlight>
            </ScrollView>
            <Text style={styles.headerText2}>Too lazy to order everyday?</Text>
            <Text style={styles.bodyText}>Subscribe to our monthly plans now.</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollviewContainer}>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 1})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/imgg.jpg')}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 2})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/img2.jpg')}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigate('Menu', {cat_id: 3})} underlayColor= "white">
                <Image style={styles.squareImage} source={require('../images/img3.jpg')}/>
              </TouchableHighlight>
            </ScrollView>
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white'
  },
  innerContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  scrollviewContainer: {
    paddingBottom:15
  },
  headerText1: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    letterSpacing: 0.15,
  },
  headerText2: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.15,
    color: 'black'
  },
  bodyText: {
    fontSize: 16,
    paddingBottom: 15,
    letterSpacing: 0.15,
  },
  squareImage: {
    width: 225,
    height: 225,
    marginRight: 15
  },
  rectangularImage: {
    width: 330,
    height: 200,
    marginBottom: 15
  }
});

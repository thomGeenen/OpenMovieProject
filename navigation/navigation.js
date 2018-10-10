import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import { Image, StyleSheet } from 'react-native';
import Search from '../components/Search';
import MovieDetails from '../components/MovieDetails';
import Favorites from '../components/Favorite';
import Test from '../components/Test';
import React, { Component } from 'react';
import { Text } from 'react-native';


const SearchStackNav = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    MovieDetails: {
        screen: MovieDetails, 
        navigationOptions: {
            title: "MovieDetails"
        }
    }
});

const favoriteStackNav = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: "Favoris"
        }
    },
    MovieDetails: {
        screen: MovieDetails,
        navigationOptions: {
            title: "MovieDetails"
        }
    }
})


const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNav,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                        source={require('../assets/search_icon.png')}
                        style={styles.icon} />
            }
        }
    },
    Favorites: {
        screen: favoriteStackNav,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image 
                        source={require('../assets/fullfiled_heart.png')}
                        style={styles.icon} />
            }
        }
    },
    Test: {
        screen: Test,
        navigationOptions: {
            tabBarIcon: () => {
                <Text>Test</Text>
            }
        }
    }
}, {
    tabBarOptions: {
        activeBackgroundColor: "#DDDDDD",
        inactiveBackgroundColor: "#ffffff",
        showIcon: true,
        showLabel: true
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default MoviesTabNavigator;
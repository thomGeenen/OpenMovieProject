//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Easing, PanResponder, Dimensions } from 'react-native';

// create a component
class Test extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topPosition: new Animated.Value(0),
            leftPosition: new Animated.Value(0)
        }

        const {height, width} = Dimensions.get("window");
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderMove: (event, gestureState) => {
                let touches = event.nativeEvent.touches;
                
                if(touches.length === 1) {
                    this.setState({
                        topPosition: touches[0].pageY - height/2,
                        leftPosition: touches[0].pageX - width/2
                    })
                }
            }
        })
    }

    
    render() {
        return (
            <View style={styles.main_container}>
                <View
                {...this.panResponder.panHandlers}
                style={[styles.animation_view, {top: this.state.topPosition, left: this.state.leftPosition}]}>
                
                </View>
            </View>
        );
    }

    // componentDidMount() {
    //     Animated.sequence([
    //         Animated.spring(
    //             this.state.topPosition,
    //             {
    //             toValue: 100,
    //             tension: 8,
    //             friction: 3
    //             }
    //         ),
    //         Animated.timing(
    //             this.state.leftPosition,
    //             {
    //             toValue: 100,
    //             duration: 1000,
    //             easing: Easing.elastic(2)
    //             }
    //         )]).start();
    // }
}

// define your styles
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
   animation_view: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
});

//make this component available to the app
export default Test;

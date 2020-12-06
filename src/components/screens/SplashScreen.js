import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, Image } from 'react-native'

var bk = require('./assets/images/bk1.jpg')
var logo = require('./assets/images/logo.png')

export default class SplashScreen extends Component {
    constructor(props) {
        super(props)
        setTimeout(() => {
            this.props.navigation.navigate("Login")
        }, 3000);

    }

    render() {
        return (
            <ImageBackground
                source={bk}
                style={{ width: '100%', height: '100%' }}
            >
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Image
                        source={logo}
                        style={{ height: 80, width: 80 }}
                    >

                    </Image>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({})

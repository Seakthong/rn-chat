import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Button } from 'native-base'
import LoginRequest from '../../network/login'
import {getUser} from '../../network/user'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          email: 'first@mail.com',
          password: '123123123',
        };
      }

onLogin() {
    // if(this.state.username=='123' && this.state.password=='123'){
    //     this.props.navigation.navigate("Home")
    // }
    
        // Keyboard.dismiss();
        if (!this.state.email) {
          alert("Email is required");
        } else if (!this.state.password) {
          alert("Password is required");
        } else {
          LoginRequest(this.state.email, this.state.password)
            .then((res) => {
                this.props.navigation.navigate("HomePage",{myId : res.user.uid})

            //   if (!res.additionalUserInfo) {
                // dispatchLoaderAction({
                //   type: LOADING_STOP,
                // });
            //     alert(res);
            //     return;
            //   }
            //   setAsyncStorage(keys.uuid, res.user.uid);
            //   setUniqueValue(res.user.uid);
            //   dispatchLoaderAction({
            //     type: LOADING_STOP,
            //   });
            //   setInitialState();
            //   navigation.navigate("Dashboard");
            })
            .catch((err) => {
            //   dispatchLoaderAction({
            //     type: LOADING_STOP,
            //   });
              alert(err);
            });
      };
}

onSignUp(){
    this.props.navigation.navigate("Signup")
}

    render() {
        return (
            <TouchableWithoutFeedback
                onPress = {()=> Keyboard.dismiss()}
            >
                <View style={styles.container}>
                <View style>
                    <Text style={styles.inputext}> HOLY </Text>
                </View>
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder='Email...'
                    placeholderTextColor ='white'
                    style={styles.input}
                    returnKeyType = "go"
                    autoCapitalize = {false}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder='Password...'
                    placeholderTextColor ='white'
                    secureTextEntry={true}
                    style={styles.input}
                    returnKeyType = "done"
                    onSubmitEditing = {()=>this.onLogin()}
                />

                <Button full style={styles.btnStyle} danger
                onPress={()=>this.onLogin()}
                >
                    <Text style={{color: 'white', fontWeight: "bold"}}>LOGIN</Text>
                </Button>

                <Button full style={styles.btnStyle} danger
                onPress={()=>this.onSignUp()}
                >
                    <Text style={{color: 'white', fontWeight: "bold"}}>SIGN UP</Text>
                </Button>

            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 45
    },
    input: {
        // width: 200,
        // height: 44,
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: 'black',
        color : 'white'
    },
    inputext: {
        width: '100%',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#f05454',
        textAlign: "center",
        alignContent: "center",
        marginBottom : 30
    },
    btnStyle : {
        marginTop : 30,
        borderRadius : 20,
    }
})

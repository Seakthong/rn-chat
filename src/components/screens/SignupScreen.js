import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button, Form } from 'native-base'
import firebase from "../../firebase/config";
import SignUpRequest from '../../network/signUp'
import {AddUser} from '../../network/user'

// require('firebase/auth')


export default class SignupScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }

    onSignup() {
        // Keyboard.dismiss();
        if (!this.state.username) {
            alert("Name is required");
        } else if (!this.state.email) {
            alert("Email is required");
        } else if (!this.state.password) {
            alert("Password is required");
        } else {
            SignUpRequest(this.state.email, this.state.password)
                .then((res) => {
                    console.log(res)
                    if (!res.additionalUserInfo) {
                        alert(res);
                        return;
                    }
                    let uid = firebase.auth().currentUser.uid;
                    // let uid = firebase
                    let profileImg = "";
                    AddUser(this.state.username, this.state.email, uid, profileImg)
                        .then(() => {
                            // setAsyncStorage(keys.uuid, uid);
                            // setUniqueValue(uid);
                            // dispatchLoaderAction({
                            //     type: LOADING_STOP,
                            // });
                            // navigation.replace("Dashboard");
                        })
                        .catch((err) => {
                            console.log(err)
                            alert(err);
                        });
                })
                .catch((err) => {
                    alert(err);
                });
        }

        // console.log(this.state.email);
    }

    onBack() {
        this.props.navigation.navigate("Login")
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.container}>
                    <View style>
                        <Text style={styles.inputext}> Register </Text>
                    </View>

                    <TextInput
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder='Full name ...'
                        placeholderTextColor='white'
                        style={styles.input}
                        returnKeyType="go"
                    />
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder='Email...'
                        placeholderTextColor='white'
                        style={styles.input}
                        returnKeyType="go"
                        autoCapitalize = {false}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder='Password...'
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        style={styles.input}
                        returnKeyType="done"
                        onSubmitEditing={() => this.onSignup()}
                    />

                    <Button full style={styles.btnStyle} danger
                        onPress={() => this.onSignup()}
                    >
                        <Text style={{ color: 'white', fontWeight: "bold" }}>REGISTER</Text>
                    </Button>

                    <Button full style={styles.btnStyle} danger
                        onPress={() => this.onBack()}
                    >
                        <Text style={{ color: 'white', fontWeight: "bold" }}>BACK TO LOGIN</Text>
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
        color: 'white'
    },
    inputext: {
        width: '100%',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#f05454',
        textAlign: "center",
        alignContent: "center",
        marginBottom: 30
    },
    btnStyle: {
        marginTop: 30,
        borderRadius: 20,
    }
})

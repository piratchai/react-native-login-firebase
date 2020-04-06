import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import UserService from './Service/Users.service';
import Spinner from 'react-native-loading-spinner-overlay';

export default class HomeScreen extends Component {
    userService = new UserService();

    state = {
        username: '',
        password: '',
        spinner: false
    }

    componentDidMount(){
        //this.getUser().then(value => console.log(value));
    }

    async login(){
        this.setState({
            spinner: true,
        });
        let users = [];
        await this.getUser().then(value => users = value);

        let userFound = users.find((element) => {
            return element.username.toUpperCase() == this.state.username.toUpperCase() && element.password == this.state.password
        })

        if(userFound != undefined){
            this.setState({
                spinner: false,
            });
            this.props.navigation.navigate('User');
        }
        else{
            this.setState({
                spinner: false,
            });
            return;
        }
    }

    async getUser(){
        let users = [];
        await this.userService.getUsers().then(value => users = value);
        return users;
    }

    render(){
        return(
            <View style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{color: 'white'}}
                />
                <Text>This is the Home Screen.</Text>
                <TextInput 
                    style={{borderWidth: 1, width: 200, height: 30, marginBottom: 20}}
                    placeholder='username'
                    onChangeText={
                        (t)=>{
                            this.setState({
                                username: t
                            });
                        }
                    }
                />
                <TextInput 
                    style={{borderWidth: 1, width: 200, height: 30, marginBottom: 20}}
                    placeholder='password'
                    onChangeText={
                        (t)=>{
                            this.setState({
                                password: t
                            });
                        }
                    }
                />
                <Button
                    title='Go to User' 
                    onPress={() => {
                    //this.props.navigation.navigate('User');
                    this.login();
                }}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class UserScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>This is the User Screen.</Text>
                <Button
                    title='Go back' 
                    onPress={() => {
                    this.props.navigation.goBack();
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
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import {criarUsuario} from '../services/usuarioService';

export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      nome: '',
      email: '', 
      password: '',
      phone: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Insira seus dados para se inscrever!')
    } else {
      this.setState({
        isLoading: true,
      })
      criarUsuario(this.state.nome, this.state.email, this.state.password, this.state.phone).then(() =>{
        alert('Usuário registrado com sucesso!')
        this.setState({
          isLoading: false,
          nome: '',
          email: '', 
          password: '',
          phone: ''
        })
        this.props.navigation.navigate('Login')
      }) .catch(error => {
        alert("Opa, acho que alguma coisa deu errado. Refaça seu cadastrado", error.message)
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Signup' }],
        });
      })
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
        <TextInput
          style={styles.inputStyle}
          placeholder="Nome"
          value={this.state.nome}
          onChangeText={(val) => this.updateInputVal(val, 'nome')}
        />    
        <TextInput
          style={styles.inputStyle}
          placeholder="Telefone"
          value={this.state.phone}
          onChangeText={(val) => this.updateInputVal(val, 'phone')}
        />    
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Já registrado? Clique aqui para logar
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput} from 'react-native';
import {alterarUsuario} from '../services/usuarioService';
import api from '../services/api';

const Edit = ({navigation}) => {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    const alterarUser = async() => {
        const usuario = {
            email, 
            nome,
            telefone,
            senha
        }
        try {
           await alterarUsuario(usuario).then(() => {
             navigation.navigate("Home")
           })
        }catch(error) {
            console.log(error.message)
        }
    }

  return (
    <View style={styles.container}>  
      <TextInput
        style={styles.inputStyle}
        placeholder="Name"
        value={nome}
        onChangeText={(val) => setNome(val)}
      />    
      <TextInput
        style={styles.inputStyle}
        placeholder="Telefone"
        value={telefone}
        onChangeText={(val) => setTelefone(val)}
      />    
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Senha"
        value={senha}
        onChangeText={(val) => setSenha(val)}
      />
        
      <Button
        color="#3740FE"
        title="Editar Perfil"
        onPress={alterarUser}
      />                     
    </View>
    )
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

export default Edit;
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import {mostrarUsuario} from '../services/usuarioService';

const Home = ({navigation}) => {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    const handleUser = async() => {
      console.log("passou");
        try {
            const response = await mostrarUsuario()
            setUid(response.data.uid);
            setEmail(response.data.email);
            setNome(response.data.nome);
            setTelefone(response.data.telefone);
            setSenha(response.data.senha);
        }catch(error) {
            console.log(error.message)
        }
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        handleUser()
    }, [])

    useEffect(() =>{
      handleUser()
    }, [[isFocused]])

    const signOut = () => {
        navigation.navigate('Login')
    }  

    return(
            <View style={styles.container}>
              <Text style = {styles.textStyle}>
                Hello, {nome} {'\n'} 
                seu email é: {email} {'\n'}
                o seu número de telefone é: {telefone} {'\n'} 
                e a sua senha é: {senha}
              </Text>
      
              <Button
                color="#3740FE"
                title="Sair"
                onPress={signOut}
              />

              <Button
                style = {styles.btn}
                title="Editar dados"
                onPress={() => navigation.navigate('Edit')}
              ></Button>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      padding: 35,
      backgroundColor: '#fff'
    },
    textStyle: {
      fontSize: 15,
      marginBottom: 20
    },
    btn: {
      color: "#3740FE",
      paddingTop: 100,
      marginTop: 50
    }
  });

export default Home;
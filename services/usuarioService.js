import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export async function criarUsuario(nome, email, password, telefone ){
    return await api.post('/usuarios', {
        email,
        senha: password,
        nome,
        telefone
    })
}

export async function alterarUsuario(usuario) {
    const token = await getToken();
    //api.headers = { authorization: `Bearer ${token}`}
    api.defaults.headers.authorization = `Bearer ${token}`;
    return await api.put('/usuarios', usuario)
}

async function getToken(){
    return await AsyncStorage.getItem('@usuario_Token')
}

export async function mostrarUsuario(){
    const token = await getToken();
    //api.headers = { authorization: `Bearer ${token}`}
    api.defaults.headers.authorization = `Bearer ${token}`;
    return await api.get('/usuarios')
}
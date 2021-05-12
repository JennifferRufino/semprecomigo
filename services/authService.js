import api from './api';

export default async function Logar(email, password) {
    return await api.post('/login', {
        email,
        senha: password
    })
}


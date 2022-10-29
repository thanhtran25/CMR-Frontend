import axios from 'axios';
const ChangePasswordUserService = (user, token) => {
    console.log(token)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const bodyParameters = {
        ...user
    };

    return axios.put(
        'http://localhost:1912/users/me/password',
        bodyParameters,
        config,
    ).then(console.log).catch(console.log);
}

export {
    ChangePasswordUserService
};
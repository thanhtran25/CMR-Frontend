import axios from 'axios';

const loginService = (user) => {
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    const bodyParameters = {
        ...user
    };

    return axios.post(
        'http://localhost:1912/auth/signin',
        bodyParameters
    )
}
const signupService = (user) => {
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    const bodyParameters = {
        ...user
    };

    return axios.post(
        'http://localhost:1912/auth/signup',
        bodyParameters
    )
}
const forgotPasswordService = (user) => {
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    const bodyParameters = {
        ...user
    };

    return axios.post(
        'http://localhost:1912/auth/password-forgot',
        bodyParameters
    )
}
export {
    loginService,
    signupService,
    forgotPasswordService
};
import axios from 'axios';
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

export { forgotPasswordService };
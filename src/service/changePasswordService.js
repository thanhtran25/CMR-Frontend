import axios from 'axios';
const ChangePasswordService = (user) => {
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    const bodyParameters = {
        ...user
    };

    return axios.post(
        'http://localhost:1912/auth/password-reset',
        bodyParameters
    )
}

export { ChangePasswordService };
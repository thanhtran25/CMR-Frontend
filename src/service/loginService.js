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

export { loginService };
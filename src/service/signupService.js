import axios from 'axios';


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

export { signupService };
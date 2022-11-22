import request from '~/core/utils/axios';
import cookies from 'react-cookies';
const token = cookies.load('Token');
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const shippingService = async (address) => {
    const bodyParameters = {
        ...address
    };
    return await request.post(
        'bills/shipping',
        bodyParameters,
        config
    )

}
const paymentService = async (address) => {
    console.log(config)
    const bodyParameters = {
        ...address
    };
    return await request.post(
        'bills',
        bodyParameters,
        // config
    )

}
export {
    shippingService,
    paymentService
}
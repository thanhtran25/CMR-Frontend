import request from '~/core/utils/axios';
import cookies from 'react-cookies';
const token = cookies.load('Token');
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const shippingService = async (address) => {
    console.log(config)
    const bodyParameters = {
        ...address
    };

    return await request.get(
        'bills/shipping',
        bodyParameters,
        config
    )

}
export { shippingService }
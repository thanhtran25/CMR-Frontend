import request from '~/core/utils/axios';
import cookies from 'react-cookies';
const token = cookies.load('Token');
const config = {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
};
const getProductService = (product) => {
    return request.get(
        'products',
    )
}

const createProductService = (product) => {
    return request.post(
        'products',
        product,
        config,
    )
}
export { getProductService, createProductService }
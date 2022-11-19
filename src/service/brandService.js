import request from '~/core/utils/axios';
import cookies from 'react-cookies';
const token = cookies.load('Token');
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const getBrandService = (brand) => {
    return request.get(
        'brands',
    )
}

export { getBrandService }
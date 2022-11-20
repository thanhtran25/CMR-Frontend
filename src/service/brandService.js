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
const getBrandByIdService = (id) => {
    return request.get(
        'brands/' + id,
    )
}
const getBrandsService = (brand) => {
    let s = ''
    if (brand.limit) {
        s += '?limit=' + brand.limit + '';
    } else {
        s += '?limit=10';
    }
    if (brand.name && brand.name !== '') {
        s += '&name=' + brand.name + '';
    }
    if (brand.page) {
        s += '&page=' + brand.page + '';
    }
    return request.get(
        'brands/' + s,
    )
}
export { getBrandService, getBrandByIdService, getBrandsService }
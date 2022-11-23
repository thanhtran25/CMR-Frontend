import request from '~/core/utils/axios';
import cookies from 'react-cookies';


const getSalecodeService = (sale_code, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return request.get(
        'sale-codes',
        config
    )
}
const getSalecodeByIdService = (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return request.get(
        'sale-codes/' + id,
        config
    )
}
const getSalecodesService = (sale_code, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let s = ''
    if (sale_code.limit) {
        s += '?limit=' + sale_code.limit + '';
    } else {
        s += '?limit=10';
    }
    if (sale_code.name && sale_code.name !== '') {
        s += '&name=' + sale_code.name + '';
    }
    if (sale_code.page) {
        s += '&page=' + sale_code.page + '';
    }
    return request.get(
        'sale-codes/' + s,
        config
    )
}
const createSalecodeService = (sale_code, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const bodyParameters = {
        ...sale_code
    };

    return request.post(
        'sale-codes',
        bodyParameters,
        config,
    )
}

const updateSalecodeService = (sale_code, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let id = sale_code.id
    delete sale_code.id
    delete sale_code.createdAt
    delete sale_code.updatedAt
    delete sale_code.deletedAt


    const bodyParameters = {
        ...sale_code
    };
    return request.put(
        'sale-codes/' + id + '',
        bodyParameters,
        config
    )
}
const deleteSalecodeService = (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    console.log(config)
    return request.delete(
        'sale-codes/' + id + '',
        config,
    )
}
export { getSalecodeService, getSalecodeByIdService, getSalecodesService, deleteSalecodeService, updateSalecodeService, createSalecodeService }
import request from '~/core/utils/axios';
import cookies from 'react-cookies';
const token = cookies.load('Token')
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const ChangePasswordUserService = (user, token) => {


    const bodyParameters = {
        ...user
    };

    return request.put(
        'users/me/password',
        bodyParameters,
        config,
    )
}

const getUsersService = (token, users) => {
    console.log(users)
    let s = '';
    const locked = users.locked
    delete users.lock
    if (users.limit) {
        s += '?limit=' + users.limit + '';
    } else {
        s += '?limit=10';
    }
    if (users.fullname && users.fullname !== '') {
        s += '&fullname=' + users.fullname + '';
    }
    if (users.gender && users.gender !== '') {
        s += '&gender=' + users.gender + '';
    }
    if (users.address && users.address !== '') {
        s += '&address=' + users.address + '';
    }
    if (users.page) {
        s += '&page=' + users.page + '';
    }
    if (users.sort) {
        s += '&sort=' + users.sort + '';
    }
    if (users.sortBy) {
        s += '&sortBy=' + users.sortBy + '';
    }


    return request.get(
        'users/' + locked + '' + s + '',
        config
    )
}
const getUserbyIdService = (id, token) => {



    return request.get(
        'users/' + id + '',
        config,
    )
}
const createUserService = (user, token) => {


    const bodyParameters = {
        ...user
    };

    return request.post(
        'users',
        bodyParameters,
        config,
    )
}

const updateUserService = (user, token) => {
    let id = user.id
    delete user.id
    delete user.email
    delete user.role
    delete user.createdAt
    delete user.updatedAt
    delete user.deletedAt


    const bodyParameters = {
        ...user
    };
    return request.put(
        'users/' + id + '',
        bodyParameters,
        config
    )
}
const deleteUserService = (id, token) => {
    console.log(config)
    return request.delete(
        'users/' + id + '',
        config,
    )
}
const unLockUserService = (id, token) => {
    console.log(config)
    return request.put(
        'users/locked/' + id, {},
        config,
    )
}
const changePositionService = (user, id, token) => {
    const bodyParameters = {
        ...user
    };
    return request.put(
        'users/position/' + id + '',
        bodyParameters,
        config
    )
}

export {
    ChangePasswordUserService,
    getUsersService,
    createUserService,
    getUserbyIdService,
    updateUserService,
    deleteUserService,
    changePositionService,
    unLockUserService
};
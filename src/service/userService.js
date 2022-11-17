import request from '~/core/utils/axios';

const ChangePasswordUserService = (user, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

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

    let s = '';
    delete users.totalpage
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
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return request.get(
        'users' + s + '',
        config
    )
}
const getUserbyIdService = (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    return request.get(
        'users/' + id + '',
        config,
    )
}
const createUserService = (user, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

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

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
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
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return request.delete(
        'users/' + id + '',
        config,
    )
}

export {
    ChangePasswordUserService,
    getUsersService,
    createUserService,
    getUserbyIdService,
    updateUserService,
    deleteUserService
};
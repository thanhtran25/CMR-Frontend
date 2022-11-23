import request from '~/core/utils/axios';

const getBillsService = (bill, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let s = '';
    if (bill.limit) {
        s += '?limit=' + bill.limit + '';
    } else {
        s += '?limit=10';
    }
    if (bill.page) {
        s += '&page=' + bill.page + '';
    }
    if (bill.sort) {
        s += '&sort=' + bill.sort + '';
    }
    if (bill.sortBy) {
        s += '&sortBy=' + bill.sortBy + '';
    }
    if (bill.numberPhone) {
        s += '&numberPhone=' + bill.numberPhone + '';
    }


    return request.get(
        'bills' + s + '',
        config
    )
}
export {
    getBillsService
}
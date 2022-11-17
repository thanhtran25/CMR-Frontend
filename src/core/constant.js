const Roles = { ADMIN: 'admin', MANAGER: 'manager', STAFF: 'staff', CUSTOMER: 'customer' };
const Gender = { MALE: 'male', FEMALE: 'female', OTHER: 'other' };
const BillStatus = { UNPAID: 'unpaid', PAID: 'paid' };
const OrderStates = { WAITING: 'watting', SHIPPING: 'shipping', DELIVERING: 'delivering', DELIVERED: 'delivered' }
const Notify = { WARNING: '#dc3545', SUCCESS: '#28a745' }

export {
    Roles,
    Gender,
    BillStatus,
    OrderStates,
    Notify
}
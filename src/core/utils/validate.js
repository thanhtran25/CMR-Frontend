import validator from 'validator';
const validateFull = (data) => {
    const msg = {};
    if (data.email !== null && data.email !== undefined) {
        if (validator.isEmpty(data.email)) {
            msg.email = "Please input your Email"
        } else {
            if (!validator.isEmail(data.email)) {
                msg.email = "Incorrect data in email"
            }
        }
    }
    if (data.password !== null && data.password !== undefined) {
        if (validator.isEmpty(data.password)) {
            msg.password = "Please input your Password"
        }
        else {
            if (data.password.length < 8) {
                msg.password = '"password" length must be at least 8 characters'
            }
        }
    }
    if (data.fullname !== null && data.fullname !== undefined) {
        if (validator.isEmpty(data.fullname)) {
            msg.fullname = "Please input Fullname"
        }
        else {
            if (validator.isNumeric(data.fullname)) {
                msg.fullname = "Fullname is letter"
            }
        }
    }
    if (data.birthday !== null && data.birthday !== undefined) {
        if (validator.isEmpty(data.birthday)) {
            msg.birthday = "Please input birthday"
        }
    }
    if (data.address !== null && data.address !== undefined) {
        if (validator.isEmpty(data.address)) {
            msg.address = "Please input Address"
        }
    }
    if (data.gender !== null && data.gender !== undefined) {
        if (validator.isEmpty(data.gender)) {
            msg.gender = "Please input Gender"
        }
    }
    if (data.role !== null && data.role !== undefined) {
        if (validator.isEmpty(data.role)) {
            msg.role = "Please input Role"
        }
    }
    if (data.numberPhone !== null && data.numberPhone !== undefined) {
        if (validator.isEmpty(data.numberPhone)) {
            msg.numberPhone = "Please input Phone number"
        }
        else {
            if (!isVietnamesePhoneNumber(data.numberPhone)) {
                msg.numberPhone = "Incorrect Phone number"
            }
        }
    }
    if (data.confirmPassword !== null && data.confirmPassword !== undefined)
        if (validator.isEmpty(data.confirmPassword)) {
            msg.confirmPassword = "Please input your Confirm password"
        }
        else {
            if (data.password !== data.confirmPassword) {
                msg.confirmPassword = "Confirm password is not valid"
            }
        }
    if (Object.keys(msg).length > 0) return msg
    return false
}
const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}
export {
    validateFull,
    isVietnamesePhoneNumber
}
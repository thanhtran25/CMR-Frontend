import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.scss'
import { useState } from 'react'
import { signupService } from '~/service/signupService'
import { Roles, Gender } from '~/core/constant'
import { useNavigate } from "react-router-dom";
import validator from 'validator';
const Signup = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullname: "",
        birthday: "",
        address: "",
        gender: "",
        numberPhone: ""
    });
    const [confirmPassword, setCfPassword] = useState('')
    const [validate, setValidate] = useState('')
    const navigate = useNavigate();
    const confirmOnchange = e => {
        setCfPassword(
            e.target.value
        )
        console.log(confirmPassword)
    }
    const handleChange = e => {
        const value = e.target.value;

        setUser({
            ...user,
            [e.target.name]: value
        });
        console.log(user)
    };
    const handleChangeOnclik = async () => {
        const isValid = validateAll()
        if (!isValid) return
        try {
            await signupService(user);
            alert("Signup Success")
            navigate('/Login')
        } catch (e) {
            if (e.response.data.error) {
                const msg = {}
                msg.email = e.response.data.error
                setValidate(msg)
            }
        }
    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(user.email)) {
            msg.email = "Please input your Email"
        }
        else {
            if (!validator.isEmail(user.email)) {
                msg.email = "Incorrect data in email"
            }
        }
        if (validator.isEmpty(user.fullname)) {
            msg.fullname = "Please input your Fullname"
        }
        else {
            if (validator.isNumeric(user.fullname)) {
                msg.fullname = "Fullname is letter"
            }
        }
        if (validator.isEmpty(user.password)) {
            msg.password = "Please input your Password"
        }
        else {
            if (user.password.length < 8) {
                msg.password = '"password" length must be at least 8 characters'
            }
        }
        if (validator.isEmpty(confirmPassword)) {
            msg.confirmPassword = "Please input your Confirm password"
        }
        else {
            if (user.password !== confirmPassword) {
                msg.confirmPassword = "Confirm password is not valid"
            }
        }
        if (validator.isEmpty(user.birthday)) {
            msg.birthday = "Please input your birthday"
        }
        if (validator.isEmpty(user.address)) {
            msg.address = "Please input your Address"
        }
        if (validator.isEmpty(user.gender)) {
            msg.gender = "Please input your Gender"
        }
        if (validator.isEmpty(user.numberPhone)) {
            msg.numberPhone = "Please input your Phone number"
        }
        else {
            if (!isVietnamesePhoneNumber(user.numberPhone)) {
                msg.numberPhone = "Incorrect Phone number"
            }
        }
        if (validator.isEmpty(user.gender)) {
            msg.gender = "Please input your Gender"
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const isVietnamesePhoneNumber = (number) => {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
    }
    return (
        <div className="bodySignup">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                            <div className="card-img-left d-none d-md-flex">

                            </div>
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
                                <form>

                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" value={user.fullname} onChange={handleChange} name="fullname" id="exampleInputEmail1" placeholder="myusername" required autofocus />
                                        <label htmlFor="floatingInputUsername">Fullname</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.fullname}</p>
                                    </div>

                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} id="floatingInputEmail" placeholder="name@example.com" />
                                        <label htmlFor="floatingInputEmail">Email address</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.email}</p>
                                    </div>



                                    <div className="form-floating mb-2">
                                        <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} id="floatingPassword" placeholder="Password" />
                                        <label htmlFor="floatingPassword">Password</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.password}</p>
                                    </div>

                                    <div className="form-floating mb-2">
                                        <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={confirmOnchange} id="floatingPasswordConfirm" placeholder="Confirm Password" />
                                        <label htmlFor="floatingPasswordConfirm">Confirm Password</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.confirmPassword}</p>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} id="floatingInputUsername" placeholder="myusername" required autofocus />
                                        <label htmlFor="floatingInputUsername">Address</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.address}</p>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" name="numberPhone" value={user.numberPhone} onChange={handleChange} id="floatingInputUsername" placeholder="myusername" required autofocus />
                                        <label htmlFor="floatingInputUsername">Phone Number</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.numberPhone}</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-7 form-floating mb-2">
                                                    <input type="date" className="form-control" name="birthday" value={user.birthday} onChange={handleChange} id="floatingInputBirthday" placeholder="myusername" required autofocus />
                                                    <label htmlFor="floatingInputUsername">Birthday</label>
                                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.birthday}</p>
                                                </div>
                                                <div className="col-5">
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" onChange={handleChange} value={Gender.MALE} />
                                                        <label className="form-check-label" htmlFor="inlineRadio1">{Gender.MALE}</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" onChange={handleChange} value={Gender.FEMALE} />
                                                        <label className="form-check-label" htmlFor="inlineRadio2">{Gender.FEMALE}</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="inlineRadio3" onChange={handleChange} value={Gender.OTHER} />
                                                        <label className="form-check-label" htmlFor="inlineRadio3">{Gender.OTHER}</label>
                                                    </div>
                                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.gender}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-grid mb-2">
                                        <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick={handleChangeOnclik} type="button">Register</button>
                                    </div>

                                    <a className="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Signup;
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.scss'
import { useState } from 'react'
import { signupService, requestOtpService } from '~/service/authService'
import { Gender } from '~/core/constant'
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { validateFull } from '~/core/utils/validate';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Notify } from '~/core/constant';
import { handelNotify } from '~/core/utils/req';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        fullname: "",
        birthday: "",
        address: "",
        gender: "",
        numberPhone: "",
        confirmPassword: ""
    });
    const [showAlertCf, setShowAlertCf] = useState(false);
    const [validate, setValidate] = useState('')
    const navigate = useNavigate();
    const handleChange = e => {
        const value = e.target.value;

        setUser({
            ...user,
            [e.target.name]: value
        });
        console.log(user)
    };
    const handleChangeOnclik = async () => {
        const isValid = validateFull(user)
        setValidate(isValid)
        if (Object.keys(isValid).length > 0) return
        try {
            const email = {
                email: user.email
            }
            await signupService(user);
            await requestOtpService(email)
            sessionStorage.setItem('emailUser', email.email)
            setShowAlertCf({
                open: true,
                variant: Notify.SUCCESS,
                text: 'Mã xác nhận email đã được gửi vào tài khoản của bạn',
                title: 'Đăng ký thành công',
                backdrop: 'static',
                onClick: () => handleSwitchPage()
            })
        } catch (e) {
            if (e.response.data.error) {
                handelNotify('error', e.response.data.error)
            }
        }
    }
    const handleSwitchPage = () => {
        navigate('/signup/requestOTP')
    }
    const handleOnclickLogin = () => {
        navigate('/Login');
    }
    return (
        <>
            <Modal
                show={showAlertCf.open}
                onHide={() => setShowAlertCf({ open: false })}
                backdrop={showAlertCf.backdrop}
                keyboard={false}
            >
                <Modal.Header style={{ backgroundColor: showAlertCf.variant }} closeButton>
                    <Modal.Title>{showAlertCf.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showAlertCf.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Hủy
                    </Button>
                    <Button onClick={showAlertCf.onClick} variant="primary">OK</Button>
                </Modal.Footer>
            </Modal>
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
                                            <input type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} id="floatingPasswordConfirm" placeholder="Confirm Password" />
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
                                        <div className="d-grid mb-2">
                                            <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick={handleChangeOnclik} type="button">Register</button>
                                        </div>

                                        <a onClick={handleOnclickLogin} className="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Signup;
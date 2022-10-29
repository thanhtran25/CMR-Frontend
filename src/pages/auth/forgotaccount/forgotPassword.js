import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './forgotPassword.scss'
import validator from 'validator';
import { useState } from 'react';
import { forgotPasswordService } from '~/service/authService';
const Forgotpassword = () => {
    const [email, setEmail] = useState({
        email: ""
    });
    const [validate, setValidate] = useState('')
    const handleChange = e => {
        const value = e.target.value;
        setEmail({
            ...email,
            [e.target.name]: value
        });
    };
    const requireOnclick = async () => {
        const isValid = validateAll()
        if (!isValid) return
        try {
            let response = await forgotPasswordService(email.email);
            console.log(response);
        } catch (e) {

        }
    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(email.email)) {
            msg.email = "Please input your Email"
        } else {
            if (!validator.isEmail(email.email)) {
                msg.email = "Incorrect data in email"
            }
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    return (
        <div className="body-forgot">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Tìm lại tài khoản</h5>
                                <form>
                                    <div className='d-grid'>
                                        <label>
                                            Vui lòng nhập email bạn đã đăng ký để tìm kiếm tài khoản.
                                        </label>
                                    </div>
                                    <div className="form-floating mb-3 mt-2">
                                        <input onChange={handleChange} type="email" name='email' className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">Email address:</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.email}</p>
                                    </div>
                                    <div className="forgotbutton">
                                        <div>
                                            <button className="mt-2 btn btn-primary" type="button" onClick={requireOnclick}>Yêu cầu</button>
                                        </div>
                                        <div>
                                            <button className="m-2 btn btn-secondary" type="submit">Hủy</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword;
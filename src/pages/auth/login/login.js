import 'bootstrap/dist/css/bootstrap.min.css';
import './login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react'
import { loginService } from '../../../service/loginService'
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userLogin } from '~/store/action/userAction';
import cookies from 'react-cookies'

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const [validate, setValidate] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleChange = e => {
        const value = e.target.value;

        setLogin({
            ...login,
            [e.target.name]: value
        });
    };
    const handleChangeOnclik = async () => {
        const isValid = validateAll()
        if (!isValid) return
        try {
            let response = await loginService(login);
            const data = response.data;
            console.log(data)

            cookies.save("accessToken", data.accessToken)
            cookies.save("user", data.information)
            dispatch(userLogin(data.information))
            navigate('/');
        } catch (e) {
            if (e.response.data.error[0].field) {
                alert(e.response.data.error[0].message)
            }
            else {
                alert(e.response.data.error)
            }
            console.log(e)
        }
    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(login.email)) {
            msg.email = "Please input your Email"
        } else {
            if (!validator.isEmail(login.email)) {
                msg.email = "Incorrect data in email"
            }
        }

        if (validator.isEmpty(login.password)) {
            msg.password = "Please input your Password"
        }
        else {
            if (login.password.length < 8) {
                msg.password = '"password" length must be at least 8 characters'
            }
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    return (

        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <form>
                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" name="email" onChange={handleChange} id="floatingInput" placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">Email address:</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.email}</p>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" name="password" onChange={handleChange} id="floatingPassword" placeholder="Password" />
                                        <label htmlFor="floatingPassword">Password:</label>
                                        <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.password}</p>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                            Remember password
                                        </label>
                                    </div>
                                    <div className='d-grid'>
                                        <label>
                                            Forgot password
                                        </label>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" onClick={handleChangeOnclik} type="button">Sign
                                            in</button>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="d-grid mb-2">
                                        <button className="btn btn-google btn-login text-uppercase fw-bold" onClick={handleChangeOnclik} type="button">
                                            <FontAwesomeIcon icon={faGooglePlusG} className='fa-icon' />
                                            Sign in With Google account
                                        </button>
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

export default Login;
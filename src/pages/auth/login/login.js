import 'bootstrap/dist/css/bootstrap.min.css';
import './login.scss'

import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react'
import { loginService } from '../../../service/authService'
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userLogin } from '~/store/action/userAction';
import { Link } from 'react-router-dom';
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
    const handleOnclick = async (e) => {
        e.preventDefault();
        const toastOptions = {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }
        const isValid = validateAll()
        if (!isValid) return
        try {

            let response = await loginService(login);
            const data = response && response.data ? response.data : '';
            if (data.information.role !== 'customer') {
                toast.error('Đăng nhập thất bại', toastOptions)
            } else {
                cookies.save("Token", data.accessToken)
                cookies.save("user", data.information)
                dispatch(userLogin(data.information))
                navigate('/');
            }
        } catch (e) {
            if (e.response.data.error && Array.isArray(e.response.data.error) && e.response.data.error[0] && e.response.data.error[0].field) {
                toast.error(e.response.data.error[0].message, toastOptions)
            }
            else {
                const message = e.response.data.error === 'Email or password is incorrect' ? 'Email hoặc mật khẩu không chính xác' : e.response.data.error
                toast.error(message, toastOptions)
            }
        }
    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(login.email)) {
            msg.email = "Vui lòng nhập email"
        } else {
            if (!validator.isEmail(login.email)) {
                msg.email = "Email không hợp lệ"
            }
        }

        if (validator.isEmpty(login.password)) {
            msg.password = "Vui lòng nhập mật khẩu"
        }
        else {
            if (login.password.length < 8) {
                msg.password = 'Mật khẩu phải có ít nhất 8 ký tự'
            }
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const handleOnclickGg = () => {
        window.location = `${process.env.REACT_APP_SERVER_URL}/auth/google/login`;
    }
    return (
        <>
            <ToastContainer />
            <div class="container" style={{ paddingTop: '80px' }}>
                <div class="row m-5 no-gutters shadow-lg login-form">
                    <div class="col-md-6 d-none d-md-block">
                        <img src={require('~/assets/images/login-banner.jpg')} class="img-fluid" style={{ minHeight: '100%' }} alt='' />
                    </div>
                    <div class="col-md-6 bg-white p-5">
                        <h2 class="pb-3 fw-bold">Đăng nhập</h2>
                        <div class="form-style">
                            <form onSubmit={handleOnclick}>
                                <div class="form-group pb-3">
                                    <input type="email" placeholder="Email" class="form-control" name='email' onChange={handleChange} aria-describedby="emailHelp" />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.email}</p>

                                </div>
                                <div class="form-group pb-3">
                                    <input type="password" placeholder="Mật khẩu" class="form-control" name='password' onChange={handleChange} />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.password}</p>
                                </div>
                                <div class="d-flex align-items-center justify-content-between mb-2">
                                    <div><Link class="link-primary" to='/forgotpassword'>Quên mật khẩu?</Link></div>
                                </div>
                                <div class="pb-2">
                                    <button type="submit" class="btn btn-dark w-100 font-weight-bold mt-2" >Đăng nhập</button>
                                </div>
                            </form>
                            <div class="sideline">Hoặc</div>
                            <div>
                                <button type="button" class="btn btn-danger w-100 font-weight-bold mt-2" onClick={handleOnclickGg}> <FontAwesomeIcon icon={faGooglePlusG} /> Đăng nhập với Google</button>
                            </div>
                            <div class="pt-4 text-center">
                                Hãy trở thành thành viên để nhận thêm ưu đãi <Link to='/signup'>Đăng ký</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Login;
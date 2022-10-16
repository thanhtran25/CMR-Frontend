import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import className from 'className/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareFacebook, faInstagram, faTwitter, faYoutube, faEmpire } from '@fortawesome/free-brands-svg-icons';
// import { faCameraRetro, faVideo, faWrench, faPhone } from '@fortawesome/free-solid-svg-icons';
import './login.scss'
// const cx = className.bind(styles);
const Login = () => {
    return (
        <div className="container-fluid bodyLogin">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label for="floatingInput">Email address:</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Password:</label>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                    <label className="form-check-label" for="rememberPasswordCheck">
                                        Remember password
                                    </label>
                                </div>
                                <div className='d-grid'>
                                    <label>
                                        Forgot password
                                    </label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                        in</button>
                                </div>
                                <hr className="my-4" />
                                <div className="d-grid mb-2">
                                    <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                                        <i className="fab fa-google me-2"></i> Sign in with Google
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
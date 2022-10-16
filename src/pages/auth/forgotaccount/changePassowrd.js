import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import className from 'className/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareFacebook, faInstagram, faTwitter, faYoutube, faEmpire } from '@fortawesome/free-brands-svg-icons';
// import { faCameraRetro, faVideo, faWrench, faPhone } from '@fortawesome/free-solid-svg-icons';
import './changePassword.scss'
// const cx = className.bind(styles);
const Login = () => {
    return (
        <div className="container-fluid bodyLogin">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Change Password</h5>
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label for="floatingInput">Enter Password:</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Re-enter Password:</label>
                                </div>
                                <div className="forgotbutton">
                                    <div>
                                        <button className="mt-2 btn btn-primary" type="submit">Change</button>
                                    </div>
                                    <div>
                                        <button className="m-2 btn btn-secondary" type="submit">Cancel</button>
                                    </div>
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
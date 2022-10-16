import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.scss'
// import className from 'className/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareFacebook, faInstagram, faTwitter, faYoutube, faEmpire } from '@fortawesome/free-brands-svg-icons';
// import { faCameraRetro, faVideo, faWrench, faPhone } from '@fortawesome/free-solid-svg-icons';
// import styles from './login.scss';
// const cx = className.bind(styles);
const Signup = () => {
    return (
        <div className="container-fulid bodySignup">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                        <div className="card-img-left d-none d-md-flex">

                        </div>
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
                            <form>

                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="myusername" required autofocus />
                                    <label for="floatingInputUsername">Fullname</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                                    <label for="floatingInputEmail">Email address</label>
                                </div>



                                <div className="form-floating mb-2">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password" />
                                    <label for="floatingPasswordConfirm">Confirm Password</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="floatingInputUsername" placeholder="myusername" required autofocus />
                                    <label for="floatingInputUsername">Phone Number</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="date" className="form-control" id="floatingInputBirthday" placeholder="myusername" required autofocus />
                                    <label for="floatingInputUsername">Birthday</label>
                                </div>
                                <div className="d-grid mb-2">
                                    <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
                                </div>

                                <a className="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>

                                <hr className="my-4" />

                                <div className="d-grid mb-2">
                                    <button className="btn btn-lg btn-google btn-login fw-bold text-uppercase" type="submit">
                                        <i className="fab fa-google me-2"></i> Sign up with Google
                                    </button>
                                </div>

                                <div className="d-grid">
                                    <button className="btn btn-lg btn-facebook btn-login fw-bold text-uppercase" type="submit">
                                        <i className="fab fa-facebook-f me-2"></i> Sign up with Facebook
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

export default Signup;
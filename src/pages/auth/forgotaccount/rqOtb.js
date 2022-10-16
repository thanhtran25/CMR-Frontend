import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import className from 'className/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareFacebook, faInstagram, faTwitter, faYoutube, faEmpire } from '@fortawesome/free-brands-svg-icons';
// import { faCameraRetro, faVideo, faWrench, faPhone } from '@fortawesome/free-solid-svg-icons';
import './rqOtb.scss'
// const cx = className.bind(styles);
const Rqotb = () => {
    return (
        <div className="container-fulid body-rqotp">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Find your account</h5>
                            <form>
                                <div className='d-grid'>
                                    <label>
                                        Vui lòng kiểm tra mã trong email của bạn. Mã này gồm 6 số.
                                    </label>
                                </div>
                                <div className="form-floating mb-2 mt-2">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label for="floatingInput">Enter the code:</label>
                                </div>
                                <div className="forgotbutton">
                                    <div>
                                        <button className="mt-2 btn btn-primary" type="submit">Request</button>
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

export default Rqotb;
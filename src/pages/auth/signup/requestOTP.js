import 'bootstrap/dist/css/bootstrap.min.css';
import './requestOTP.scss'
import validator from 'validator';
import { useState } from 'react';
import { OtpComfirmService } from '~/service/authService';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestOtpService } from '~/service/authService'
const RequestOTP = () => {
    const navigate = useNavigate();
    const email = sessionStorage.getItem('emailUser');
    const [otp, setotp] = useState({
        otp: "",
        email: email
    });
    const [time, setTime] = useState(false)
    const [showAlertCf, setShowAlertCf] = useState(false);
    const [validate, setValidate] = useState('')
    const handleChange = e => {
        const value = e.target.value;
        setotp({
            ...otp,
            [e.target.name]: value
        });
    };
    const handleConfirm = async () => {
        const isValid = validateAll()
        if (!isValid) return
        try {
            let response = await OtpComfirmService(otp);
            console.log(otp);
        } catch (e) {
            console.log(e);
        }
    }
    const handleRequire = async (e) => {
        e.currentTarget.disabled = true;
        try {
            const email1 = {
                email: email
            }
            await requestOtpService(email1)
        } catch (error) {

        }
        setTimeout(() => {
            e.currentTarget.disabled = false;
            console.log(e)
        }, 10000);
    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(otp.otp)) {
            msg.otp = "Please input your otp"
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const handleOnclickLogin = () => {
        navigate('/login');
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
            <div className="body-forgot">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card border-0 shadow rounded-3 my-5">
                                <div className="card-body p-4 p-sm-5">
                                    <h5 className="card-title text-center mb-5 fw-light fs-5">Nhập mã bảo mật</h5>
                                    <form>
                                        <div className='d-grid'>
                                            <label>
                                                Chúng tôi đã gửi mã OTP gồm 6 số về email của quý khách vui lòng kiểm tra và xác nhận
                                            </label>
                                        </div>
                                        <div className="form-floating mb-3 mt-2">
                                            <input onChange={handleChange} type="email" name='otp' value={otp.otp} className="form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">Nhập mã OTP:</label>
                                            <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.otp}</p>
                                        </div>
                                        <div className="forgotbutton">
                                            <div>
                                                <button className="mt-2 btn btn-primary" type="button" onClick={handleConfirm}>Xác nhận</button>
                                            </div>
                                            <div>
                                                <button onClick={handleRequire} className="m-2 btn btn-secondary" type="button">Yêu cầu lại</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default RequestOTP;
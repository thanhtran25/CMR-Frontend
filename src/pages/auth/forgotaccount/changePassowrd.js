import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useParams } from 'react-router-dom';
import { ChangePasswordService } from '~/service/authService';
import { useState } from 'react';
import validator from 'validator';
const Login = () => {

    const { uid, token } = useParams();
    const [change, setChange] = useState({
        id: uid,
        password: "",
        token: token
    });
    const [pass, setPass] = useState({
        repassword: ""
    });
    const [validate, setValidate] = useState('')
    const handleChangeRepassword = e => {
        const value = e.target.value;

        setPass({
            ...pass,
            [e.target.name]: value
        });
    }
    const handleChangePassword = e => {
        const value = e.target.value;

        setChange({
            ...change,
            [e.target.name]: value
        });
    }
    const handleOnclick = async () => {
        const isValid = validateAll()
        if (!isValid) return
        try {
            let response = await ChangePasswordService(change);
            console.log(response);
        } catch (e) {

        }
    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(change.password)) {
            msg.password = "Please input your Password"
        }
        if (validator.isEmpty(pass.repassword)) {
            msg.repassword = "Please input your Comfirm Password"
        }
        else {
            if (change.password !== pass.repassword) {
                msg.repassword = "Confirm password is not valid"
            }
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Cập nhật lại mật khẩu</h5>
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="password" name="password" className="form-control" id="floatingInput" onChange={handleChangePassword} placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Enter Password:</label>
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.password}</p>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" name="repassword" className="form-control" id="floatingPassword" onChange={handleChangeRepassword} placeholder="Password" />
                                    <label htmlFor="floatingPassword">Re-enter Password:</label>
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.repassword}</p>
                                </div>
                                <div className="forgotbutton">
                                    <div>
                                        <button className="mt-2 btn btn-primary" onClick={handleOnclick} type="button">Change</button>
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
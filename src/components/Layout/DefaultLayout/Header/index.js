import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, NavLink } from 'react-router-dom'
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
import cookies from 'react-cookies';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '~/store/action/userAction';
import validator from 'validator';
import { ChangePasswordUserService } from '~/service/userService';
import Cartbox from '~/pages/cartbox.js/Cartbox';

function Header() {
    const user = useSelector(state => state.user.user);
    const amount = useSelector(state => state.cart.amount)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOnclickLogin = () => {
        navigate('/Login');
    }

    const wrapperRef = useRef();
    const [isOpen, setisOpen] = useState(false);
    const showBox = () => {
        setisOpen(!isOpen);
    }
    const handleOnclickLogout = () => {
        cookies.remove("Token")
        cookies.remove("user")
        cookies.remove("hasPassword")
        dispatch(userLogout());
        navigate('/');
    }
    const [show, setShow] = useState(false);
    const [validate, setValidate] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOnclickProfile = () => {
        navigate('/Profile');
    }
    const handleOnclickHistory = () => {
        navigate('/history');
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setisOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, []);

    let path = <Button onClick={handleOnclickLogin} className='col-7 col-xl-4 btn btn-warning btn-sm my-1'>Đăng Nhập</Button>;
    if (user) {
        let name = user.fullname
        if (user.fullname.length > 10) {
            name = user.fullname.substr(0, 5) + '...'
        }
        path = (<div onClick={() => showBox()} ref={wrapperRef}
            className='col-7 col-xl-3 profile-box btn btn-sm btn-warning my-1'>{name}
            <div className={isOpen === true ? 'box-profile-body' : "box-profile-body box-hiden-profile"}>
                <div className='box-content-profile'>
                    <div className='box-profile-list'>
                        <div className='box-profile-item' onClick={handleOnclickProfile}>Thông tin tài khoản</div>
                        <div className='box-profile-item' onClick={handleOnclickHistory}>
                            Lịch sử đơn hàng
                        </div>
                        <div className='box-profile-item' onClick={handleShow}>
                            Đổi mật khẩu
                        </div>
                        <div />
                        <div className='box-profile-item' onClick={handleOnclickLogout}>Đăng xuất</div>
                    </div>
                </div>
                <div className="profile-triangle"></div>
            </div>
        </div>)
    }
    const [change, setChange] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [confirmPass, setConfirmPass] = useState({
        repass: "",
    })

    const handleChangePassword = e => {
        const value = e.target.value;
        setChange({
            ...change,
            [e.target.name]: value
        });
    }
    const RePassword = e => {
        const value = e.target.value;
        setConfirmPass({
            ...confirmPass,
            [e.target.name]: value
        });
        console.log(confirmPass)
    }
    const handeClickChangePassword = async (e) => {
        e.preventDefault();
        const isValid = validateAll()
        if (!isValid) return
        try {
            let token = cookies.load('Token');
            await ChangePasswordUserService(change, token);
        } catch (e) {
            console.log(e);
        }

    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(change.currentPassword)) {
            msg.passwordcCurrent = "Please input your Current Password"
        } else {
            if (change.currentPassword < 8) {
                msg.passwordcCurrent = '"password" length must be at least 8 characters'
            }
        }

        if (validator.isEmpty(change.newPassword)) {
            msg.passwordNew = "Please input your New Password"
        }
        else {
            if (change.newPassword < 8) {
                msg.passwordNew = '"password" length must be at least 8 characters'
            }
        }
        if (validator.isEmpty(confirmPass.repass)) {
            msg.passwordConfirm = "Please input your Confirm Password"
        } else {
            if (confirmPass.repass !== change.newPassword) {
                msg.passwordConfirm = "Confirm password is incorect"
            }
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    return (
        <>
            <Modal className='ModalResetpass' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật lại mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method='PUT'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mật khẩu cũ:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="currentPassword"
                                defaultValue={change.currentPassword}
                                onChange={handleChangePassword}
                                autoFocus
                            />
                            <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.passwordcCurrent}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mật khẩu mới:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="newPassword"
                                onChange={handleChangePassword}
                                defaultValue={change.newPassword}
                                autoFocus
                            />
                            <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.passwordNew}</p>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Nhập lại mật khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="repass"
                                defaultValue={confirmPass.repass}
                                onChange={RePassword}
                                autoFocus
                            />
                            <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.passwordConfirm}</p>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit" onClick={handeClickChangePassword}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <div className='header-topbar row' >

                    <div className='header-topbar-content col-12 offset-0 col-xl-4 offset-xl-4'>
                        <NavLink to="/" style={{ textDecoration: 'none', color: 'yellow' }}>
                            <pre>

                                G O L D    D U C K    C A M E R A

                            </pre>
                        </NavLink>
                    </div>

                    <div className='col-4 col-xl-3'>
                        <div className='row'>
                            <Link className='shop-card offset-6 col-xl-1'>
                                <Cartbox></Cartbox>
                                <span className='cart-count'>{amount}</span>
                            </Link>
                            <div className='col-1'></div>
                            {path}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Header;
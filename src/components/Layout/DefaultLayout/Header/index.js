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
import { handelNotify } from '~/core/utils/req';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
    const user = useSelector(state => state.user.user);
    const amount = useSelector(state => state.cart.amount)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOnclickLogin = () => {
        navigate('/login');
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
        navigate('/Home');
    }
    const [show, setShow] = useState(false);
    const [validate, setValidate] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setChange({
            currentPassword: "",
            newPassword: ""
        })
        setConfirmPass({
            repass: "",
        })
        setValidate('')
        setShow(true)
    }

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

    let path = <Button onClick={handleOnclickLogin} className='col-7 col-xl-4 btn btn-warning btn-sm my-1'>????ng Nh???p</Button>;
    if (user) {
        let name = "";
        let arrName = user.fullname.split(' ');
        if (arrName.length < 1) {
            name = user.fullname
        } else {
            name += arrName[arrName.length - 1];
        }
        path = (<div onClick={() => showBox()} ref={wrapperRef}
            className='col-7 col-xl-3 profile-box btn btn-sm btn-warning my-1'>{name}
            <div className={isOpen === true ? 'box-profile-body' : "box-profile-body box-hiden-profile"}>
                <div className='box-content-profile'>
                    <div className='box-profile-list'>
                        <div className='box-profile-item' onClick={handleOnclickProfile}>Th??ng tin t??i kho???n</div>
                        <div className='box-profile-item' onClick={handleOnclickHistory}>
                            L???ch s??? ????n h??ng
                        </div>
                        <div className='box-profile-item' onClick={handleShow}>
                            ?????i m???t kh???u
                        </div>
                        <div />
                        <div className='box-profile-item' onClick={handleOnclickLogout}>????ng xu???t</div>
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
    }
    const handeClickChangePassword = async (e) => {
        e.preventDefault();
        const isValid = validateAll()
        if (!isValid) return
        try {
            let token = cookies.load('Token');
            await ChangePasswordUserService(change, token);
            setShow(false)
            handelNotify('success', '?????i m???t kh???u th??nh c??ng')

        } catch (e) {
            if (e.response && e.response.data.error) {
                handelNotify('error', 'M???t kh???u hi???n t???i kh??ng ????ng')
            }
        }

    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(change.currentPassword)) {
            msg.passwordcCurrent = "Vui l??ng nh???p m???t kh???u hi???n t???i c???a b???n"
        } else {
            if (change.currentPassword < 8) {
                msg.passwordcCurrent = '"????? d??i ??t nh???t 8 k?? t???'
            }
        }

        if (validator.isEmpty(change.newPassword)) {
            msg.passwordNew = "Vui l??ng nh???p m???t kh???u m???i c???a b???n"
        }
        else {
            if (change.newPassword < 8) {
                msg.passwordNew = '"????? d??i ??t nh???t 8 k?? t???'
            }
        }
        if (validator.isEmpty(confirmPass.repass)) {
            msg.passwordConfirm = "Vui l??ng nh???p x??c nh???n m???t kh???u"
        } else {
            if (confirmPass.repass !== change.newPassword) {
                msg.passwordConfirm = "X??c nh???n m???t kh???u kh??ng ch??nh x??c"
            }
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Modal className='ModalResetpass' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>C???p nh???t l???i m???t kh???u</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form method='PUT'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>M???t kh???u c??:</Form.Label>
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
                            <Form.Label>M???t kh???u m???i:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="newPassword"
                                onChange={handleChangePassword}
                                defaultValue={change.newPassword}
                            />
                            <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.passwordNew}</p>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Nh???p l???i m???t kh???u:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="repass"
                                defaultValue={confirmPass.repass}
                                onChange={RePassword}
                            />
                            <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.passwordConfirm}</p>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ????ng
                    </Button>
                    <Button variant="primary" type="submit" onClick={handeClickChangePassword}>
                        L??u
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <div className='header-topbar row' >

                    <div className='header-topbar-content col-12 offset-0 col-xl-4 offset-xl-4'>
                        <NavLink to="/Home" style={{ textDecoration: 'none', color: 'yellow' }}>
                            <pre>

                                G O L D    D U C K    C A M E R A

                            </pre>
                        </NavLink>
                    </div>

                    <div className='col-4 col-xl-3'>
                        <div className='row'>
                            <div className='shop-card offset-6 col-xl-1'>
                                <Cartbox></Cartbox>
                                <span className='cart-count'>{amount}</span>
                            </div>
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
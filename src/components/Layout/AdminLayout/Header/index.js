import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    const [showNav, setShowNav] = useState(true);

    return (
        <header className="mb-3">
            <nav className="navbar navbar-expand navbar-light" style={{ height: '60px', paddingBottom: '0px' }}>
                <div className="container-fluid">
                    <a href="#" className="burger-btn d-block">
                        <i className="bi bi-justify fs-3"></i>
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        </ul>
                        <div className="dropdown">
                            <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                {showNav ? (
                                    <div className="user-menu d-flex" onClick={() => setShowNav(false)}>
                                        <div className="user-name text-end me-3">
                                            <h6 className="mb-0 text-gray-600">Duy</h6>
                                            <p className="mb-0 text-sm text-gray-600" id="mail">duy56vn@gmail.com</p>
                                        </div>
                                        <div className="user-img d-flex align-items-center">
                                            <div className="avatar avatar-md">
                                                <img src={require('~/assets/images/logo.jpg')} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="user-menu d-flex" onClick={() => setShowNav(true)}>
                                        <div className="user-name text-end me-3">
                                            <h6 className="mb-0 text-gray-600">Duy</h6>
                                            <p className="mb-0 text-sm text-gray-600" id="mail">duy56vn@gmail.com</p>
                                        </div>
                                        <div className="user-img d-flex align-items-center">
                                            <div className="avatar avatar-md">
                                                <img src={require('~/assets/images/logo.jpg')} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </a>
                            <ul className={(!showNav ? 'show' : '') + " dropdown-menu dropdown-menu-end"} aria-labelledby="dropdownMenuButton">
                                <li>
                                    <h6 className="dropdown-header">duy56vn@gmail.com </h6>
                                </li>
                                <li stye={{ backgroundColor: '#fff !important' }}>
                                    <button className="btn-changepass" style={{ background: '#fff' }}><a id='open-change-pass-btn' className="dropdown-item" ><i className="icon-mid bi bi-key me-2"></i> Đổi mật khẩu</a></button>
                                </li>
                                <li>
                                    <button className="btn-changepass" style={{ background: '#fff' }}><a id='open-update-profile' className="dropdown-item" >
                                        <i className="icon-mid bi bi-person-circle me-2"></i> Thông tin tài khoản</a></button>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li id="logout">
                                    <a className="dropdown-item" ><i className="icon-mid bi bi-box-arrow-left me-2"></i>
                                        Đăng Xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
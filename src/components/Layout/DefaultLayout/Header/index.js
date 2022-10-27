import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom'
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
function Header() {
    let user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const handleOnclickLogin = () => {
        navigate('/Login');
    }
    let path = <Button onClick={handleOnclickLogin} variant='warning' className='col-7 col-xl-3'>Sign In</Button>;
    if (user !== undefined && user !== null) {
        let name = "";
        let arrName = user.fullname.split(' ');
        if (arrName.length < 1) {
            name = user.fullname
        } else {
            name += arrName[arrName.length - 1];
        }
        path = (<NavDropdown style={{ color: '#fff' }} title={name} id="basic-nav-dropdown" className='col-7 col-xl-3 navNav'>
            <NavDropdown.Item as={Link} to={'/Profile'}>Thông tin tài khoản</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
                Đổi mật khẩu
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.3">Đăng xuất</NavDropdown.Item>
        </NavDropdown>)

    }
    return (
        <div>
            <div className='header-topbar row pt-3 gx-0' >
                <div className='header-topbar-content col-12 col-xl-4'>
                    <pre> G O L D    D U C K    C A M E R A </pre>
                </div>

                <div className='col-7 offset-1 col-xl-5 offset-xl-0'>
                    <div className='search-bar '>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="...Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="warning">Search</Button>
                        </Form>
                    </div>
                </div>


                <div className='col-4 col-xl-3'>
                    <div className='row'>
                        <div className='col-xl-6'></div>
                        <Link className='shop-card col-1 col-xl-1'>
                            <FontAwesomeIcon icon={faBasketShopping} className='fa-icon' style={{ fontSize: '22px', color: '#999999' }} />
                            <span className='cart-count'>0</span>
                        </Link>
                        <div className='col-1 col-xl-1'></div>
                        {path}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Header;
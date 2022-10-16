import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
function Header() {
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
                    <a href='#' className='shop-card'>
                        <FontAwesomeIcon icon={faBasketShopping} className='fa-icon' style={{ fontSize: '22px', color: '#999999' }} />
                        <span className='cart-count'>0</span>
                    </a>

                    <button type='button' className='btn'>Sign In</button>
                </div>
            </div>
        </div>
    )

}

export default Header;
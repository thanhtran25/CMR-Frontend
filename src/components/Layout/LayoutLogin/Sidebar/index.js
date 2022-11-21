import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { faEmpire } from '@fortawesome/free-brands-svg-icons';
import { faCameraRetro, faVideo, faWrench, faPhone, faBars } from '@fortawesome/free-solid-svg-icons';
import './sidebar.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { choseCategories } from '~/store/action/productAction';
import { Link, NavLink } from 'react-router-dom'

function Sidebar() {
    const dispatch = useDispatch()
    const handleClickCategory = (value) => {
        let banner = ''
        if (value === 1) {
            banner = '~/assets/images/banner-1.jpg'
        }
        if (value === 2) {
            banner = '~/assets/images/banner-videocam.jpg'
        }
        if (value === 3) {
            banner = '~/assets/images/banner-phukien.jpg'
        }
        const searchPdt = {
            limit: 12,
            page: 1,
            name: '',
            brandId: '',
            categoryId: value,
            description: '',
            sortBy: '',
            sort: ''
        }
        dispatch(choseCategories(searchPdt));
    }
    return (
        <Navbar expand="lg" className='header-menu'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'yellow' }}><FontAwesomeIcon icon={faBars} className='fa-icon' style={{ marginLeft: '10px' }} /></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className='row'>
                    <Nav className="me-auto" style={{ width: '100%' }}>
                        <div className='col-xl-1'></div>
                        <Nav.Link as={Link} to="/products" onClick={(e) => handleClickCategory(1)} value='camera' className='menu-item col-xl-2' ><span><FontAwesomeIcon icon={faCameraRetro} className='fa-icon' />Máy ảnh</span></Nav.Link>
                        <Nav.Link as={Link} to="/products" onClick={(e) => handleClickCategory(2)} value='video cam' className='menu-item col-xl-2' ><span><FontAwesomeIcon icon={faVideo} className='fa-icon' />Máy Quay</span></Nav.Link>
                        <Nav.Link as={Link} to="/products" onClick={(e) => handleClickCategory(3)} value='accessories' className='menu-item col-xl-2' ><span><FontAwesomeIcon icon={faEmpire} className='fa-icon' />Phụ kiện</span></Nav.Link>
                        <Nav.Link as={Link} to="/guarantee" className='menu-item col-xl-2'><span><FontAwesomeIcon icon={faWrench} className='fa-icon' />Bảo hành</span></Nav.Link>
                        <Nav.Link as={Link} to="/contact" className='menu-item col-xl-2' ><span><FontAwesomeIcon icon={faPhone} className='fa-icon' />Liên hệ</span></Nav.Link>
                        <div className='col-xl-1'></div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Sidebar;
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { faEmpire } from '@fortawesome/free-brands-svg-icons';
import { faCameraRetro, faVideo, faWrench, faPhone, faBars } from '@fortawesome/free-solid-svg-icons';
import './sidebar.scss';

function Sidebar() {
    return (
        <Navbar expand="lg" className='header-menu'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'yellow' }}><FontAwesomeIcon icon={faBars} className='fa-icon' style={{ marginLeft: '10px' }} /></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className='row'>
                    <Nav className="me-auto" style={{ width: '100%' }}>
                        <div className='col-xl-1'></div>
                        <Nav.Link className='menu-item col-xl-2' href="#action1"><span><FontAwesomeIcon icon={faCameraRetro} className='fa-icon' />Camera</span></Nav.Link>
                        <Nav.Link className='menu-item col-xl-2' href="#action2"><span><FontAwesomeIcon icon={faVideo} className='fa-icon' />Video Cam</span></Nav.Link>
                        <Nav.Link className='menu-item col-xl-2' href="#action3"><span><FontAwesomeIcon icon={faEmpire} className='fa-icon' />Accessories</span></Nav.Link>
                        <Nav.Link className='menu-item col-xl-2' href="#action4"><span><FontAwesomeIcon icon={faWrench} className='fa-icon' />Guarantee</span></Nav.Link>
                        <Nav.Link className='menu-item col-xl-2' href="#action4"><span><FontAwesomeIcon icon={faPhone} className='fa-icon' />Contact</span></Nav.Link>
                        <div className='col-xl-1'></div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Sidebar;
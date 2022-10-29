import React from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import { Link, NavLink } from 'react-router-dom'
import './userAdmin.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSearch, faShoppingBasket, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import Header from '~/components/Layout/AdminLayout/Header';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Gender, Roles } from '~/core/constant';

function UserAdmin() {
    const [showAdd, setshowAdd] = useState(false);
    const [showRepair, setShowRepair] = useState(false);
    const [showDetail, setshowDetail] = useState(false);
    const handleClodeAdd = () => setshowAdd(false);
    const handleshowAdd = () => setshowAdd(true);
    const handleCloseRepair = () => setShowRepair(false);
    const handleShowRepair = () => setShowRepair(true);
    const handleCloseDetail = () => setshowDetail(false);
    const handleshowDetail = () => setshowDetail(true);
    const optionsGender = [
        { value: Gender.MALE, label: Gender.MALE },
        { value: Gender.FEMALE, label: Gender.FEMALE },
        { value: Gender.OTHER, label: Gender.OTHER }
    ]
    const optionsRoles = [
        { value: Roles.MANAGER, label: Roles.MANAGER },
        { value: Roles.STAFF, label: Roles.STAFF },
        { value: Roles.CUSTOMER, label: Roles.CUSTOMER }
    ]
    return (
        <>
            <Modal className='ModalThem' show={showAdd} onHide={handleClodeAdd}>
                <Modal.Header className='ModalThemHeader' closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Mật Khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="PassWord"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Họ Tên:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Họ tên"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Ngày sinh:</Form.Label>
                            <Form.Control
                                type="date"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Số điện thoại"
                                autoFocus />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Label>Quyền:</Form.Label>
                                <Select defaultValue={optionsRoles[0]} options={optionsRoles} />
                            </div>
                            <div className='col-6'>
                                <Form.Label>Giới tính:</Form.Label>
                                <Select defaultValue={optionsGender[0]} options={optionsGender} />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClodeAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClodeAdd}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal className='ModalSua' show={showRepair} onHide={handleCloseRepair}>
                <Modal.Header className='ModalSuaHeader' closeButton>
                    <Modal.Title>Sửa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                readonly
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Mật Khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="PassWord"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Họ Tên:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Họ tên"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Ngày sinh:</Form.Label>
                            <Form.Control
                                type="date"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                autoFocus />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Số điện thoại"
                                autoFocus />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Label>Giới tính:</Form.Label>
                                <Select defaultValue={optionsGender[0]} options={optionsGender} />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRepair}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseRepair}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal className='ModalChitiet' show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header className='ModalChitietHeader' closeButton>
                    <Modal.Title>Chi tiết người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ Email:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                                placeholder="name@example.com"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Họ Tên:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                                placeholder="Họ tên"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Ngày sinh:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                                placeholder="Địa chỉ"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Số điện thoại:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                                placeholder="Số điện thoại"
                            />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Label>Quyền:</Form.Label>
                                <Select defaultValue={optionsRoles[0]} options={optionsRoles} />
                            </div>
                            <div className='col-6'>
                                <Form.Label>Giới tính:</Form.Label>
                                <Select defaultValue={optionsGender[0]} options={optionsGender} />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div id="main" className="layout-navbar">
                <Header />
                <div id="main-content">
                    <div className="page-heading">
                        <div className="col-sm-6">
                            <h6>Tìm Kiếm</h6>
                            <div id="search-user-form" name="search-user-form">
                                <div className="form-group position-relative has-icon-right">
                                    <input id="serch-user-text" type="text" className="form-control" placeholder="Tìm kiếm" />
                                    <div className="form-control-icon">
                                        <i className="bi bi-search"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-title">
                            <div className="row">
                                <div className="col-12 col-md-7 order-md-1 order-last">
                                    <label>
                                        <h3>Danh sách người dùng</h3>
                                    </label>
                                    <label>
                                        <h5 style={{ marginLeft: '50px', marginRight: '10px' }}> Lọc Theo:</h5>
                                    </label>
                                    <select className="btn btn btn-primary" name="search-cbb" id="cars-search">
                                        <option>Tất Cả</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-5 order-md-2 order-first">

                                    <div className=" loat-start float-lg-end mb-3">
                                        <button id='btn-delete-user' className="btn btn-danger">
                                            <i className="bi bi-trash-fill"></i> Khóa tài khoản
                                        </button>
                                        <button onClick={handleshowDetail} id='btn-createaccount' className="btn btn-primary">
                                            <i className="bi bi-plus"></i> Thêm tài khoản
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="section">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-danger" id="table1">
                                            <thead>
                                                <tr className='table-light'>
                                                    <th>Chọn</th>
                                                    <th>Tên Đăng Nhập</th>
                                                    <th>Chức vụ</th>
                                                    <th>Tác Vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='table-info'>
                                                    <td>sda</td>
                                                    <td>sun.tpd@gmail</td>
                                                    <td>custom</td>
                                                    <td>Tác Vụ</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <nav className="mt-5">
                                            <ul id="pagination" className="pagination justify-content-center">
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div >
        </>
    )
}

export default UserAdmin;
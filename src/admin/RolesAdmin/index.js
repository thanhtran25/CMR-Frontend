import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { Link, NavLink } from 'react-router-dom'
import './rolesAdmin.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '~/components/Layout/AdminLayout/Header';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { Gender, Roles } from '~/core/constant';
import {
    getUsersService,
    getUserbyIdService,
} from '~/service/userService'
import cookies from 'react-cookies';
import { faEye, faTrash, faScrewdriverWrench, faCalendar } from '@fortawesome/free-solid-svg-icons';

function RolesAdmin() {
    let token = cookies.load('Token');
    const limit = 4;
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState();
    const [showRepair, setShowRepair] = useState(false);
    const getListUser = async () => {
        let search = { limit: limit }
        try {
            const res = await getUsersService(token, search)
            const data = (res && res.data) ? res.data : [];
            setUsers(data.users)
            console.log(data)
            let pages = Math.ceil(data.length / limit)
            console.log(pages)
        } catch (error) {
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const optionsRoles = [
        { value: Roles.ADMIN, label: Roles.ADMIN },
        { value: Roles.MANAGER, label: Roles.MANAGER },
        { value: Roles.STAFF, label: Roles.STAFF },
        { value: Roles.CUSTOMER, label: Roles.CUSTOMER }
    ]
    const [repairuser, setRepairuser] = useState({
        role: ''
    });
    const handleShowRepair = async (e) => {
        try {
            let data = await getUserbyIdService(e, token)
            setRepairuser(data.data)
        } catch (error) {

        }
        console.log(repairuser)
        setShow(true)
    };
    useEffect(() => {
        getListUser()
    }, [])
    return (
        <>
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
                                        <button id='btn-createaccount' onClick={handleShow} className="btn btn-primary">
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
                                                <tr>
                                                    <th>Chọn</th>
                                                    <th>Tài khoản email</th>
                                                    <th>Họ và tên</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Chức vụ</th>
                                                    <th>Tác Vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users && users.length > 0 &&
                                                    users.map(item => {
                                                        let s = 'table-info';
                                                        if ((users.indexOf(item) + 1) % 2 !== 0) {
                                                            s = 'table-light';
                                                        } return (
                                                            <tr className={s}>
                                                                <td>{item.id}</td>
                                                                <td className='text-break'>{item.email}</td>
                                                                <td className='text-break'>{item.fullname}</td>
                                                                <td className='text-break'>{item.numberPhone}</td>
                                                                <td className='text-break'>{item.role}</td>
                                                                <td className='text-break'>
                                                                    <pre>
                                                                        <button onClick={e => handleShowRepair(item.id)}><FontAwesomeIcon icon={faEye} className='fa-icon' /></button><span>  </span>
                                                                        <button onClick={e => handleShowRepair(item.id)}><FontAwesomeIcon icon={faScrewdriverWrench} className='fa-icon' /></button>
                                                                    </pre>
                                                                </td>
                                                            </tr>
                                                        )

                                                    })
                                                }
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
            <Modal className='ModalChitiet' show={show} onHide={handleClose}>
                <Modal.Header className='ModalChitietHeader' closeButton>
                    <Modal.Title>Chi tiết người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ Email:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                                placeholder="name@example.com"
                                defaultValue={repairuser.email}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Họ Tên:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                                placeholder="Họ tên"
                                defaultValue={repairuser.fullname}
                            />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Ngày sinh:</Form.Label>
                                    <Form.Control
                                        readonly="readonly"
                                        defaultValue={repairuser.birthday}
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Số điện thoại:</Form.Label>
                                    <Form.Control
                                        readonly="readonly"
                                        placeholder="Số điện thoại"
                                        defaultValue={repairuser.numberPhone}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                readonly="readonly"
                                placeholder="Địa chỉ"
                                defaultValue={repairuser.address}
                            />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6 mb-2'>
                                <Form.Label>Quyền:</Form.Label>
                                <Form.Control
                                    readonly="readonly"
                                    placeholder="Quyền"
                                    defaultValue={repairuser.role}
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <Form.Label>Giới tính:</Form.Label>
                                <Form.Control
                                    readonly="readonly"
                                    placeholder="Giới tính"
                                    defaultValue={repairuser.gender}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Ngày tạo:</Form.Label>
                                    <Form.Control
                                        readonly="readonly"
                                        defaultValue={repairuser.createdAt}
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Ngày cập nhật gần nhất:</Form.Label>
                                    <Form.Control
                                        readonly="readonly"
                                        placeholder="Số điện thoại"
                                        defaultValue={repairuser.updatedAt}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RolesAdmin;
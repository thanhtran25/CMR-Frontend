import React from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import './userAdmin.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Header from '~/components/Layout/AdminLayout/Header';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { Notify, Gender, Roles } from '~/core/constant';
import cookies from 'react-cookies';
import { handleError, handelNotify } from '~/core/utils/req';
import { validateFull } from '~/core/utils/validate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    getUsersService,
    createUserService,
    getUserbyIdService,
    updateUserService,
    deleteUserService
} from '~/service/userService'

function UserAdmin() {
    let token = cookies.load('Token');
    const limit = 4;
    const [showAdd, setshowAdd] = useState(false);
    const [showRepair, setShowRepair] = useState(false);
    const [showDetail, setshowDetail] = useState(false);
    const handleClodeAdd = () => setshowAdd(false);
    const handleshowAdd = () => {
        SetAddValidate('')
        setshowAdd(true)
    };
    const handleCloseDetail = () => setshowDetail(false);
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
    const [users, setUsers] = useState();
    const [adduser, setAdduser] = useState({
        email: '',
        password: '',
        fullname: '',
        birthday: '',
        address: '',
        numberPhone: '',
        role: 'manager',
        gender: 'male',
    });
    const [addValidate, SetAddValidate] = useState('');
    const [repairValidate, SetRepairValidate] = useState('');
    const [repairuser, setRepairuser] = useState('');
    const [searchUser, setSearchUser] = useState({
        limit: 4,
        page: 1,
        fullname: '',
        gender: '',
        address: '',
        sort: '',
        sortBy: ''
    });
    const [pagination, SetPagination] = useState('')
    const getListUser = async () => {
        console.log(searchUser)
        try {
            const res = await getUsersService(token, searchUser)
            const data = (res && res.data) ? res.data : [];
            SetPagination(selectPagination(data.totalPage))
            setUsers(data.users)
            console.log(pagination)
        } catch (error) {
        }
    }
    const selectPagination = (page) => {
        let content = [];
        for (let i = 1; i <= Math.ceil(page / limit); i++) {
            content.push({
                pageNumber: i
            });
        }

        return content
    }
    const handelChange = (i) => {
        setSearchUser({ ...searchUser, page: i })
        getListUser()
    }

    const handleChangeRole = (e) => {
        setAdduser({
            ...adduser,
            role: e.value
        });
        console.log(adduser)
    }
    const handleChangeGender = (e) => {
        setAdduser({
            ...adduser,
            gender: e.value
        });
        console.log(adduser)
    }
    const handleChangeAdduser = e => {
        const value = e.target.value;
        setAdduser({
            ...adduser,
            [e.target.name]: value
        });
        console.log(adduser)
    }

    const handleClickAddUser = async () => {
        const isValid = validateFull(adduser);
        SetAddValidate(isValid)
        if (Object.keys(isValid).length > 0) return
        try {
            const data = await createUserService(adduser, token)
            const req = handleError(data.request)
            console.log(data)
            handleClodeAdd()
            handelNotify('success', 'Thêm tài khoản thành công')
            setUsers(prevState => [...prevState, data.data]);
        } catch (error) {
            const req = handleError(error.request)
            handelNotify('success', req)
        }
    }
    const handleCloseRepair = () => setShowRepair(false);
    const handleShowRepair = async (e) => {
        SetRepairValidate('')
        try {
            let data = await getUserbyIdService(e, token)
            setRepairuser(data.data)
        } catch (error) {

        }
        console.log(repairuser)
        setShowRepair(true)
    };
    const handleChangeRepairuser = e => {
        const value = e.target.value
        setRepairuser({
            ...repairuser,
            [e.target.name]: value
        });

        console.log(repairuser)
    }
    const handleChangeGender1 = (e) => {
        setRepairuser({
            ...repairuser,
            gender: e.value
        });
        console.log(repairuser)
    }
    const handelShowCfRepairUser = (e) => {
        const isValid = validateFull(repairuser)
        SetRepairValidate(isValid)
        if (Object.keys(isValid).length > 0) return
        setShowAlertCf({
            open: true,
            variant: Notify.WARNING,
            text: 'Bạn có chắc chắn muốn sửa tài khoản này không?',
            title: 'Xác nhận',
            backdrop: 'static',
            onClick: () => handleClickRepairUser(e)
        })
    }
    const handleClickRepairUser = async (user) => {
        try {
            const data = await updateUserService(repairuser, token)
            const req = handleError(data.request)
            handleCloseRepair()
            setShowAlertCf({
                open: false
            })
            handelNotify('success', 'Sửa tài khoản ' + req)
            setUsers(prevState => {
                const newState = prevState.map(obj => {
                    if (obj.id === user) {
                        return {
                            ...obj,
                            fullname: repairuser.fullname,
                            birthday: repairuser.birthday,
                            address: repairuser.address,
                            numberPhone: repairuser.numberPhone,
                            gender: repairuser.gender
                        };
                    }

                    return obj;
                });

                return newState;
            });
        } catch (e) {
            const req = handleError(e.request);
            handelNotify('error', req)
        }
    }

    const [showAlertCf, setShowAlertCf] = useState({
        open: false,
        valirant: '',
        text: '',
        title: '',
        backdrop: ''
    });
    const handleshowDetail = async (e) => {
        try {
            let data = await getUserbyIdService(e, token)
            console.log(data)
            setRepairuser(data.data)
        } catch (error) {

        }
        setshowDetail(true)
    }
    const handelShowCfDelete = (e) => {
        setShowAlertCf({
            open: true,
            variant: Notify.WARNING,
            text: 'Bạn có chắc chắn muốn xóa tài khoản này không?',
            title: 'Xác nhận',
            backdrop: 'static',
            onClick: () => handelDelete(e)
        })
    }
    const handelDelete = async (user) => {
        try {
            const data = await deleteUserService(user, token)
            console.log(user)
            setShowAlertCf({
                open: false
            })
            const req = handleError(data.request)
            handelNotify('success', 'Xóa tài khoản ' + req)
        } catch (error) {
            const req = handleError(error.request)
            handelNotify('error', req)
        }
    }
    useEffect(() => {
        getListUser()
    }, [])
    return (
        <>
            {/* Modal Thông báo */}
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
            {/* Modal Xác nhận */}
            <Modal
                show={showAlertCf.open}
                onHide={() => setShowAlertCf({ open: false })}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{ backgroundColor: showAlertCf.variant }} closeButton>
                    <Modal.Title>{showAlertCf.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showAlertCf.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAlertCf({ open: false })}>
                        Hủy
                    </Button>
                    <Button onClick={showAlertCf.onClick} variant="primary">OK</Button>
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

                                    <div className=" loat-start float-lg-end mb-2">
                                        <button id='btn-delete-user' className="btn btn-danger">
                                            <i className="bi bi-trash-fill"></i> Khóa tài khoản
                                        </button>
                                        <button onClick={handleshowAdd} id='btn-createaccount' className="btn btn-primary">
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
                                                <tr className=''>
                                                    <th>Chọn</th>
                                                    <th >Tài khoản email</th>
                                                    <th>Họ và tên</th>
                                                    <th >Số điện thoại</th>
                                                    <th >Địa chỉ</th>
                                                    <th >Tác Vụ</th>
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
                                                                <td className='text-break'>{item.address}</td>
                                                                <td className='text-break'>
                                                                    <pre><button onClick={e => handleshowDetail(item.id)}><FontAwesomeIcon icon={faCalendar} className='fa-icon pr-2' /></button><span>  </span>
                                                                        <button onClick={e => handleShowRepair(item.id)}><FontAwesomeIcon icon={faScrewdriverWrench} className='fa-icon' /></button><span>  </span>
                                                                        <button onClick={e => handelShowCfDelete(item.id)}><FontAwesomeIcon icon={faTrash} className='fa-icon' /></button>
                                                                    </pre>
                                                                </td>
                                                            </tr>
                                                        )

                                                    })
                                                }

                                            </tbody>
                                        </table>
                                        <nav className="mt-4">
                                            <ul id="pagination" className="pagination justify-content-center">
                                                {
                                                    pagination && pagination.length > 0 &&
                                                    pagination.map(item => {
                                                        return (<li class="page-item"><button onClick={e => handelChange(item.pageNumber)} class="page-link">{item.pageNumber}</button></li>)
                                                    })
                                                }

                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div >
            <Modal className='ModalThem' show={showAdd} onHide={handleClodeAdd}>
                <Modal.Header className='ModalThemHeader' closeButton>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                onChange={handleChangeAdduser}
                                autoFocus
                            />
                            {addValidate.email && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.email}</p>}
                        </Form.Group>
                        <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Mật Khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="PassWord"
                                name="password"
                                onChange={handleChangeAdduser}
                            />
                            {addValidate.password && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.password}</p>}
                        </Form.Group>
                        <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Họ Tên:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Họ tên"
                                name="fullname"
                                onChange={handleChangeAdduser}
                            />
                            {addValidate.fullname && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.fullname}</p>}
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Ngày sinh:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthday"
                                        onChange={handleChangeAdduser}
                                    />
                                    {addValidate.birthday && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.birthday}</p>}
                                </Form.Group>
                            </div>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Số điện thoại:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Số điện thoại"
                                        name="numberPhone"
                                        onChange={handleChangeAdduser}
                                    />
                                    {addValidate.numberPhone && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.numberPhone}</p>}
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                name="address"
                                onChange={handleChangeAdduser}
                            />
                            {addValidate.address && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.address}</p>}
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Label>Quyền:</Form.Label>
                                <Select
                                    onChange={handleChangeRole}
                                    name="role"
                                    defaultValue={adduser.role}
                                    options={optionsRoles}
                                />
                            </div>
                            {addValidate.role && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.role}</p>}
                            <div className='col-6'>
                                <Form.Label>Giới tính:</Form.Label>
                                <Select
                                    onChange={handleChangeGender}
                                    name="gender"
                                    defaultValue={adduser.gender}
                                    options={optionsGender} />
                            </div>
                            {addValidate.gender && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.gender}</p>}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClodeAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClickAddUser}>
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
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                readOnly="readOnly"
                                defaultValue={repairuser.email}
                                autoFocus
                            />
                            {repairValidate.email && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{repairValidate.email}</p>}
                        </Form.Group>
                        <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Họ Tên:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Họ tên"
                                name="fullname"
                                defaultValue={repairuser.fullname}
                                onChange={handleChangeRepairuser}
                                autoFocus />
                            {repairValidate.fullname && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{repairValidate.fullname}</p>}
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Ngày sinh:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthday"
                                        defaultValue={repairuser.birthday}
                                        onChange={handleChangeRepairuser}
                                        autoFocus />
                                    {repairValidate.birthday && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{repairValidate.birthday}</p>}
                                </Form.Group>
                            </div>
                            <div className='col-6'>
                                <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Số điện thoại:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Số điện thoại"
                                        name="numberPhone"
                                        defaultValue={repairuser.numberPhone}
                                        onChange={handleChangeRepairuser}
                                        autoFocus />
                                    {repairValidate.numberPhone && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{repairValidate.numberPhone}</p>}
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group
                            className="mb-2"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Địa chỉ:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                defaultValue={repairuser.address}
                                name="address"
                                onChange={handleChangeRepairuser}
                                autoFocus />
                            {repairValidate.address && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{repairValidate.address}</p>}
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Label>Quyền:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Quyền"
                                    defaultValue={repairuser.role}
                                    readOnly="readOnly"
                                    autoFocus />
                                {repairValidate.email && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{repairValidate.email}</p>}
                            </div>

                            <div className='col-6'>
                                <Form.Label>Giới tính:</Form.Label>
                                <Select onChange={handleChangeGender1} defaultValue={optionsGender[0]} options={optionsGender} />
                                {repairValidate.gender && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{repairValidate.gender}</p>}
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRepair}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handelShowCfRepairUser(repairuser.id)}>
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
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ Email:</Form.Label>
                            <Form.Control
                                readOnly="readOnly"
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
                                readOnly="readOnly"
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
                                        readOnly="readOnly"
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
                                        readOnly="readOnly"
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
                                readOnly="readOnly"
                                placeholder="Địa chỉ"
                                defaultValue={repairuser.address}
                            />
                        </Form.Group>
                        <div className='row'>
                            <div className='col-6 mb-2'>
                                <Form.Label>Quyền:</Form.Label>
                                <Form.Control
                                    readOnly="readOnly"
                                    placeholder="Quyền"
                                    defaultValue={repairuser.role}
                                />
                            </div>
                            <div className='col-6 mb-2'>
                                <Form.Label>Giới tính:</Form.Label>
                                <Form.Control
                                    readOnly="readOnly"
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
                                        readOnly="readOnly"
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
                                        readOnly="readOnly"
                                        placeholder="Số điện thoại"
                                        defaultValue={repairuser.updatedAt}
                                    />
                                </Form.Group>
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
        </>
    )
}

export default UserAdmin;
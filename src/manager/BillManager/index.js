import React, { useState, useEffect } from 'react';
import './billManager.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Layout/AdminLayout/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import cookies from 'react-cookies';
import { getBillsService, updateBillsService } from '~/service/billsService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faScrewdriverWrench, faCalendar, faSearch, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { OrderStates } from '~/core/constant';
import { handelNotify } from '~/core/utils/req';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BillManager() {
    const limit = 10
    const token = cookies.load('Tokenadmin');
    const [showRepair, setShowRepair] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [searchBills, setSearchBills] = useState({
        page: 1,
        limit: limit,
        sort: '',
        sortBy: '',
        numberPhone: '',
        states: ''
    });
    const [states, setStates] = useState();
    const [billsDetail, setBillsDetail] = useState(-1);
    const [bills, setBills] = useState('')
    const [pagination, SetPagination] = useState('')
    const getListBills = async (list) => {
        try {
            const res = await getBillsService(list, token)
            const data = (res && res.data) ? res.data : [];
            SetPagination(selectPagination(data.totalPage))

            setBills(data.bills)
        } catch (error) {
        }
    }
    const selectPagination = (page) => {
        let content = [];
        for (let i = 1; i <= page; i++) {
            content.push({
                pageNumber: i,
            });
        }

        return content
    }
    const handelChange = (i) => {
        setSearchBills({
            ...searchBills,
            page: i
        })
    }
    const handleshowDetail = (id) => {
        // console.log(id)
        if (id === billsDetail) {
            setBillsDetail(-1)
        }
        else {
            setBillsDetail(id)
        }
    }
    const handleOnclickState = (states) => {
        setBillsDetail(-1)
        if (states == 'all') {
            setSearchBills({
                ...searchBills,
                states: '',
                page: 1,
                sort: '',
                sortBy: '',
                numberPhone: '',
            })
        } else {
            setSearchBills({
                ...searchBills,
                states: states,
                page: 1,
                sort: '',
                sortBy: '',
                numberPhone: '',
            })
        }
        setStates(states)
    }
    function VND(x) {
        return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    const handleAccept = async (action, bill) => {
        if (action == 'accepted') {
            const states = {
                states: 'accepted',
                id: bill
            }
            console.log(states)
            try {
                const res = await updateBillsService(states, 'accept', token)
                const data = res && res.data ? res.data : '';
                console.log(data)
                handelNotify('success', 'Xác nhận đơn hàng thành công')
            } catch (error) {
                console.log(error)
            }
        }
    }
    let price = 0, total = 0
    useEffect(() => {
        getListBills(searchBills)
        console.log(bills)
    }, [searchBills])
    return (
        <>
            <div id="main" className="layout-navbar">
                <Header />
                <div id="main-content">
                    <div className="page-heading">
                        <div className="page-title">
                            <div className="col-12 col-md-7 order-md-1 order-last">
                                <label>
                                    <h3>Danh sách hóa đơn</h3>
                                </label>
                                <label>
                                    <h5 style={{ marginLeft: '50px', marginRight: '10px' }}> Lọc Theo:</h5>
                                </label>
                                <select className="btn btn btn-primary" name="search-cbb" id="cars-search">
                                    <option>Tất Cả</option>
                                </select>
                            </div>
                            <div className="row">
                                <div style={{ backgroundColor: 'white' }} className='row mb-2'>
                                    <Nav justify variant="tabs" defaultActiveKey="/home">
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleOnclickState('all')} eventKey="link-1">Tất cả</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleOnclickState(OrderStates.WAITING)} eventKey="link-2">Chờ xác nhận</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleOnclickState(OrderStates.ACCEPTED)} eventKey="link-3">Chờ lấy hàng</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleOnclickState(OrderStates.SHIPPING)} eventKey="link-4">
                                                Đang giao
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleOnclickState(OrderStates.DELIVERED)} eventKey="link-5">
                                                Đã giao
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleOnclickState(OrderStates.CANCEL)} eventKey="link-6">
                                                Đã hủy
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                </div>
                            </div>
                            <div className="row">
                                <div className='col-11'>
                                    <div id="search-bill-form" name="search-bill-form">
                                        <div className="form-group position-relative has-icon-right">
                                            <input id="serch-bill-text" type="text" className="form-control" placeholder="Tìm kiếm" />
                                            <div className="form-control-icon">
                                                <i className="bi bi-search"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1"><button type="button" class="btn btn-warning">Tìm</button></div>
                            </div>
                        </div>
                        <section className="section">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-danger tabelBill" id="table1">
                                            <thead>
                                                <tr>
                                                    <th width>Chọn</th>
                                                    <th>Tên khách hàng</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Số điện thoại</th>
                                                    {states === 'waiting' || states === 'accepted'
                                                        ? <th>Xác nhận</th>
                                                        : ''
                                                    }
                                                    {states === 'all' ?
                                                        <th>Trạng thái</th>
                                                        : ''
                                                    }
                                                    <th>Chi tiết</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    bills && bills.length > 0 &&
                                                    bills.map((item, index) => {
                                                        total = 0
                                                        let s = 'table-info';
                                                        if ((bills.indexOf(index) + 1) % 2 !== 0) {
                                                            s = 'table-light';
                                                        } return (
                                                            <>
                                                                <tr className={s}>
                                                                    <td>{item.id}</td>
                                                                    <td className='text-break'>{item.customerName}</td>
                                                                    <td className='text-break'>{item.address}</td>
                                                                    <td className='text-break'>{item.numberPhone}</td>
                                                                    {states === 'all' ?
                                                                        <td className='text-break'>{item.states}</td>
                                                                        : ''
                                                                    }
                                                                    {states === 'waiting' || states === 'accepted' ? (
                                                                        <td className='text-break'>
                                                                            <button onClick={() => handleAccept('accepted', item.id)} type="button" class="btn btn-success">Xác nhận</button>
                                                                            <button type="button" class="btn btn-danger">Hủy đơn</button>
                                                                        </td>
                                                                    )
                                                                        : ''
                                                                    }
                                                                    <td className='text-break'>
                                                                        <button onClick={e => handleshowDetail(item.id)}><FontAwesomeIcon icon={faEye} className='fa-icon pr-2' /></button>
                                                                    </td>
                                                                </tr>
                                                                <tr className={billsDetail === item.id ? 'table-light' : 'table-light showdetail'}>
                                                                    <td colspan={6}>
                                                                        <div className='container'>
                                                                            <div className="shopping-cart">
                                                                                {item.billDetails.length > 0 && item.billDetails.map((item1, index1) => {
                                                                                    total += item1.price;
                                                                                    return (
                                                                                        <>
                                                                                            <div style={{ backgroundColor: 'white' }} className={index1 === 0 ? 'product mt-5' : 'product mt-2'}>
                                                                                                <div className="product1-image">
                                                                                                    <img src={'http://localhost:1912/static/product/image/' + item1.product.img1} />
                                                                                                </div>
                                                                                                <div className="product1-details">
                                                                                                    <div className="product1-title">{item1.product.name}</div>
                                                                                                    <p className="product1-description">{'x ' + item1.count}</p>
                                                                                                </div>
                                                                                                <div className="product1-quantity">{VND(item1.product.price)}</div>

                                                                                                <div className="product1-line-price">{VND(item1.price)}</div>
                                                                                            </div>

                                                                                        </>
                                                                                    )
                                                                                })

                                                                                }
                                                                                <div className="totals">
                                                                                    <div className="totals-item">
                                                                                        <label>Tổng cộng:</label>
                                                                                        <div id="cart-subtotal">{' ' + VND(total)}</div>
                                                                                    </div>
                                                                                    <div className="totals-item">
                                                                                        <label>Phí Ship:</label>
                                                                                        <div id="cart-shipping">{' ' + VND(item.shippingFee)}</div>
                                                                                    </div>
                                                                                    <div className="totals-item totals-item-total">
                                                                                        <label>Thành tiền:</label>
                                                                                        <div id="cart-total">{' ' + VND(total + item.shippingFee)}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                            </>
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
                                                        return (<li className="page-item" active><button onClick={e => handelChange(item.pageNumber)} class="page-link">{item.pageNumber}</button></li>)
                                                    })
                                                }

                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div>
                        <Modal show={showRepair} onHide={() => setShowRepair(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sửa thông tin hóa đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>ID hóa đơn:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>% giảm giá:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Ngày thêm:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Ngày sửa gần nhất:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowRepair(false)}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={() => setShowRepair(false)}>
                                    Sửa
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal show={showDetail} onHide={() => setShowDetail(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thông tin chi tiết hóa đơn</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>ID hóa đơnw:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>% giảm giá:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Ngày bắt đầu:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Ngày kết thúc:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Ngày thêm:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Ngày sửa gần nhất:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDetail(false)}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={() => setShowDetail(false)}>
                                    Sửa
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div >
        </>
    )
}

export default BillManager;
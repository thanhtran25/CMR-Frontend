import React, { useState, useEffect } from 'react';
import './billManager.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Layout/AdminLayout/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import cookies from 'react-cookies';
import { getBillsService } from '~/service/billsService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faScrewdriverWrench, faCalendar, faSearch, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';

function BillManager() {
    const limit = 5
    const token = cookies.load('Tokenadmin');
    const [showAdd, setShowAdd] = useState(false);
    const [showRepair, setShowRepair] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [searchBills, setSearchBills] = useState({
        page: 1,
        limit: limit,
        sort: '',
        sortBy: '',
        numberPhone: '',
    });
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
        setBillsDetail(id)
    }
    const handelShowCfDelete = () => {

    }
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
                                            <Nav.Link eventKey="link-1">Tất cả</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-2">Chờ xác nhận</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-3">Chờ lấy hàng</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-4">
                                                Đang giao
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-5">
                                                Đã giao
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-6">
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
                                                    <th>Xác nhận</th>
                                                    <th>Tác vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    bills && bills.length > 0 &&
                                                    bills.map((item, index) => {
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
                                                                    <td className='text-break'><button type="button" class="btn btn-success">Success</button></td>
                                                                    <td className='text-break'>
                                                                        <button onClick={e => handleshowDetail(item.id)}><FontAwesomeIcon icon={faEye} className='fa-icon pr-2' /></button>
                                                                    </td>
                                                                </tr>
                                                                <tr className={billsDetail != item.id ? 'table-light showdetail' : 'table-light'}>
                                                                    <td colspan={6}>
                                                                        <div className='container'>
                                                                            <div className="shopping-cart">
                                                                                {item.billDetails.length > 0 && item.billDetails.map((item1, index1) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div style={{ backgroundColor: 'white' }} className={index1 === 0 ? 'product mt-5' : 'product mt-2'}>
                                                                                                <div className="product1-image">
                                                                                                    <img src={'http://localhost:1912/static/product/image/' + item1.product.img1} />
                                                                                                </div>
                                                                                                <div className="product1-details">
                                                                                                    <div className="product1-title">{item1.product.name}</div>
                                                                                                    <p className="product1-description">{item1.product.description}</p>
                                                                                                </div>
                                                                                                <div className="product1-quantity">{item1.product.description}</div>
                                                                                                <div className="product1-quantity">
                                                                                                    <p className="product1-description">{item1.count}</p>
                                                                                                </div>
                                                                                                <div className="product1-line-price">{item1.product.description}</div>
                                                                                            </div>
                                                                                            {/* <div className="product">
                                                                                                <div className="product-image">
                                                                                                    <img src="https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png" />
                                                                                                </div>
                                                                                                <div className="product-details">
                                                                                                    <div className="product-title">Nutro™ Adult Lamb and Rice Dog Food</div>
                                                                                                    <p className="product-description">Who doesn't like lamb and rice? We've all hit the halal cart at 3am while quasi-blackout after a night of binge drinking in Manhattan. Now it's your dog's turn!</p>
                                                                                                </div>
                                                                                                <div className="product-price">45.99</div>
                                                                                                <div className="product-quantity">
                                                                                                    <input type="number" value="1" min="1" />
                                                                                                </div>
                                                                                                <div className="product-removal">
                                                                                                    <button className="remove-product">
                                                                                                        Remove
                                                                                                    </button>
                                                                                                </div>
                                                                                                <div className="product-line-price">45.99</div>
                                                                                            </div> */}
                                                                                        </>
                                                                                    )
                                                                                })

                                                                                }
                                                                                <div className="totals">
                                                                                    <div className="totals-item">
                                                                                        <label>Subtotal</label>
                                                                                        <div className="totals-value" id="cart-subtotal">71.97</div>
                                                                                    </div>
                                                                                    <div className="totals-item">
                                                                                        <label>Tax (5%)</label>
                                                                                        <div className="totals-value" id="cart-tax">3.60</div>
                                                                                    </div>
                                                                                    <div className="totals-item">
                                                                                        <label>Shipping</label>
                                                                                        <div className="totals-value" id="cart-shipping">15.00</div>
                                                                                    </div>
                                                                                    <div className="totals-item totals-item-total">
                                                                                        <label>Grand Total</label>
                                                                                        <div className="totals-value" id="cart-total">90.57</div>
                                                                                    </div>
                                                                                </div>

                                                                                <button className="checkout">Rút gọn</button>

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
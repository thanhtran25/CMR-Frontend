import React, { useState, useEffect } from 'react'
import './historyoder.scss'
import cookies from 'react-cookies';
import Nav from 'react-bootstrap/Nav';
import { OrderStates } from '~/core/constant';
import { getBillsService, updateBillsService } from '~/service/billsService';
import moment from 'moment'
const HistoryOder = () => {
    const limit = 10
    const token = cookies.load('Token')
    const [states, setStates] = useState();
    const action = 'history'
    const [bills, setBills] = useState('')
    const [pagination, SetPagination] = useState('')
    const [searchBills, setSearchBills] = useState({
        page: 1,
        limit: limit,
        sort: '',
        sortBy: '',
        numberPhone: '',
        states: 'accepted',
        history: action
    });
    function VND(x) {
        return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
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
    const handleOnclickState = (states) => {
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
    }
    let total = 0
    useEffect(() => {
        getListBills(searchBills)
        console.log(bills)
    }, [searchBills])
    return (
        <>
            <div className="container mt-5 cartbody">
                <div className='row mt-5'>
                    <div style={{ backgroundColor: 'white' }} className='col-12 mt-5'>
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
                    {
                        bills && bills.length > 0 &&
                        bills.map((item1, index) => {
                            const day = moment(item1.createdAt).format('DD/MM/YYYY')
                            total = 0;
                            return (
                                <>
                                    <div className='col-12'>
                                        <p>
                                            Ngày mua: {day}
                                        </p>
                                    </div>
                                    <div className='col-12'>
                                        <div className="row mt-2">
                                            <aside className="col-lg-9">
                                                <div className="card">
                                                    <div className="table-responsive">
                                                        <table className="table table-borderless table-shopping-cart">
                                                            <thead className="text-muted">
                                                                <tr className="small">
                                                                    <th scope="col" width="200">Hình ảnh</th>
                                                                    <th scope="col" width="300">Tên sản phẩm</th>
                                                                    <th scope="col" width="120">Số lượng</th>
                                                                    <th scope="col" width="250" >Đơn giá</th>
                                                                    <th scope="col" width="250">Tổng cộng</th>
                                                                    <th scope="col" className="" width="50">Xóa</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {item1.billDetails.length > 0 && item1.billDetails.map((item, index1) => {
                                                                    console.log(item)
                                                                    total += item.price;
                                                                    return (
                                                                        <tr>
                                                                            <td>
                                                                                <div className="aside"><img src={'http://localhost:1912/static/product/image/' + item.product.img1} className="img-thumbnail" /></div>

                                                                            </td>
                                                                            <td><p className="text-break">{item.product.name}</p></td>
                                                                            <td>
                                                                                <div className='product-amount'>
                                                                                    <input type='number' value={item.product.count} step="1" min="1" max="999" />
                                                                                    <button value='1' className='amount-plus'>
                                                                                        +
                                                                                    </button>
                                                                                    <button value='-1' className='amount-minus'>
                                                                                        -
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="price-wrap"><p className="text-break">{VND(item.product.price)}</p></div>

                                                                            </td>
                                                                            <td><div className="price-wrap"><p className="text-danger">{VND(item.price)}</p></div></td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </aside>
                                            <aside className="col-lg-3">

                                                <div className="card">
                                                    <div className="card-body">
                                                        <dl className="dlist-align row">
                                                            <dt>Tổng cộng: </dt>
                                                            <dd className="text-right ml-3">{VND(total)}</dd>
                                                        </dl>
                                                        <dl className="dlist-align">
                                                            <dt>Phí ship: </dt>
                                                            <dd className="text-right text-danger ml-3">+ {VND(item1.shippingFee)}</dd>
                                                        </dl>
                                                        <dl className="dlist-align">
                                                            <dt>Thành tiền: </dt>
                                                            <dd className="text-right text-dark b ml-3"><strong>{VND(total + item1.shippingFee)}</strong></dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </aside>
                                        </div>
                                        <hr />
                                    </div>
                                </>
                            )

                        })
                    }
                </div>
            </div>
        </>
    )
}
export default HistoryOder

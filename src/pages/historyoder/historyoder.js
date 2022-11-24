import React, { useState, useEffect } from 'react'
import './historyoder.scss'
import cookies from 'react-cookies';
import { getBillsService, updateBillsService } from '~/service/billsService';
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
        states: '',
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
    let total = 0
    useEffect(() => {
        getListBills(searchBills)
        console.log(bills)
    }, [searchBills])
    return (
        <>
            <div className="container cartbody">
                {
                    bills && bills.length > 0 &&
                    bills.map((item1, index) => {
                        console.log(bills)
                        total = 0;
                        return (
                            <div className="row mt-2">
                                <aside className="col-lg-9">
                                    <div className="card">
                                        <div className="table-responsive">
                                            <table className="table table-borderless table-shopping-cart">
                                                <thead className="text-muted">
                                                    <tr className="small">
                                                        <th scope="col" width="50">Chọn</th>
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
                                                        total += item.price;
                                                        return (
                                                            <tr>
                                                                <td>
                                                                    <div className="aside"><img src={'http://localhost:1912/static/product/image/' + item.img1} className="img-thumbnail" /></div>

                                                                </td>
                                                                <td><p className="text-break">{item.name}</p></td>
                                                                <td>
                                                                    <div className='product-amount'>
                                                                        <input type='number' value={item.count} step="1" min="1" max="999" />
                                                                        <button value='1' className='amount-plus'>
                                                                            +
                                                                        </button>
                                                                        <button value='-1' className='amount-minus'>
                                                                            -
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="price-wrap"><p className="text-break">{VND(item.price)}</p></div>

                                                                </td>
                                                                <td><div className="price-wrap"><p className="text-danger">{VND(item.total)}</p></div></td>
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
                                                <dt>Tạm tính: </dt>
                                                <dd className="text-right ml-3">{total && VND(total.totalPrice)}</dd>
                                            </dl>
                                            <dl className="dlist-align">
                                                <dt>Giảm giá: </dt>
                                                <dd className="text-right text-danger ml-3">- {total && VND(total.totalSale)}</dd>
                                            </dl>
                                            <dl className="dlist-align">
                                                <dt>Tổng cộng: </dt>
                                                <dd className="text-right text-dark b ml-3"><strong>{total && VND(total.total)}</strong></dd>
                                            </dl>
                                            <hr /> <a className="btn btn-out btn-danger btn-square btn-main" data-abc="true"> Tiến hành thanh toán </a> <a className="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Tiếp tục mua hàng</a>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        )

                    })
                }
            </div>
        </>
    )
}
export default HistoryOder

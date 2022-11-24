import React, { useState, useEffect } from 'react';
import './shippernew.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Layout/AdminLayout/Header';
import { getBillsService, updateBillsService } from '~/service/billsService';
import cookies from 'react-cookies';
import { OrderStates } from '~/core/constant';
import { Notify } from '~/core/constant';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handelNotify } from '~/core/utils/req';

function ShipperNew() {
    const limit = 10;
    const token = cookies.load('Tokenadmin');
    const user = cookies.load('admin');
    const [bills, setBills] = useState('')
    const [pagination, SetPagination] = useState('')
    const [searchBills, setSearchBills] = useState({
        page: 1,
        limit: limit,
        sort: '',
        sortBy: '',
        numberPhone: '',
        states: OrderStates.SHIPPING
    });
    const [checked, setChecked] = useState([])
    const [showAlertCf, setShowAlertCf] = useState(false);
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
    const handleCheck = (event) => {
        const value = JSON.parse(event.target.value)
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, value];
        } else {
            updatedList.splice(checked.indexOf(value), 1);
        }
        setChecked(updatedList);
    }
    const handleUpdateStates = async (action, id) => {
        try {
            let satesupdate = {
                states: OrderStates.DELIVERING,
                shipperId: user.id,
                id: id
            }
            const res = await updateBillsService(satesupdate, action, token)
            const data = res && res.data ? res.data : '';
            setSearchBills({
                ...searchBills,
                sort: '',
                sortBy: '',
                numberPhone: '',
            })
            handelNotify('success', 'Xác nhận đơn hàng thành công')
            setShowAlertCf({
                open: false
            })
        } catch (error) {
            handelNotify('erorr', 'Xác nhận đơn hàng thất bại')
        }
    }
    const hadleUpdateMuti = async (action) => {
        if (checked.length < 0) {
            handelNotify('erorr', 'Chọn đơn hàng để nhận đơn')
            return
        }
        checked.map((item, index) => {
            handleUpdateStates(action, item.id)
        })
    }
    useEffect(() => {
        getListBills(searchBills)
        console.log(bills)
    }, [searchBills])
    return (
        <>
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
            <div id="main" className="layout-navbar">
                <Header />
                <div id="main-content">
                    <div className="page-heading">

                        <div className="page-title">
                            <div className="row">
                                <div className="col-12 col-md-7 order-md-1 order-last">
                                    <label>
                                        <h3>Danh sách đơn hàng</h3>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 ">
                                <div >
                                    <button onClick={() => hadleUpdateMuti('ship')} id='btn-createaccount' className="btn btn-primary">
                                        Nhận đơn
                                    </button>
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
                                                    <th>Thông tin đơn hàng</th>
                                                    <th>Nhận đơn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bills && bills.length > 0 &&
                                                    bills.map((item, index) => {
                                                        let s = 'table-info';
                                                        if ((index + 1) % 2 !== 0) {
                                                            s = 'table-light';
                                                        }
                                                        return (
                                                            <tr className={s}>
                                                                <td>
                                                                    <div className="form-check">
                                                                        <input onChange={handleCheck} value={JSON.stringify(item)} className="form-check-input" type="checkbox" id="check1" name="option1" />
                                                                    </div>
                                                                </td>
                                                                <td className='text-break'>
                                                                    <div>
                                                                        <p style={{ fontWeight: 'bold' }}>{'Tên: ' + item.customerName}</p>
                                                                        <p>{'Địa chỉ: ' + item.address}</p>
                                                                        <p>{'Sđt: ' + item.numberPhone}</p>
                                                                        <p>{'Phí ship: ' + item.shippingFee}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='text-break'>
                                                                    <button onClick={() => handleUpdateStates('ship', item.id)} type="button" class="btn btn-success">Nhận đơn</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <nav className="mt-5">
                                            <ul id="pagination" className="pagination justify-content-center">
                                                {
                                                    pagination && pagination.length > 0 &&
                                                    pagination.map(item => {
                                                        return (<li class="page-item" active><button onClick={e => handelChange(item.pageNumber)} class="page-link">{item.pageNumber}</button></li>)
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
        </>
    )
}

export default ShipperNew;
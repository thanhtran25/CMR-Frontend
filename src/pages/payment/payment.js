import 'bootstrap/dist/css/bootstrap.min.css'
import './payment.scss'
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeCart, checkCart, userPayment } from '~/store/action/cartAction';
import cookies from 'react-cookies';
import { shippingService } from '~/service/paymentService';
const Payment = () => {
    const refname = useRef(null);
    const refaddress = useRef(null);
    const refphone = useRef(null);
    const user = cookies.load('user')
    const [userPay, setUserPay] = useState('');
    const checked = useSelector(state => state.cart.check);
    const total = useSelector(state => state.cart.total);
    const [isReadonly, setIsReadonly] = useState({
        customerName: false,
        address: false,
        numberPhone: false
    });
    const handleReadOnly = () => {
        if (!user.fullname && user.fullname === '') {
            setIsReadonly({
                ...isReadonly,
                customerName: false
            })
        }
        if (user.address) {
            setIsReadonly({
                ...isReadonly,
                address: true
            })
        }
        if (user.numberPhone) (
            setIsReadonly({
                ...isReadonly,
                numberPhone: true
            })
        )
    }
    const handleRepairAddress = async () => {
        const address = {
            address: userPay.address
        }
        try {
            const res = await shippingService(address)
            const data = res && res.data ? res.data : '';
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        const value = e.target.value
        setUserPay({
            ...userPay,
            [e.target.name]: value
        })
        console.log(userPay)
    }
    function VND(x) {
        return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    useEffect(() => {
        if (user) {
            handleReadOnly()
            setUserPay({
                customerName: user.fullname,
                address: user.address,
                numberPhone: user.numberPhone
            })
        } else {
            setUserPay({
                customerName: '',
                address: '',
                numberPhone: ''
            })
        }
    }, [])
    return (
        <div className="container">
            <div className='row'>
                <h4 className='switchpage'><FontAwesomeIcon icon={faHouse} className='fa-icon' /> Trang Chủ / <span>Giỏ Hàng / </span><span className='paymentText'>Thanh Toán</span></h4>
            </div>
            <div className='row'>
                <h3 className='titleGiohang'>Chi tiết thanh toán</h3>
            </div>
            <div className="container paymentbody">
                <div className='row w-100 p-3 infor'>
                    <div className='col-12'>
                        <div className='row mt-2'>
                            <div className='col-10'>
                                <input readOnly={isReadonly.customerName} onChange={handleChange} name="customerName" ref={refname} type="text" value={userPay.customerName} className="form-control" placeholder="Họ và tên" />
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-secondary btnSua">Sửa</button>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-10'>
                                <input readOnly={isReadonly.address} name="address" onChange={handleChange} ref={refaddress} type="text" value={userPay.address} className="form-control" placeholder="Địa chỉ" />
                            </div>
                            <div className='col-2'>
                                <button onClick={handleRepairAddress} type="button" className="btn btn-secondary btnSua">Sửa</button>
                            </div>
                        </div>
                        <div className='row mt-4 pb-2'>
                            <div className='col-10'>
                                <input readOnly={isReadonly.numberPhone} name="numberPhone" onChange={handleChange} ref={refphone} type="text" value={userPay.numberPhone} className="form-control" placeholder="Số điện thoại" />
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-secondary btnSua">Sửa</button>
                            </div>
                        </div>
                        <hr className='my-hr-line' />
                        <div className='row totalItem'>
                            <div className='col-10'>Đơn hàng ({total.amount})</div>
                            <div className='col-2'><button type="button" className="btn btn-secondary btnSua">Sửa</button></div>
                        </div>
                        <hr />
                        <div className='row'>
                            {checked && checked.length > 0 &&
                                checked.map((item, index) => {
                                    return (
                                        <>
                                            <div className='col-8 mt-3'>{item.count + ' x ' + item.name}</div>
                                            <div className='col-4 mt-3'>{total && VND(item.total)}</div>
                                        </>
                                    )
                                })
                            }
                            {/* <div className='col-8'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div> */}
                        </div>
                        <hr className='mt-4' />
                        <div className='row'>
                            <div className='col-8'>
                                Tạm tính
                            </div>
                            <div className='col-4'>
                                {total && VND(total.totalPrice)}
                            </div>
                            <div className='col-8 mt-2' style={{
                                color: 'red',
                                fontStyle: 'italic'
                            }}>
                                Khuyến mãi
                            </div>
                            <div className='col-4 mt-2' style={{
                                color: 'red',
                                fontStyle: 'italic'
                            }}>
                                {total && VND(total.totalSale)}
                            </div>
                            <div className='col-8 mt-2'>
                                Phí vận chuyển
                            </div>
                            <div className='col-4 mt-2'>
                                947,800,000 ₫
                            </div>
                        </div>
                        <hr className='mt-3' />
                        <div className='row'>
                            <div className='col-8 mt-2' style={{ fontWeight: 'bold' }}>
                                Thành tiền
                            </div>
                            <div className='col-4 mt-2' style={{ fontWeight: 'bold' }}>
                                {total && VND(total.total)}
                                <div className='mt-2' style={{
                                    fontStyle: 'italic',
                                    color: 'gray'
                                }}>
                                    (Đã bao gồm thuế VAT)
                                </div>
                            </div>
                        </div>
                        <hr className='mt-3 my-hr-line' />
                        <div className='row'>
                            <button type="button" className="btn btn-danger w-20">Thanh Toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Payment
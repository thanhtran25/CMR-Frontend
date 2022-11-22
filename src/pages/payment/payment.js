import 'bootstrap/dist/css/bootstrap.min.css'
import './payment.scss'
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeCart, checkCart, userPayment } from '~/store/action/cartAction';
import cookies from 'react-cookies';
import { shippingService, paymentService } from '~/service/paymentService';
import { validateFull } from '~/core/utils/validate';
import { handelNotify } from '~/core/utils/req';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notify } from '~/core/constant';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
const Payment = () => {
    const refname = useRef(null);
    const refaddress = useRef(null);
    const refphone = useRef(null);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [userPay, setUserPay] = useState('');
    const checked = useSelector(state => state.cart.check);
    const total = useSelector(state => state.cart.total);
    const [showAlertCf, setShowAlertCf] = useState(false);
    const [shippingFee, setShippingFee] = useState('');
    const [isReadonly, setIsReadonly] = useState({
        customerName: true,
        address: false,
        numberPhone: true
    });
    const [validate, setValiday] = useState('')
    const [details, setDetails] = useState()
    // const handleRepairAddress = async () => {
    //     const address = {
    //         address: userPay.address
    //     }
    //     try {
    //         const res = await shippingService(address)
    //         const data = res && res.data ? res.data : '';
    //         setShippingFee(data.result)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const handleshowCf = () => {
        if (checked.length > 0) {
            const isval = validateFull(userPay)
            setValiday(isval)
            if (Object.keys(isval).length > 0) return
            if (!isReadonly.address || !isReadonly.customerName || !isReadonly.numberPhone) {
                handelNotify('warn', 'Lưu tất cả trước khi thanh toán')
                return
            }
            setShowAlertCf({
                open: true,
                variant: Notify.WARNING,
                text: 'Bạn chắc chắc muốn thanh toán',
                title: 'Xác nhận thanh toán',
                backdrop: 'static',
                onClick: () => handleClcikPayment()
            })
        } else {
            handelNotify('warn', 'Chưa chọn sản phẩm để thanh toán')
        }
    }
    const handleClcikPayment = async () => {
        const pay = {
            customerName: userPay.customerName,
            address: userPay.address + ' , Vietnam (' + shippingFee.distance + ')',
            numberPhone: userPay.numberPhone,
            details: details,
            shippingFee: shippingFee.shippingFee
        }
        try {
            const res = await paymentService(pay)
            const data = res && res.data ? res.data : '';
            console.log(data)
        } catch (error) {

        }
    }
    const handleSwitchCart = () => {
        navigate('/cart')
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

    }, [shippingFee])
    useEffect(() => {
        let details = []
        checked && checked.length > 0 &&
            checked.map((item, index) => {
                const product = {
                    productId: item.productId,
                    count: item.count,
                    price: item.total
                }
                details.push(product)
            })
        if (cookies.load('user')) {
            if (user.fullname == '') {
                setIsReadonly({
                    ...isReadonly,
                    customerName: false
                })
            }
            if (user.address == '') {
                setIsReadonly({
                    ...isReadonly,
                    address: false
                })
            }
            if (user.numberPhone == '') {
                setIsReadonly({
                    ...isReadonly,
                    numberPhone: false
                })
            }
        }
        else {
            setIsReadonly({
                customerName: false,
                address: false,
                numberPhone: false
            })
        }
        if (user) {
            setUserPay({
                customerName: user.fullname,
                address: user.address,
                numberPhone: user.numberPhone
            })
        } else {
            setUserPay({
                customerName: '',
                address: '',
                numberPhone: '',

            })
        }
        setDetails(details)
    }, [])
    const handleClickFocus = (e) => {
        const type = e.target.value
        if (type === 'name') {
            setIsReadonly({
                ...isReadonly,
                customerName: false
            })
            refname.current.focus();
        }
        if (type === 'address') {
            setIsReadonly({
                ...isReadonly,
                address: false
            })
            refaddress.current.focus();
        }
        if (type === 'phone') {
            setIsReadonly({
                ...isReadonly,
                numberPhone: false
            })
            refphone.current.focus();
        }
        // let pathbtnName = <button type="button" class="btn btn-success">Success</button>
    }
    const handleClickNotFocus = async (e) => {
        const type = e.target.value
        if (type === 'name') {
            setIsReadonly({
                ...isReadonly,
                customerName: true
            })
        }
        if (type === 'address') {
            const address = {
                address: userPay.address
            }
            try {
                const res = await shippingService(address)
                const data = res && res.data ? res.data : '';
                handelNotify('success', 'Tính phí ship thành công')
                setShippingFee(data.result)
                dispatch(userPayment({ ...total, total: total.total + data.result.shippingFee }))
                setIsReadonly({
                    ...isReadonly,
                    address: true
                })
            } catch (error) {
                console.log(error)
                handelNotify('warn', 'Tính phí ship thất bại')
            }
        }
        if (type === 'phone') {
            setIsReadonly({
                ...isReadonly,
                numberPhone: true
            })
        }
        // let pathbtnName = <button type="button" class="btn btn-success">Success</button>
    }
    let pathName = <button onClick={handleClickFocus} value='name' type="button" className="btn btn-secondary btnSua">Sửa</button>
    let pathAdress = <button onClick={handleClickFocus} value='address' type="button" className="btn btn-secondary btnSua">Sửa</button>
    let pathPhone = <button onClick={handleClickFocus} value='phone' type="button" className="btn btn-secondary btnSua">Sửa</button>
    if (!isReadonly.address) {
        pathAdress = <button onClick={handleClickNotFocus} value='address' type="button" class="btn btn-success">Lưu</button>
    }
    if (!isReadonly.customerName) {
        pathName = <button onClick={handleClickNotFocus} value='name' type="button" class="btn btn-success">Lưu</button>
    }
    if (!isReadonly.numberPhone) {
        pathPhone = <button onClick={handleClickNotFocus} value='phone' type="button" class="btn btn-success">Lưu</button>
    }
    return (
        <>
            <Modal
                show={showAlertCf.open}
                onHide={() => setShowAlertCf({ open: false })}
                backdrop={showAlertCf.backdrop}
                keyboard={false}
            >
                <Modal.Header style={{ backgroundColor: showAlertCf.variant }} closeButton>
                    <Modal.Title>{showAlertCf.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showAlertCf.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAlertCf({ open: false })}
                    >
                        Hủy
                    </Button>
                    <Button onClick={showAlertCf.onClick} variant="primary">OK</Button>
                </Modal.Footer>
            </Modal>
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
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.customerName}</p>
                                </div>
                                <div className='col-2'>
                                    {pathName}
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-10'>
                                    <input readOnly={isReadonly.address} name="address" onChange={handleChange} ref={refaddress} type="text" value={userPay.address} className="form-control" placeholder="Địa chỉ" />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.address}</p>
                                </div>
                                <div className='col-2'>
                                    {pathAdress}
                                </div>
                            </div>
                            <div className='row mt-4 pb-2'>
                                <div className='col-10'>
                                    <input readOnly={isReadonly.numberPhone} name="numberPhone" onChange={handleChange} ref={refphone} type="text" value={userPay.numberPhone} className="form-control" placeholder="Số điện thoại" />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.numberPhone}</p>
                                </div>
                                <div className='col-2'>
                                    {pathPhone}
                                </div>
                            </div>
                            <hr className='my-hr-line' />
                            <div className='row totalItem'>
                                <div className='col-10'>Đơn hàng ({total.amount})</div>
                                <div className='col-2'><button onClick={handleSwitchCart} type="button" className="btn btn-secondary btnSua">Sửa</button></div>
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
                                    {shippingFee && shippingFee.shippingFee && shippingFee.distance && VND(shippingFee.shippingFee)
                                        + ' (' + shippingFee.distance + 'km)'
                                    }
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
                                <button onClick={handleshowCf} type="button" className="btn btn-danger w-20">Thanh Toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Payment
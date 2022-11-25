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
    const token = cookies.load('Token');
    const refname = useRef(null);
    const refaddress = useRef(null);
    const refphone = useRef(null);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [userPay, setUserPay] = useState('');
    const checked = useSelector(state => state.cart.check);
    const cart = useSelector(state => state.cart.cart);
    const total = useSelector(state => state.cart.total);
    const [showAlertCf, setShowAlertCf] = useState(false);
    const [showAlertCf1, setShowAlertCf1] = useState(false);
    const [shippingFee, setShippingFee] = useState('');
    const [isReadonly, setIsReadonly] = useState({
        customerName: true,
        address: false,
        numberPhone: true
    });
    const [oldShip, setOldShip] = useState(0)
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
            address: userPay.address + ' (' + shippingFee.distance + ' Km)',
            numberPhone: userPay.numberPhone,
            details: details,
            shippingFee: shippingFee.shippingFee
        }
        try {
            const res = await paymentService(pay, token)
            const data = res && res.data ? res.data : '';
            setShowAlertCf({ open: false })
            let array = [...cart]
            details.map((item, index) => {
                cart.map((item1, index1) => {
                    if (item.productId == item1.productId) {
                        array.splice(index1, 1)
                    }
                })
            })
            setShowAlertCf1({
                open: true,
                variant: Notify.SUCCESS,
                text: 'Thanh toán thành công',
                title: 'Thành công',
                backdrop: 'static',
                onClick: () => handleSwitchCart()
            })
            dispatch(changeCart(array))
            sessionStorage.setItem('cart', JSON.stringify(array))
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
                console.log(checked)
                const product = {
                    productId: item.productId,
                    count: item.count,
                    price: item.total - ((item.price * (item.percent / 100)) * item.count)
                }
                details.push(product)
            })
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
    const handleClickAddress = async () => {
        const address = {
            address: userPay.address
        }
        try {
            const res = await shippingService(address, token)
            const data = res && res.data ? res.data : '';
            handelNotify('success', 'Tính phí ship thành công')
            setShippingFee(data.result)
            dispatch(userPayment({ ...total, total: total.total + data.result.shippingFee - oldShip }))
            setOldShip(data.result.shippingFee)
        } catch (error) {
            handelNotify('warn', 'Tính phí ship thất bại')
        }
    }
    // let pathName = <button onClick={handleClickFocus} value='name' type="button" className="btn btn-secondary btnSua">Sửa</button>
    // let pathAdress = <button onClick={handleClickFocus} value='address' type="button" className="btn btn-secondary btnSua">Sửa</button>
    // let pathPhone = <button onClick={handleClickFocus} value='phone' type="button" className="btn btn-secondary btnSua">Sửa</button>
    // if (!isReadonly.address) {
    //     pathAdress = <button onClick={handleClickNotFocus} value='address' type="button" class="btn btn-success">Lưu</button>
    // }
    // if (!isReadonly.customerName) {
    //     pathName = <button onClick={handleClickNotFocus} value='name' type="button" class="btn btn-success">Lưu</button>
    // }
    // if (!isReadonly.numberPhone) {
    //     pathPhone = <button onClick={handleClickNotFocus} value='phone' type="button" class="btn btn-success">Lưu</button>
    // }
    let save = 0
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

            <Modal
                show={showAlertCf1.open}
                onHide={handleSwitchCart}
                backdrop={showAlertCf1.backdrop}
                keyboard={false}
            >
                <Modal.Header style={{ backgroundColor: showAlertCf1.variant }} closeButton>
                    <Modal.Title>{showAlertCf1.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showAlertCf1.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={showAlertCf1.onClick} variant="primary">OK</Button>
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
            <div className="container mt-5">
                <div className="py-5 text-center">
                    <h2>Chi tiết thanh toán</h2>
                </div>

                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Giỏ hàng</span>
                            <span className="">{total.amount}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {checked && checked.length > 0 &&
                                checked.map((item, index) => {
                                    save += (item.price / (100) * item.percent) * item.count
                                    return (
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">{item.name}</h6>
                                                <small className="text-muted">{'x ' + item.count}</small>
                                            </div>
                                            <div className="box-item-content-2">
                                                <p>{VND((item.price * (100 - item.percent) / 100) * item.count)}</p>
                                                {item.percent > 0 && <del className="box-item-del">{VND(item.price * item.count)}</del>}
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-success">
                                    <h6 className="my-0">Tiết kiệm: </h6>
                                    <small></small>
                                </div>
                                <span className="text-success">-{VND(total.totalSale)}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Phí ship: </span>
                                <span>{shippingFee && shippingFee.shippingFee ? shippingFee.distance && VND(shippingFee.shippingFee)
                                    + ' (' + shippingFee.distance + 'km)' : '0 đ'
                                }
                                </span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Thành tiền: </span>
                                <strong>{VND(total.total)}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Thông tin</h4>
                        <form className="needs-validation" novalidate>
                            <div className="row">
                                <div className="col-md-12 mb-6">
                                    <label htmlFor="lastName">Họ và tên</label>
                                    <input type="text" onChange={handleChange} name='customerName' value={userPay.customerName} className="form-control" id="lastName" placeholder="Họ và tên" />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.customerName}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-11">
                                    <label htmlFor="email">Địa chỉ</label>
                                    <input type="text" onChange={handleChange} name='address' value={userPay.address} className="form-control" id="email" placeholder="Địa chỉ" />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.address}</p>
                                </div>
                                <div className="mb-3 mt-3 col-1">
                                    <button onClick={handleClickAddress} type="button" class="btn btn-success">sửa</button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Số điện thoại</label>
                                <input type="text" onChange={handleChange} name='numberPhone' value={userPay.numberPhone} className="form-control" id="address" placeholder="Số điện thoại" />
                                <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.numberPhone}</p>
                            </div>
                            <hr className="mb-4" />
                            <button onClick={handleshowCf} className="btn btn-primary btn-lg btn-block mb-3" type="button">Thanh toán</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment
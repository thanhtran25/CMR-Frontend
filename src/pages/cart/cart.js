import 'bootstrap/dist/css/bootstrap.min.css'
import './cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faTrashCan, faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { changeCart, checkCart, userPayment, changeAmount } from '~/store/action/cartAction';
import { getProductByIdService } from '~/service/productService';
import { handelNotify } from '~/core/utils/req';
import { ToastContainer } from 'react-toastify';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart);
    const amount1 = useSelector(state => state.cart.amount)
    const [total, setTotal] = useState()
    const [checked, setChecked] = useState([]);
    const handleAddcart = async (product, amount) => {
        const cartss = JSON.parse(sessionStorage.getItem('cart'))
        try {
            const res = await getProductByIdService(product)
            const data = res && res.data ? res.data : ''

            let check = false
            const newCart = cart && cart.length > 0 && cart.map(obj => {
                if (obj.productId === product) {
                    check = true
                    if (obj.count === 1 && amount === -1) {
                        return {
                            ...obj,
                            count: 1,
                            total: obj.price
                        }
                    }
                    else {
                        return {
                            ...obj,
                            count: obj.count + amount,
                            total: parseInt(obj.price * (obj.count + amount))
                        };
                    }
                }

                return obj;
            });
            if (check) {
                sessionStorage.setItem('cart', JSON.stringify(newCart))
                dispatch(changeCart(newCart))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSetcart = async (e) => {
        const amount = parseInt(e.target.value)
        const product = e.target.name
        let amount1 = amount
        if (e.target.value < 1) {
            amount1 = 1
        }
        const cartss = JSON.parse(sessionStorage.getItem('cart'))
        try {
            const res = await getProductByIdService(product)
            const data = res && res.data ? res.data : ''

            let check = false
            const newCart = cart && cart.length > 0 && cart.map(obj => {
                if (obj.productId === product) {
                    check = true
                    if (obj.count > 0)
                        return {
                            ...obj,
                            count: amount1,
                            total: obj.price * amount1
                        };
                }

                return obj;
            });
            if (check) {
                sessionStorage.setItem('cart', JSON.stringify(newCart))
                dispatch(changeCart(newCart))
            }
        } catch (error) {
            console.log(error)
        }
    }
    function VND(x) {
        return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
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
    const handleSwitchPaymet = () => {
        if (checked.length > 0) {
            dispatch(checkCart(checked))
            dispatch(userPayment(total))
            navigate('/payment')
        } else {
            handelNotify('warn', 'Chọn sản phẩm cần thanh toán')
        }

    }
    const handleSwitchShopping = () => {
        navigate('/products')
    }
    const deleteCart = (e) => {
        let array = [...cart]; // make a separate copy of the array
        cart.map((item, index) => {
            if (item.productId == e) {
                array.splice(index, 1)
                return
            }
        })
        dispatch(changeCart(array))
        sessionStorage.setItem('cart', JSON.stringify(array))
    }
    useEffect(() => {
        let totalPrice = 0, totalSale = 0, total = 0, amount = 0, amountcheck = 0

        cart && cart.length > 0 &&
            cart.map((item, index) => {
                amount += parseInt(item.count);
                checked && checked.length > 0 &&
                    checked.map((item1, index) => {
                        if (item1.productId == item.productId) {
                            amountcheck += item.count
                            totalPrice += item.total;
                            if (item.saleCodeId)
                                totalSale += ((item.price * item.percent) / 100) * item.count
                        }
                    })
            })
        total = totalPrice - totalSale
        setTotal({
            totalPrice: totalPrice,
            totalSale: totalSale,
            total: total,
            amount: amountcheck
        })
        dispatch(changeAmount(amount))
        sessionStorage.setItem('amount', amount)
    }, [checked, cart])
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
            <div className="container cartbody">
                <div className='row'>
                    <h4 className='switchPage'><FontAwesomeIcon icon={faHouse} className='fa-icon' /> Trang Chủ / <span className='cartText'>Giỏ Hàng</span></h4>
                </div>
                {/* <div className='row'></div>
            <div className='col-lg-9'>
                <FontAwesomeIcon icon={faHistory} className='fa-icon iconHistory' />
            </div> */}
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
                                        {cart && cart.length > 0 &&
                                            cart.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div className="form-check">
                                                                <input onChange={handleCheck} value={JSON.stringify(item)} className="form-check-input" type="checkbox" id="check1" name="option1" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="aside"><img src={process.env.REACT_APP_URL_IMG + item.img1} className="img-thumbnail" /></div>

                                                        </td>
                                                        <td><p className="text-break">{item.name}</p></td>
                                                        <td>
                                                            <div className='product-amount'>
                                                                <input type='number' onChange={handleSetcart} name={item.productId} value={item.count} step="1" min="1" max="999" />
                                                                <button onClick={() => handleAddcart(item.productId, 1)} value='1' className='amount-plus'>
                                                                    +
                                                                </button>
                                                                <button onClick={() => handleAddcart(item.productId, -1)} value='-1' className='amount-minus'>
                                                                    -
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="price-wrap"><p className="text-break">{VND(item.price)}</p></div>

                                                        </td>
                                                        <td><div className="price-wrap"><p className="text-danger">{VND(item.total)}</p></div></td>
                                                        <td><FontAwesomeIcon button onClick={() => deleteCart(item.productId)} icon={faTrashCan} className='fa-trash' /></td>
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
                                <hr /> <a onClick={handleSwitchPaymet} className="btn btn-out btn-danger btn-square btn-main" data-abc="true"> Tiến hành thanh toán </a> <a onClick={handleSwitchShopping} className="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Tiếp tục mua hàng</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Cart
import 'bootstrap/dist/css/bootstrap.min.css'
import './cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faCircleXmark, faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
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
            console.log(checked)
            console.log(total)
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
            <div class="container cartbody">
                <div className='row'>
                    <h4 className='switchPage'><FontAwesomeIcon icon={faHouse} className='fa-icon' /> Trang Chủ / <span class='cartText'>Giỏ Hàng</span></h4>
                </div>
                <div className='row'>
                    <h3 className='titleGiohang'>Chi tiết đơn hàng</h3>
                </div>
                {/* <div className='row'></div>
            <div className='col-lg-9'>
                <FontAwesomeIcon icon={faHistory} className='fa-icon iconHistory' />
            </div> */}
                <div class="row mt-2">
                    <aside class="col-lg-9">
                        <div class="card">
                            <div class="table-responsive">
                                <table class="table table-borderless table-shopping-cart">
                                    <thead class="text-muted">
                                        <tr class="small">
                                            <th scope="col" width="50">Chọn</th>
                                            <th scope="col" width="250">Hình ảnh</th>
                                            <th scope="col" width="250">Tên sản phẩm</th>
                                            <th scope="col" width="120">Số lượng</th>
                                            <th scope="col" width="250" >Đơn giá</th>
                                            <th scope="col" width="250">Tổng cộng</th>
                                            <th scope="col" class="" width="50">Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart && cart.length > 0 &&
                                            cart.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div class="form-check">
                                                                <input onChange={handleCheck} value={JSON.stringify(item)} class="form-check-input" type="checkbox" id="check1" name="option1" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="aside"><img src={'http://localhost:1912/static/product/image/' + item.img1} class="img-thumbnail" /></div>

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
                                                        <td><div className="price-wrap"><p className="text-break">{VND(item.total)}</p></div></td>
                                                        <td><FontAwesomeIcon icon={faCircleXmark} className='fa-icon' /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </aside>
                    <aside class="col-lg-3">
                        {/* <div class="card mb-3">
                        <div class="card-body">
                            <form>
                                <div class="form-group"> <label>Have coupon?</label>
                                    <div class="input-group"> <input type="text" class="form-control coupon" name="" placeholder="Coupon code" /> <span class="input-group-append"> <button class="btn btn-primary btn-apply coupon">Apply</button> </span> </div>
                                </div>
                            </form>
                        </div>
                    </div> */}
                        <div class="card">
                            <div class="card-body">
                                <dl class="dlist-align">
                                    <dt>Tạm tính: </dt>
                                    <dd class="text-right ml-3">{total && VND(total.totalPrice)}</dd>
                                </dl>
                                <dl class="dlist-align">
                                    <dt>Giảm giá: </dt>
                                    <dd class="text-right text-danger ml-3">- {total && VND(total.totalSale)}</dd>
                                </dl>
                                <dl class="dlist-align">
                                    <dt>Tổng cộng: </dt>
                                    <dd class="text-right text-dark b ml-3"><strong>{total && VND(total.total)}</strong></dd>
                                </dl>
                                <hr /> <a onClick={handleSwitchPaymet} class="btn btn-out btn-primary btn-square btn-main" data-abc="true"> Tiến hành thanh toán </a> <a onClick={handleSwitchShopping} class="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Tiếp tục mua hàng</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Cart
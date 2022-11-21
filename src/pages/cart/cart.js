import 'bootstrap/dist/css/bootstrap.min.css'
import './cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
    }, [cart])
    return (
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
                                                            <input class="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="aside"><img src={'http://localhost:1912/static/product/image/' + item.img1} class="img-thumbnail" /></div>

                                                    </td>
                                                    <td><p className="text-break">{item.name}</p></td>
                                                    <td>
                                                        <div className='product-amount'>
                                                            <input type='number' name={item.id} value={item.count} step="1" min="1" max="999" />
                                                            <button className='amount-plus'>
                                                                +
                                                            </button>
                                                            <button className='amount-minus'>
                                                                -
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap"><p className="text-break">{item.price}</p></div>

                                                    </td>
                                                    <td><div className="price-wrap"><p className="text-break">{item.total}</p></div></td>
                                                    <td><FontAwesomeIcon icon={faTrash} className='fa-icon' /></td>
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
                                <dd class="text-right ml-3">$69.97</dd>
                            </dl>
                            <dl class="dlist-align">
                                <dt>Giảm giá: </dt>
                                <dd class="text-right text-danger ml-3">- $10.00</dd>
                            </dl>
                            <dl class="dlist-align">
                                <dt>Tổng cộng: </dt>
                                <dd class="text-right text-dark b ml-3"><strong>$59.97</strong></dd>
                            </dl>
                            <hr /> <a href="#" class="btn btn-out btn-primary btn-square btn-main" data-abc="true"> Make Purchase </a> <a href="#" class="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Continue Shopping</a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>

    )
}

export default Cart
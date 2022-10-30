import 'bootstrap/dist/css/bootstrap.min.css'
import './cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

const cart = () => {

    return (
        <div class="container cartbody">
            <div className='row'>
                <h4><FontAwesomeIcon icon={faHouse} className='fa-icon' /> Trang Chủ / <span class='cartText'>Giỏ Hàng</span></h4>
            </div>
            <div className='row'>
                <h3 className='titleGiohang'>Chi tiết đơn hàng</h3>
            </div>
            <div class="row mt-3">
                <aside class="col-lg-9">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-borderless table-shopping-cart">
                                <thead class="text-muted">
                                    <tr class="small">
                                        <th scope="col" width="250">Hình ảnh</th>
                                        <th scope="col" width="250">Tên sản phẩm</th>
                                        <th scope="col" width="120">Số lượng</th>
                                        <th scope="col" width="250" >Đơn giá</th>
                                        <th scope="col" width="250">Tổng cộng</th>
                                        <th scope="col" class="" width="200">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>

                                            <div class="aside"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" class="img-thumbnail" /></div>

                                        </td>
                                        <td><p class="text-break">Máy Ảnh Canon Powershot SX620</p></td>
                                        <td>
                                            <div className='product-amount'>
                                                <input type='number' step="1" min="1" max="999" />
                                                <button className='amount-plus'>
                                                    +
                                                </button>
                                                <button className='amount-minus'>
                                                    -
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="price-wrap"><p class="text-break">6,500,000 ₫</p></div>

                                        </td>
                                        <td><div class="price-wrap"><p class="text-break">65,000,000 ₫</p></div></td>
                                        <td><FontAwesomeIcon icon={faTrash} className='fa-icon' /></td>
                                    </tr>
                                    <tr>
                                        <td>

                                            <div class="aside"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" class="img-thumbnail" /></div>

                                        </td>
                                        <td><p class="text-break">Máy Ảnh Canon Powershot SX620</p></td>
                                        <td>
                                            <div className='product-amount'>
                                                <input type='number' step="1" min="1" max="999" />
                                                <button className='amount-plus'>
                                                    +
                                                </button>
                                                <button className='amount-minus'>
                                                    -
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="price-wrap"><p class="text-break">6,500,000 ₫</p></div>

                                        </td>
                                        <td><div class="price-wrap"><p class="text-break">65,000,000 ₫</p></div></td>
                                        <td><FontAwesomeIcon icon={faTrash} className='fa-icon' /></td>
                                    </tr>
                                    <tr>
                                        <td>

                                            <div class="aside"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" class="img-thumbnail" /></div>

                                        </td>
                                        <td><p class="text-break">Máy Ảnh Canon Powershot SX620</p></td>
                                        <td>
                                            <div className='product-amount'>
                                                <input type='number' step="1" min="1" max="999" />
                                                <button className='amount-plus'>
                                                    +
                                                </button>
                                                <button className='amount-minus'>
                                                    -
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="price-wrap"><p class="text-break">6,500,000 ₫</p></div>

                                        </td>
                                        <td><div class="price-wrap"><p class="text-break">65,000,000 ₫</p></div></td>
                                        <td><FontAwesomeIcon icon={faTrash} className='fa-icon' /></td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="aside"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" class="img-thumbnail" /></div>

                                        </td>
                                        <td><p class="text-break">Máy Ảnh Canon Powershot SX620</p></td>
                                        <td>
                                            <div className='product-amount'>
                                                <input type='number' step="1" min="1" max="999" />
                                                <button className='amount-plus'>
                                                    +
                                                </button>
                                                <button className='amount-minus'>
                                                    -
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="price-wrap"><p class="text-break">6,500,000 ₫</p></div>

                                        </td>
                                        <td><div class="price-wrap"><p class="text-break">65,000,000 ₫</p></div></td>
                                        <td><FontAwesomeIcon icon={faTrash} className='fa-icon' /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </aside>
                <aside class="col-lg-3">
                    <div class="card mb-3">
                        <div class="card-body">
                            <form>
                                <div class="form-group"> <label>Have coupon?</label>
                                    <div class="input-group"> <input type="text" class="form-control coupon" name="" placeholder="Coupon code" /> <span class="input-group-append"> <button class="btn btn-primary btn-apply coupon">Apply</button> </span> </div>
                                </div>
                            </form>
                        </div>
                    </div>
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

export default cart
import 'bootstrap/dist/css/bootstrap.min.css'
import './cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

const cart = () => {

    return (
        // <div class="container mt-5 mb-5">
        //     <div class="d-flex justify-content-center row">
        //         <div class="col-md-8">
        //             <div class="p-2">
        //                 <h4>Shopping cart</h4>
        //                 <div class="d-flex flex-row align-items-center pull-right"><span class="mr-1">Sort by:</span><span class="mr-1 font-weight-bold">Price</span><i class="fa fa-angle-down"></i></div>
        //             </div>
        //             <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
        //                 <div class="mr-1"><img class="rounded" src="https://i.imgur.com/XiFJkhI.jpg" width="70" /></div>
        //                 <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">Máy Ảnh Canon Powershot SX620</span>
        //                     <div class="d-flex flex-row product-desc">
        //                         <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
        //                         <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
        //                     </div>
        //                 </div>
        //                 <div class="d-flex flex-row align-items-center qty"><i className='text-danger'><FontAwesomeIcon icon={faMinus} className='fa-icon' /></i>
        //                     <h5 class="text-grey mt-1 mr-1 ml-1">12</h5><i className='text-success'><FontAwesomeIcon icon={faPlus} className='fa-icon' /></i></div>
        //                 <div className='d-flex flex-column align-items-center product-details'>
        //                     <span class="font-weight-bold">78,000,000</span>
        //                 </div>
        //                 <div class="d-flex align-items-center"><i className="text-danger"><FontAwesomeIcon icon={faTrash} className='fa-icon' /></i></div>
        //             </div>
        //             <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
        //                 <div class="mr-1"><img class="rounded" src="https://i.imgur.com/XiFJkhI.jpg" width="70" /></div>
        //                 <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">Basic T-shirt</span>
        //                     <div class="d-flex flex-row product-desc">
        //                         <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
        //                         <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
        //                     </div>
        //                 </div>
        //                 <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
        //                     <h5 class="text-grey mt-1 mr-1 ml-1">2</h5><i class="fa fa-plus text-success"></i></div>
        //                 <div>
        //                     <h5 class="text-grey">$20.00</h5>
        //                 </div>
        //                 <div class="d-flex align-items-center"><i className="text-danger"><FontAwesomeIcon icon={faTrash} className='fa-icon' /></i></div>
        //             </div>
        //             <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
        //                 <div class="mr-1"><img class="rounded" src="https://i.imgur.com/XiFJkhI.jpg" width="70" /></div>
        //                 <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">Basic T-shirt</span>
        //                     <div class="d-flex flex-row product-desc">
        //                         <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
        //                         <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
        //                     </div>
        //                 </div>
        //                 <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
        //                     <h5 class="text-grey mt-1 mr-1 ml-1">2</h5><i class="fa fa-plus text-success"></i></div>
        //                 <div>
        //                     <h5 class="text-grey">$20.00</h5>
        //                 </div>
        //                 <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger"></i></div>
        //             </div>
        //             <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
        //                 <div class="mr-1"><img class="rounded" src="https://i.imgur.com/XiFJkhI.jpg" width="70" /></div>
        //                 <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">Basic T-shirt</span>
        //                     <div class="d-flex flex-row product-desc">
        //                         <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
        //                         <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
        //                     </div>
        //                 </div>
        //                 <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
        //                     <h5 class="text-grey mt-1 mr-1 ml-1">2</h5><i class="fa fa-plus text-success"></i></div>
        //                 <div>
        //                     <h5 class="text-grey">$20.00</h5>
        //                 </div>
        //                 <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger"></i></div>
        //             </div>
        //             <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><input type="text" class="form-control border-0 gift-card" placeholder="discount code/gift card" /><button class="btn btn-outline-warning btn-sm ml-2" type="button">Apply</button></div>
        //             <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-secondary btn-block btn-lg ml-2 pay-button" type="button">Proceed to Pay</button></div>
        //         </div>
        //     </div>
        // </div>
        //=============================================================
        // <div class="container px-4 py-5 mx-auto">
        //     <div class="row d-flex justify-content-center">
        //         <div class="col-5">
        //             <h4 class="heading">Shopping Bag</h4>
        //         </div>
        //         <div class="col-7">
        //             <div class="row text-right">
        //                 <div class="col-4">
        //                     <h6 class="mt-2">Format</h6>
        //                 </div>
        //                 <div class="col-4">
        //                     <h6 class="mt-2">Quantity</h6>
        //                 </div>
        //                 <div class="col-4">
        //                     <h6 class="mt-2">Price</h6>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div class="row d-flex justify-content-center border-top">
        //         <div class="col-5">
        //             <div class="row d-flex">
        //                 <div class="book">
        //                     <img src="https://i.imgur.com/2DsA49b.jpg" class="book-img" />
        //                 </div>
        //                 <div class="my-auto flex-column d-flex pad-left">
        //                     <h6 class="mob-text">Thinking, Fast and Slow</h6>
        //                     <p class="mob-text">Daniel Kahneman</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="my-auto col-7">
        //             <div class="row text-right">
        //                 <div class="col-4">
        //                     <p class="mob-text">Digital</p>
        //                 </div>
        //                 <div class="col-4">
        //                     <div class="row d-flex justify-content-end px-3">
        //                         <p class="mb-0" id="cnt1">1</p>
        //                         <div class="d-flex flex-column plus-minus">
        //                             <span class="vsm-text plus">+</span>
        //                             <span class="vsm-text minus">-</span>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="col-4">
        //                     <h6 class="mob-text">$9.99</h6>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div class="row d-flex justify-content-center border-top">
        //         <div class="col-5">
        //             <div class="row d-flex">
        //                 <div class="book">
        //                     <img src="https://i.imgur.com/Oj1iQUX.jpg" class="book-img" />
        //                 </div>
        //                 <div class="my-auto flex-column d-flex pad-left">
        //                     <h6 class="mob-text">Homo Deus: A Brief<br />History of Tomorrow</h6>
        //                     <p class="mob-text">Yuval Noah Harari</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="my-auto col-7">
        //             <div class="row text-right">
        //                 <div class="col-4">
        //                     <p class="mob-text">Paperback</p>
        //                 </div>
        //                 <div class="col-4">
        //                     <div class="row d-flex justify-content-end px-3">
        //                         <p class="mb-0" id="cnt2">1</p>
        //                         <div class="d-flex flex-column plus-minus">
        //                             <span class="vsm-text plus">+</span>
        //                             <span class="vsm-text minus">-</span>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="col-4">
        //                     <h6 class="mob-text">$13.50</h6>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div class="row justify-content-center">
        //         <div class="col-lg-12">
        //             <div class="card">
        //                 <div class="row">
        //                     <div class="col-lg-3 radio-group">
        //                         <div class="row d-flex px-3 radio">
        //                             <img class="pay" src="https://i.imgur.com/WIAP9Ku.jpg" />
        //                             <p class="my-auto">Credit Card</p>
        //                         </div>
        //                         <div class="row d-flex px-3 radio gray">
        //                             <img class="pay" src="https://i.imgur.com/OdxcctP.jpg" />
        //                             <p class="my-auto">Debit Card</p>
        //                         </div>
        //                         <div class="row d-flex px-3 radio gray mb-3">
        //                             <img class="pay" src="https://i.imgur.com/cMk1MtK.jpg" />
        //                             <p class="my-auto">PayPal</p>
        //                         </div>
        //                     </div>
        //                     <div class="col-lg-5">
        //                         <div class="row px-2">
        //                             <div class="form-group col-md-6">
        //                                 <label class="form-control-label">Name on Card</label>
        //                                 <input type="text" id="cname" name="cname" placeholder="Johnny Doe" />
        //                             </div>
        //                             <div class="form-group col-md-6">
        //                                 <label class="form-control-label">Card Number</label>
        //                                 <input type="text" id="cnum" name="cnum" placeholder="1111 2222 3333 4444" />
        //                             </div>
        //                         </div>
        //                         <div class="row px-2">
        //                             <div class="form-group col-md-6">
        //                                 <label class="form-control-label">Expiration Date</label>
        //                                 <input type="text" id="exp" name="exp" placeholder="MM/YYYY" />
        //                             </div>
        //                             <div class="form-group col-md-6">
        //                                 <label class="form-control-label">CVV</label>
        //                                 <input type="text" id="cvv" name="cvv" placeholder="***" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div class="col-lg-4 mt-2">
        //                         <div class="row d-flex justify-content-between px-4">
        //                             <p class="mb-1 text-left">Subtotal</p>
        //                             <h6 class="mb-1 text-right">$23.49</h6>
        //                         </div>
        //                         <div class="row d-flex justify-content-between px-4">
        //                             <p class="mb-1 text-left">Shipping</p>
        //                             <h6 class="mb-1 text-right">$2.99</h6>
        //                         </div>
        //                         <div class="row d-flex justify-content-between px-4" id="tax">
        //                             <p class="mb-1 text-left">Total (tax included)</p>
        //                             <h6 class="mb-1 text-right">$26.48</h6>
        //                         </div>
        //                         <button class="btn-block btn-blue">
        //                             <span>
        //                                 <span id="checkout">Checkout</span>
        //                                 <span id="check-amt">$26.48</span>
        //                             </span>
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        //====================================
        <div class="container cartbody">
            <div class="row">
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
                                <dt>Total price:</dt>
                                <dd class="text-right ml-3">$69.97</dd>
                            </dl>
                            <dl class="dlist-align">
                                <dt>Discount:</dt>
                                <dd class="text-right text-danger ml-3">- $10.00</dd>
                            </dl>
                            <dl class="dlist-align">
                                <dt>Total:</dt>
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
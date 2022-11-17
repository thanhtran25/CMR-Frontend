import 'bootstrap/dist/css/bootstrap.min.css'
import './payment.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

const Payment = () => {

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
                                <input type="text" value='Tô Phương Dũng' className="form-control" />
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-secondary btnSua">Sửa</button>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-10'>
                                <input type="text" value='Địa chỉ giao hàng' className="form-control" />
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-secondary btnSua">Sửa</button>
                            </div>
                        </div>
                        <div className='row mt-4 pb-2'>
                            <div className='col-10'>
                                <input type="text" value='Số điện thoại' className="form-control" />
                            </div>
                            <div className='col-2'>
                                <button type="button" className="btn btn-secondary btnSua">Sửa</button>
                            </div>
                        </div>
                        <hr className='my-hr-line' />
                        <div className='row totalItem'>
                            <div className='col-10'>Đơn hàng (7 sản phẩm)</div>
                            <div className='col-2'><button type="button" className="btn btn-secondary btnSua">Sửa</button></div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-8'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div>
                            <div className='col-8 mt-3'>2 x Máy Ảnh Canon EOS 6D MarkII</div>
                            <div className='col-4 mt-3'>32,000,000 ₫</div>
                        </div>
                        <hr className='mt-4' />
                        <div className='row'>
                            <div className='col-8'>
                                Tạm tính
                            </div>
                            <div className='col-4'>
                                947,800,000 ₫
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
                                947,800,000 ₫
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
                                947,800,000 ₫
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
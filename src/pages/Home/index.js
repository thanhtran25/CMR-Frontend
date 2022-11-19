import React from 'react'
import Button from 'react-bootstrap/Button';
import './home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import cookies from 'react-cookies'
import { useState, useEffect } from 'react';
import { handelNotify } from '~/core/utils/req';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';
import { Notify } from '~/core/constant';
import { forgotPasswordService } from '~/service/authService';
function Home() {
    const [showAlertCf, setShowAlertCf] = useState(false);
    const hadelCheckHasPw = () => {
        if (cookies.load('hasPassword')) {
            if (cookies.load('hasPassword') === 'false') {
                setShowAlertCf({
                    open: true,
                    variant: Notify.WARNING,
                    text: 'Bạn muốn đặt lại mật khẩu cho tài khoản này không?',
                    title: 'Đặt lại mật khẩu',
                    backdrop: 'static',
                    onClick: () => handelChangePass()
                })
            }
        }
    }
    const handelChangePass = async () => {
        try {
            const email = {
                email: cookies.load('user').email
            }

            const data = await forgotPasswordService(email)
            cookies.save('hasPassword', 'true')
            console.log(data)
            setShowAlertCf({
                open: false
            })
            handelNotify('success', 'Thông tin đặt lại mật khẩu đã được gửi vào email của bạn')
        } catch (error) {

        }
    }
    const handelCloseCheck = async () => {
        cookies.save('hasPassword', 'true')
        setShowAlertCf({
            open: false
        })
    }
    useEffect(() => {
        hadelCheckHasPw()
    }, [])
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
                    <Button variant="secondary" onClick={handelCloseCheck}>
                        Hủy
                    </Button>
                    <Button onClick={showAlertCf.onClick} variant="primary">OK</Button>
                </Modal.Footer>
            </Modal>
            <div className="container homeContain" style={{ marginTop: '5rem', color: '#3A4048' }}>
                <h2 className="title"> SẢN PHẨM NỔI TRỘI </h2>
                <div className="row" style={{ paddingTop: '2%', alignItems: 'center' }}>
                    <div className="col-12 col-xl-4 section-clo" style={{ textAlign: 'center' }}>
                        <img src={require('~/assets/images/icon-mayanh.jpg')} alt="Hello Duck" width="140" height="140" />
                        <h2> Máy Ảnh </h2>
                        <p> Lựa chọn máy ảnh phù hợp với bạn. Nếu các bạn chưa biết sản phẩm nào phù hợp thì chúng tôi sẽ
                            giúp bạn.</p>
                        <div className="section-intro-button" onClick={hadelCheckHasPw} ><a href="#"> Xem Thêm
                            &raquo;</a></div>
                    </div>
                    <div className="col-12 col-xl-4 section-clo" style={{ textAlign: 'center' }}>
                        <img src={require('~/assets/images/icon-mayquay.png')} alt="Hello Duck" width="140" height="140" />
                        <h2> Máy Ảnh </h2>
                        <p> Lựa chọn máy ảnh phù hợp với bạn. Nếu các bạn chưa biết sản phẩm nào phù hợp thì chúng tôi sẽ
                            giúp bạn.</p>
                        <div className="section-intro-button" ><a href="#"> Xem Thêm
                            &raquo;</a></div>
                    </div>
                    <div className="col-12 col-xl-4 section-clo" style={{ textAlign: 'center' }}>
                        <img src={require('~/assets/images/icon-phukien.png')} alt="Hello Duck" width="140" height="140" />
                        <h2> Máy Ảnh </h2>
                        <p> Lựa chọn máy ảnh phù hợp với bạn. Nếu các bạn chưa biết sản phẩm nào phù hợp thì chúng tôi sẽ
                            giúp bạn.</p>
                        <div className="section-intro-button" ><a href="#"> Xem Thêm
                            &raquo;</a></div>
                    </div>
                </div>
                <hr />

                <div className="row section-row" style={{ paddingTop: '2%', alignItems: 'center' }}>
                    <div className='col-xl-4'>
                        <img className="section-mid-img" src={require('~/assets/images/mayanh-gioithieu.jpg')} width="400px" height="400px"
                            alt="Generic placeholder image" />
                    </div>
                    <div className='col-xl-8'>
                        <h2> Máy ảnh tuyệt đỉnh. Hình ảnh tuyệt đẹp.</h2>
                        <p> Xứng tầm cột mốc mới, mở ra tầm nhìn nhiếp ảnh vượt trội, mang đến khả năng biểu đạt từng chi
                            tiết ở đẳng cấp chuyên nghiệp với tốc độ bắt nét cực nhanh đến kinh ngạc trong thân máy nhỏ gọn.
                            Độ cứng cáp với khả năng kết nối xuất sắc tăng thêm hiệu suất cho bạn. </p>
                    </div>

                </div>
                <div className="row section-row" style={{ paddingTop: '2%', alignItems: 'center' }}>
                    <div className='col-xl-8'>
                        <h2> Lưu lại những thước phim. Tạo nên nhiều kỉ niệm đáng nhớ. </h2>
                        <p> Thân máy nhỏ gọn, tích hợp mọi tính năng để mang lại những thước phim tuyệt đẹp. kèm theo khả
                            năng lấy nét siêu nhanh. Tính năng theo dõi trong thời gian thực và lấy nét tự động theo ánh
                            mắt. Chất lượng âm thanh bắt âm thanh cực xa.</p>
                    </div>
                    <div className='col-xl-4'>
                        <img className="section-mid-img" src={require('~/assets/images/mayquay-gioithieu.jpg')} width="400px" height="400px"
                            alt="Generic placeholder image" />
                    </div>
                </div>
                <div className="row section-row" style={{ paddingTop: '2%', alignItems: 'center' }}>
                    <div className='col-xl-4'>
                        <img className="section-mid-img" src={require('~/assets/images/phukien-gioithieu.jpg')} width="400px" height="400px"
                            alt="Generic placeholder image" />
                    </div>
                    <div className='col-xl-8'>
                        <h2> Phụ kiện tuyệt vời.Tạo nên thiết bị hoàn hảo.</h2>
                        <p> Có rất nhiều phụ kiện cho để bạn lựa chọn. Giúp cho thiết bị của bạn thêm phần chuyên nghiệp,
                            khiến độ zoom cực xa cực kì sắc nét. Làm cho thiết bị của bạn an toàn, kéo dài thời gian sử
                            dụng. Để bạn làm chủ mọi khoảng khắc trong cuộc đời.</p>
                    </div>

                </div>
                <hr />
                <h2 className="title" style={{ textAlign: 'center', paddingBottom: '3rem' }}> MÁY ẢNH </h2>
                <div className="section-row row">
                    <div className='col-xl-5'>
                        <img className="section-mid-img" src={require('~/assets/images/mayanh-tieubieu.jpg')} width="460px" height="600px"
                            alt="Generic placeholder image" />
                    </div>
                    <div className="col-xl-7" style={{ alignItems: 'center', margin: '0 auto' }}>
                        <div className="col-xl-4">
                            <div className="product">

                                <div class="picture1">
                                    <img className="product-img img" src={require('~/assets/images/cam-6-1-2.jpg')} alt="Canon" />
                                </div>
                                <div class="picture2">
                                    <img className="product-img img" src={require('~/assets/images/cam-6-1-1.jpg')} alt="Canon" />
                                </div>
                                <div className="product-info">
                                    <h3>Máy Ảnh Nikon D750 Powershot - Black III</h3>
                                    <span>2,290,000 đ</span>
                                </div>
                                <div className="product-action" >
                                    <ul className="product-action-icon-front product-action-a">
                                        <li>
                                            <button className="tooltip" href="#" data-tip="Chi Tiết">
                                                <FontAwesomeIcon icon={faSearch} className='fa-icon' />
                                            </button>
                                        </li>
                                        <li >
                                            <button className="tooltip" href="#" data-tip="Thêm Vào Giỏ Hàng">
                                                <FontAwesomeIcon icon={faShoppingBasket} className='fa-icon' />
                                            </button>
                                        </li>
                                        <li>
                                            <button className="tooltip" href="#" data-tip="Mua Ngay">
                                                <FontAwesomeIcon icon={faShoppingCart} className='fa-icon' />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

            </div>

        </>
    )
}

export default Home;
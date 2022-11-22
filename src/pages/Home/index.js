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
import { getProductsService } from '~/service/productService';
import { useNavigate } from "react-router-dom";
function Home() {
    const limit = 10
    const navigate = useNavigate();
    const [showAlertCf, setShowAlertCf] = useState(false);
    const [productnew, setProductnew] = useState({
        limit: limit,
        page: 1,
        sortBy: 'desc',
        sort: 'createdAt',
        sale: '',
    });
    const [products, setProducts] = useState()
    const getListProducts = async (list) => {
        try {
            const res = await getProductsService(list)
            const data = (res && res.data) ? res.data : [];
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        }
    }
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
    function VND(x) {
        return x = x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    let path = <div></div>
    function oldPrice(price, percent) {
        path = ''
        if (percent != 0) {
            const x = price;
            path = <a href='#' className='percent'>{percent}%</a>
            return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        }
        return '';
    }
    const handelCloseCheck = async () => {
        cookies.save('hasPassword', 'true')
        setShowAlertCf({
            open: false
        })
    }
    const handleClickDetail = (item) => {
        navigate('/product/' + item)
    }
    useEffect(() => {
        hadelCheckHasPw()
    }, [])
    useEffect(() => {
        getListProducts(productnew)
        console.log(products)
    }, [productnew])
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
            <div className="container homeContain" style={{ marginTop: '3rem', color: '#3A4048' }}>
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
                    <div className='col-0 col-xl-4'>
                        <img className="section-mid-img" src={require('~/assets/images/mayanh-gioithieu.jpg')} width="90%"
                            alt="Generic placeholder image" />
                    </div>
                    <div className='col-0 col-xl-8'>
                        <h2> Máy ảnh tuyệt đỉnh. Hình ảnh tuyệt đẹp.</h2>
                        <p> Xứng tầm cột mốc mới, mở ra tầm nhìn nhiếp ảnh vượt trội, mang đến khả năng biểu đạt từng chi
                            tiết ở đẳng cấp chuyên nghiệp với tốc độ bắt nét cực nhanh đến kinh ngạc trong thân máy nhỏ gọn.
                            Độ cứng cáp với khả năng kết nối xuất sắc tăng thêm hiệu suất cho bạn. </p>
                    </div>

                </div>
                <div className="row section-row" style={{ paddingTop: '2%', alignItems: 'center' }}>
                    <div className='col-0 col-xl-8'>
                        <h2> Lưu lại những thước phim. Tạo nên nhiều kỉ niệm đáng nhớ. </h2>
                        <p> Thân máy nhỏ gọn, tích hợp mọi tính năng để mang lại những thước phim tuyệt đẹp. kèm theo khả
                            năng lấy nét siêu nhanh. Tính năng theo dõi trong thời gian thực và lấy nét tự động theo ánh
                            mắt. Chất lượng âm thanh bắt âm thanh cực xa.</p>
                    </div>
                    <div className='col-0 col-xl-4'>
                        <img className="section-mid-img" src={require('~/assets/images/mayquay-gioithieu.jpg')} width="90%"
                            alt="Generic placeholder image" />
                    </div>
                </div>
                <div className="row section-row" style={{ paddingTop: '2%', alignItems: 'center' }}>
                    <div className='col-0 col-xl-4'>
                        <img className="section-mid-img" src={require('~/assets/images/phukien-gioithieu.jpg')} width="90%"
                            alt="Generic placeholder image" />
                    </div>
                    <div className='col-0 col-xl-8'>
                        <h2> Phụ kiện tuyệt vời.Tạo nên thiết bị hoàn hảo.</h2>
                        <p> Có rất nhiều phụ kiện cho để bạn lựa chọn. Giúp cho thiết bị của bạn thêm phần chuyên nghiệp,
                            khiến độ zoom cực xa cực kì sắc nét. Làm cho thiết bị của bạn an toàn, kéo dài thời gian sử
                            dụng. Để bạn làm chủ mọi khoảng khắc trong cuộc đời.</p>
                    </div>

                </div>
                <hr className='col-0' />
                <h2 className="title" style={{ textAlign: 'center', paddingBottom: '3rem' }}> MỚI NHẤT </h2>
                <div className="row">
                    {products && products.length > 0 &&
                        products.map((item, index) => {
                            return (
                                <div className=' col-10 offset-1 offset-md-0 col-md-6 col-lg-4 col-2-4 mt-4'>
                                    <div className="product">

                                        <div class="picture1">
                                            <img className="product-img img" src={'http://localhost:1912/static/product/image/' + item.img1} alt="Canon" width="90%" />
                                        </div>
                                        <div class="picture2">
                                            <img className="product-img img" src={'http://localhost:1912/static/product/image/' + item.img2} alt="Canon" width="90%" />
                                        </div>
                                        <div className="product-info">
                                            <p>{item.name}</p>
                                            <span>{VND(item.price * (100 - item.percent) / 100)} </span> <br></br>
                                            <p style={{ height: "20px" }}><del> {oldPrice(item.price, item.percent)}</del>  {path}</p>
                                        </div>
                                        <ul className="product-action-icon-front product-action-a">
                                            <li>
                                                <button className="tooltip" href="#" data-tip="Chi Tiết">
                                                    <FontAwesomeIcon onClick={() => handleClickDetail(item.id)} icon={faSearch} className='fa-icon' />
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
                            )
                        })
                    }

                </div>
                <hr />

            </div>

        </>
    )
}

export default Home;
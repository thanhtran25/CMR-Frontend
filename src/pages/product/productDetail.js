import 'bootstrap/dist/css/bootstrap.min.css'
import './productDetail.scss'
import { useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';

const ProductDetail = () => {
    const [detail, setDetail] = useState({
        img1: 'https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg',
        img2: 'https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_2.jpg'
    });
    return (
        <div className="container bodyDetail">
            <div className="card1">
                <div className="container-fliud">
                    <div className="wrapper row">
                        <div className="preview col-md-6">

                            <div className="preview-pic tab-content">
                                <div className="tab-pane active" id="pic-1"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" /></div>
                            </div>
                            <ul className="preview-thumbnail nav nav-tabs">
                                <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" /></a></li>
                                <li><a data-target="#pic-2" data-toggle="tab"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_2.jpg" /></a></li>
                            </ul>

                        </div>
                        <div className="details col-md-6">
                            <h3 className="product-title">Máy Quay Canon XF 405</h3>
                            <h6 className="price">Thương hiệu: <span>canon</span></h6>
                            <h6 className="price">Giá bán: <span>$180</span></h6>
                            <h6 className="price">Giá khuyến mãi: <span>$180</span></h6>
                            {/* <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p> */}
                            <h6 className="price">Số lượng: </h6>
                            <div className='product-amount'>
                                <input type='number' step="1" min="1" max="999" />
                                <button className='amount-plus'>
                                    +
                                </button>
                                <button className='amount-minus'>
                                    -
                                </button>
                            </div>
                            <h5>Mô tả</h5>
                            <p className="product-description">Máy ảnh siêu siêu siêu siêu siêu siêu siêu siêu xịn</p>

                            <div className="action">
                                <button className="add-to-cart btn btn-default" type="button">add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductDetail
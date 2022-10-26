import 'bootstrap/dist/css/bootstrap.min.css'
import './productDetail.scss'
import { useState } from 'react'

const ProductDetail = () => {
    const [detail, setDetail] = useState({
        img1: 'https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg',
        img2: 'https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_2.jpg'
    });
    return (
        // <div className="container">
        //     <div className="row">
        //         <div ><h1>Product Name</h1></div>
        //         <hr />
        //         <div className="col-12">
        //         </div>
        //         <div className="col-6">
        //             <div className="row">
        //                 <div className="col-12">
        //                     <img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" className="img-fluid" alt="Responsive image" />
        //                 </div>
        //             </div>
        //             <div className="thumb">
        //                 <ul>
        //                     <li>
        //                         <a href='#'>
        //                             <img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" alt="Responsive image">
        //                             </img>
        //                         </a>
        //                     </li>
        //                     <li>
        //                         <a href='#'>
        //                             <img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_2.jpg" alt="Responsive image">
        //                             </img>
        //                         </a>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //         <div className="col-6">
        // <table className="table">
        //     <tbody>
        //         <tr>

        //             <td>Mã sản phẩm</td>
        //             <td>1025</td>
        //         </tr>
        //         <tr>
        //             <td>Giá bán</td>
        //             <td>368,000,000 ₫ VNĐ Tiết kiệm 20%</td>
        //         </tr>
        //         <tr>
        //             <td>Giá Khuyến Mãi</td>
        //             <td>294,400,000 ₫</td>
        //         </tr>
        //         <tr>
        //             <td>Thương hiệu</td>
        //             <td>canon</td>
        //         </tr>

        //     </tbody>
        // </table>
        //         </div>
        //     </div>
        // </div>
        <div class="container">
            <div class="card">
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">

                            <div class="preview-pic tab-content">
                                <div class="tab-pane active" id="pic-1"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" /></div>
                            </div>
                            <ul class="preview-thumbnail nav nav-tabs">
                                <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_1.jpg" /></a></li>
                                <li><a data-target="#pic-2" data-toggle="tab"><img src="https://natcam-production.s3.amazonaws.com/product-103241471-images/103241471_2.jpg" /></a></li>
                            </ul>

                        </div>
                        <div class="details col-md-6">
                            <h3 class="product-title">Máy Quay Canon XF 405</h3>
                            <h6 class="price">Thương hiệu: <span>canon</span></h6>
                            <h6 class="price">Giá bán: <span>$180</span></h6>
                            <h6 class="price">Giá khuyến mãi: <span>$180</span></h6>
                            <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                            <h6 class="price">Số lượng: </h6>
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
                            <p class="product-description">Máy ảnh siêu siêu siêu siêu siêu siêu siêu siêu xịn</p>

                            <div class="action">
                                <button class="add-to-cart btn btn-default" type="button">add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductDetail
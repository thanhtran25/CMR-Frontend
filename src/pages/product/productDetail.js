import 'bootstrap/dist/css/bootstrap.min.css'
import './productDetail.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { getProductByIdService } from '~/service/productService';
import { getBrandByIdService } from '~/service/brandService';
import { getCategoryByIdService } from '~/service/categoryService';

const ProductDetail = () => {
    const { id } = useParams();
    const [images, setImages] = useState('');
    const [showImg, setShowImg] = useState('')
    const [product, setProducts] = useState('')

    const getProduct = async () => {
        try {
            const respro = await getProductByIdService(id);
            const data1 = respro && respro.data ? respro.data : [];
            const resbra = await getBrandByIdService(data1.brandId)
            const data2 = resbra && resbra.data ? resbra.data : [];
            const rescate = await getCategoryByIdService(data1.categoryId)
            const data3 = rescate && rescate.data ? rescate.data : [];
            setProducts({
                ...data1,
                brandId: data2.name,
                categoryId: data3.name
            })
            setImages(data1.img1);
        } catch (error) {

        }
    }
    const handleClickImage = (img) => {
        setImages(img);
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div className="container bodyDetail">
            <div className="card1">
                <div className="container">
                    <div className="wrapper row">
                        <div className="preview col-md-5">
                            <div className="preview-pic tab-content">
                                <div className="tab-pane active" id="pic-1"><img className="img-fluid" src={'http://localhost:1912/static/product/image/' + images} /></div>
                            </div>
                            <ul className="preview-thumbnail nav nav-tabs">
                                <li><a data-target="#pic-1" data-toggle="tab"><img onClick={() => handleClickImage(product.img1)} className="img-thumbnail" src={'http://localhost:1912/static/product/image/' + product.img1} /></a></li>
                                <li><a data-target="#pic-2" className='ml-3' data-toggle="tab"><img onClick={() => handleClickImage(product.img2)} className="img-thumbnail" src={'http://localhost:1912/static/product/image/' + product.img2} /></a></li>
                            </ul>
                        </div>
                        <div className="details col-md-7">
                            <h3 className="product-title">{product.name}</h3>
                            <h6 className="price">Thương hiệu: <span>{product.brandId}</span></h6>
                            <h6 className="price">Giá bán: <span>{product.price}</span></h6>
                            <h6 className="price">Giá khuyến mãi: <span>{product.percent}</span></h6>
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
                            <p className="product-description">{product.description}</p>

                            <div className="action">
                                <button className="add-to-cart btn btn-default" type="button">
                                    <FontAwesomeIcon icon={faCartShopping} className='fa-icon' />
                                    <span>       </span>Thêm giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductDetail
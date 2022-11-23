import 'bootstrap/dist/css/bootstrap.min.css'
import './productDetail.scss'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { getProductByIdService } from '~/service/productService';
import { getBrandByIdService } from '~/service/brandService';
import { getCategoryByIdService } from '~/service/categoryService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { changeCart } from '~/store/action/cartAction';
import { handelNotify } from '~/core/utils/req';
import { ToastContainer } from 'react-toastify';

const ProductDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart);
    const { id } = useParams();
    const [images, setImages] = useState('');
    const [showImg, setShowImg] = useState('')
    const [product, setProducts] = useState('')
    const [isActive, setIsActive] = useState(false);
    const [count, setCount] = useState(1)

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
    const handleChangeCount = (e) => {
        const value = parseInt(e.target.value)
        console.log(value)
        if (e.target.value < 1) {
            setCount(1)
        }
        else {
            setCount(value)
        }
    }
    const handleCickCount = (e) => {
        const value = parseInt(e.target.value)
        if (count === 1 && value === -1) {
            setCount(1)
        }
        else {
            setCount(count + value)
        }
    }
    const handleAddcart = async (product, amount, type) => {
        const cartss = JSON.parse(sessionStorage.getItem('cart'))
        if (sessionStorage.getItem('amount')) {
            sessionStorage.setItem('amount', parseInt(sessionStorage.getItem('amount')) + parseInt(amount))
        } else {
            sessionStorage.setItem('amount', parseInt(parseInt(amount)))
        }
        try {
            const res = await getProductByIdService(product)
            const data = res && res.data ? res.data : ''
            const datafill = {
                img1: data.img1,
                name: data.name,
                percent: data.percent,
                price: data.price,
                saleCodeId: data.saleCodeId,
                count: amount,
                productId: data.id,
                total: parseInt(data.price * amount)

            }
            let check = false
            const newCart = cart && cart.length > 0 && cart.map(obj => {
                if (obj.productId === product) {
                    check = true
                    return {
                        ...obj,
                        count: parseInt(obj.count + amount),
                        total: parseInt(obj.price * (obj.count + amount))
                    };
                }

                return obj;
            });
            if (!cartss) {
                sessionStorage.setItem('cart', JSON.stringify([datafill]))
                dispatch(changeCart([datafill]))
            }
            if (check) {
                sessionStorage.setItem('cart', JSON.stringify(newCart))
                dispatch(changeCart(newCart))
            } else if (cartss && !check) {
                sessionStorage.setItem('cart', JSON.stringify([...cart, datafill]))
                dispatch(changeCart([...cart, datafill]))
            }
            if (type === 'addcart') {
                handelNotify('success', 'Thêm vào giỏ hàng thành công')
            }
            if (type === 'buy') {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
        }
    }
    const handleClickImage = (img) => {
        setImages(img);
        setIsActive(current => !current);
    };
    function VND(x) {
        return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    useEffect(() => {
        getProduct()
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
            <div className="container bodyDetail">
                <div className="card1">
                    <div className="container" style={{ marginTop: '10%' }}>
                        <div className="row">
                            <div className="tab-pane wrapper preview col-md-5">
                                <div className="preview-pic tab-content">
                                    <div className=" active" id="pic-1"><img className="img-fluid" src={process.env.REACT_APP_URL_IMG + images} alt="" /></div>
                                </div>
                            </div>
                            <div className="wrapper details col-md-7">
                                <h3 className="product-title px-3">{product.name}</h3>
                                <h6 className="price px-3">Thương hiệu: <span>{product.brandId}</span></h6>
                                <h6 className="price px-3">Giá bán: <span>{product && product.price && VND(product.price)}</span></h6>
                                <h6 className="price px-3">Giá khuyến mãi:
                                    <span>{product && product.price && VND(product.price * (100 - product.percent) / 100)}</span>
                                    <del>{product.percent}</del>
                                </h6>
                                <h6 className="price px-3">Số lượng: </h6>
                                <div className='count-product mx-3'>
                                    <input onChange={handleChangeCount} type='number' step="1" min="1" max="999" value={count} />
                                    <button onClick={handleCickCount} value='1' className='amount-plus'>
                                        +
                                    </button>
                                    <button onClick={handleCickCount} value='-1' className='amount-minus'>
                                        -
                                    </button>
                                </div>
                                <h6 className="price mt-3 px-3">Mô tả:</h6>
                                <p className="product-description px-3">{product.description}</p>


                            </div>
                            <div className='wrapper tab-pane2 preview col-md-5 mt-2 py-2'>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    <li>
                                        <a href='#pic-1' data-target="#pic-1" data-toggle="tab">
                                            <img
                                                onClick={(e) => handleClickImage(product.img1, e)}
                                                className={!isActive ? 'my-img-thumbnail my-img-thumbnail-active' : 'my-img-thumbnail'}
                                                src={process.env.REACT_APP_URL_IMG + product.img1}
                                                alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#pic-2' data-target="#pic-2" className='ml-3' data-toggle="tab">
                                            <img
                                                onClick={() => handleClickImage(product.img2)}
                                                className={isActive ? 'my-img-thumbnail my-img-thumbnail-active' : 'my-img-thumbnail'}
                                                src={process.env.REACT_APP_URL_IMG + product.img2}
                                                alt=""
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="wrapper preview col-md-7"><div className="action">
                                <button onClick={() => handleAddcart(product.id, count, 'addcart')} className="add-to-cart buy btn" type="button">
                                    <FontAwesomeIcon icon={faCartShopping} className='fa-icon' />
                                    <span>       </span>Thêm giỏ hàng
                                </button>
                                <button onClick={() => handleAddcart(product.id, count, 'buy')} className="add-to-cart btn buy-now" type="button">
                                    <span>       </span>Mua ngay
                                </button>
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProductDetail
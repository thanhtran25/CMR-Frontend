import './productbody.scss'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getProductsService, getProductByIdService } from '~/service/productService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { choseCategories } from '~/store/action/productAction';
import { getBrandsService, getBrandByIdService } from '~/service/brandService';
import Select from 'react-select'

const ProductBody = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const categoryId = useSelector(state => state.product.categoryId);
    const cart = useSelector(state => state.product.cart);
    const [products, setProducts] = useState('')
    const [brand, setBrand] = useState('')
    const [pagination, SetPagination] = useState('')
    const [banner, SetBanner] = useState('')
    const limit = 12
    const selectPagination = (page) => {
        let content = [];
        for (let i = 1; i <= page; i++) {
            content.push({
                pageNumber: i,
            });
        }

        return content
    }
    const handelChange = (i) => {
        const searchPdt = {
            ...categoryId,
            page: i
        }
        dispatch(choseCategories(searchPdt));
    }
    const getListProducts = async (list) => {
        const limit = {
            limit: 10
        }
        try {
            const res = await getProductsService(list)
            const data = (res && res.data) ? res.data : [];
            const resBrand = await getBrandsService(limit)
            const data1 = (resBrand && resBrand.data) ? resBrand.data : [];
            SetPagination(selectPagination(data.totalPage))
            setProducts(data.products)
            setBrand(data1)
        } catch (error) {
            console.log(error)
        }
    }
    const handleChangeBrand = (e) => {
        const searchPdt = {
            ...categoryId,
            brandId: e.target.value,
            name: ''
        }
        dispatch(choseCategories(searchPdt));
    }
    const handleSwitchDetail = (id) => {
        navigate('/product/' + id)
    }
    const handleSortByPrice = (e) => {
        const value = e.target.value
        const sort = {
            ...categoryId,
            sort: 'price',
            sortBy: value,
            name: ''
        }
        dispatch(choseCategories(sort));
    }
    const handleSortByNew = () => {
        const sort = {
            ...categoryId,
            sort: 'createdAt',
            sortBy: 'desc',
            sale: '',
            name: ''
        }
        dispatch(choseCategories(sort));
    }
    const handleSortAll = () => {
        const searchPdt = {
            limit: 12,
            page: 1,
            name: '',
            brandId: '',
            categoryId: '',
            description: '',
            sortBy: '',
            sort: '',
        }
        dispatch(choseCategories(searchPdt));
    }
    const hanleSortBySale = () => {
        const sort = {
            ...categoryId,
            sale: 'sale',
            name: ''
        }
        dispatch(choseCategories(sort));
    }
    const handleAddcart = async (product) => {
        try {
            const res = await getProductByIdService(product)
            const data = res && res.data ? res.data : ''
            let addcart = (prevcart => {
                const product = prevcart.product
            }
            )


        } catch (error) {

        }
    }
    useEffect(() => {

        getListProducts(categoryId)
    }, [categoryId])
    return (
        <>
            <img
                className="d-block w-100 slide"
                src={require('~/assets/images/banner-1.jpg')}
                style={{ maxHeight: '450px' }}
            />
            <div className='container'>
                <div className='row'>

                    <div className='col-2'>
                        <h2 className='text-filter'>Sắp xếp:</h2>
                    </div>
                    <div className='col-10 mt-3'>


                        <button onClick={handleSortAll} type="button" className="profile-rep">Tất cả</button>


                        <button onClick={handleSortByNew} type="button" className="profile-rep">Mới nhất</button>


                        <button onClick={hanleSortBySale} type="button" className="profile-rep">Đang khuyến mãi</button>


                        <button onClick={handleSortByPrice} value='asc' type="button" className="profile-rep">Giá tăng dần</button>


                        <button onClick={handleSortByPrice} value='desc' type="button" className="profile-rep">Giá giảm dần</button>


                        <select onChange={handleChangeBrand} name="brand" className='profile-rep' >
                            <option value="">Thương hiệu</option>
                            {
                                brand &&
                                brand.brands.map(item => {
                                    return (<option value={item.id}>{item.name}</option>)
                                })
                            }
                        </select>


                    </div>



                </div>
                <div className="row">

                    {
                        products && products.length > 0 &&
                        products.map(item => {
                            return (
                                <div className="col-12 col-sm-6 mb-2 col-md-3">
                                    <div className="product">

                                        <div class="picture1">
                                            <img className="product-img img" src={'http://localhost:1912/static/product/image/' + item.img1} alt="Canon" />
                                        </div>
                                        <div class="picture2">
                                            <img className="product-img img" src={'http://localhost:1912/static/product/image/' + item.img2} alt="Canon" />
                                        </div>
                                        <div className="product-info">
                                            <h3>{item.name}</h3>
                                            <span>{item.price}</span>
                                        </div>
                                        <div className="product-action" >
                                            <ul className="product-action-icon-front product-action-a">
                                                <li>
                                                    <button onClick={() => handleSwitchDetail(item.id)} className="tooltip" href="#" data-tip="Chi Tiết">
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
                            )
                        })}
                </div>
                <nav className="mt-4">
                    <ul id="pagination" className="pagination justify-content-center">
                        {
                            pagination && pagination.length > 0 &&
                            pagination.map(item => {
                                return (<li class="page-item" active><button onClick={e => handelChange(item.pageNumber)} class="page-link">{item.pageNumber}</button></li>)
                            })
                        }

                    </ul>
                </nav>
            </div>
        </>
    )
}
export default ProductBody;
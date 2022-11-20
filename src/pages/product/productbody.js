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
            SetPagination(selectPagination(data.totalPage))
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        }
    }
    const getBrands = async () => {
        try {
            const resBrand = await getBrandsService(limit)
            const data1 = (resBrand && resBrand.data) ? resBrand.data : [];
            setBrand(data1)
        } catch (error) {

        }
    }
    const handleChangeBrand = (e) => {
        if (e.value) {
            const searchPdt = {
                ...categoryId,
                brandId: e.value,
                name: ''
            }
            dispatch(choseCategories(searchPdt));
        }
    }
    const handleSwitchDetail = (id) => {
        navigate('/product/' + id)
    }
    const handleSortByPrice = (e) => {
        const value = e.value
        const sort = {
            ...categoryId,
            sort: 'price',
            sortBy: value,
            name: ''
        }
        dispatch(choseCategories(sort));
    }
    const handleFiter = (e) => {
        let fill = {}
        if (e.value === 'all') {
            fill = {
                limit: 12,
                page: 1,
                name: '',
                brandId: '',
                categoryId: '',
                description: '',
                sortBy: '',
                sort: '',
            }
        }
        if (e.value === 'new') {
            fill = {
                ...categoryId,
                sort: 'createdAt',
                sortBy: 'desc',
                sale: '',
                name: ''
            }
        }
        if (e.value === 'sale') {
            fill = {
                ...categoryId,
                sale: 'sale',
                name: ''
            }
        }
        dispatch(choseCategories(fill));
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
    const optionsfiter = [
        { value: 'all', label: 'Tất cả' },
        { value: 'new', label: 'Mới nhất' },
        { value: 'sale', label: 'Đang khuyến mãi' }
    ]
    const optionsprice = [
        { value: '', label: 'Giá' },
        { value: 'desc', label: 'Giảm dần' },
        { value: 'asc', label: 'Tăng dần' }
    ]
    const [optionsbrands, setOptionsbrands] = useState([{ value: '', label: 'Thượng hiệu' },])
    useEffect(() => {
        getListProducts(categoryId)
    }, [categoryId])
    useEffect(() => {
        setOptionsbrands([{ value: '', label: 'Thượng hiệu' },])
        if (brand) {
            brand.brands.map((item, index) => {
                setOptionsbrands(current => [...current, { value: item.id, label: item.name }]);
            }
            )
        }
    }, [brand])
    useEffect(() => {
        getBrands()
    }, [])
    return (
        <>
            <img
                className="d-block w-100 slide"
                src={require('~/assets/images/banner-1.jpg')}
                style={{ maxHeight: '450px' }}
            />
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-4 mb-2'>
                        <div className='row'>
                            <div className='col-8'>
                                <div className='row'>
                                    <div className='col-2'>
                                        <span className='text-filter'>Sắp xếp:</span>
                                    </div>
                                    <div className='col-3'>
                                        <Select
                                            onChange={handleFiter}
                                            defaultValue={optionsfiter[0]}
                                            options={optionsfiter}

                                        />
                                    </div>
                                    <div className='col-3'>
                                        <Select
                                            onChange={handleSortByPrice}
                                            defaultValue={optionsprice[0]}
                                            options={optionsprice}

                                        />
                                    </div>
                                    <div className='col-3'>
                                        <Select
                                            onChange={handleChangeBrand}
                                            defaultValue={optionsbrands[0]}
                                            options={optionsbrands}

                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>




                <div className="row">

                    {
                        products && products.length > 0 &&
                        products.map((item, index) => {
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
                            pagination.map((item, index) => {
                                return (<li class="page-item" active><button onClick={e => handelChange(item.pageNumber)} class="page-link">{item.pageNumber}</button></li>)
                            })
                        }

                    </ul>
                </nav>
            </div >
        </>
    )
}
export default ProductBody;
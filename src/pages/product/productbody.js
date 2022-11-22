import './productbody.scss'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getProductsService, getProductByIdService } from '~/service/productService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { choseCategories } from '~/store/action/productAction';
import { changeCart } from '~/store/action/cartAction';
import { getBrandsService, getBrandByIdService } from '~/service/brandService';
import Select from 'react-select'
import { current } from '@reduxjs/toolkit';
import Addcart from '~/core/utils/changecart';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProductBody = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const categoryId = useSelector(state => state.product.categoryId);
    const cart = useSelector(state => state.cart.cart);
    const [products, setProducts] = useState('')
    const [brand, setBrand] = useState('')
    const [pagination, SetPagination] = useState('')
    const [banner, SetBanner] = useState('')
    const limit = 24
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
            limit: 24
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
                limit: 24,
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
    const handleAddcart = async (product, amount) => {
        const cartss = JSON.parse(sessionStorage.getItem('cart'))
        if (sessionStorage.getItem('amount')) {
            sessionStorage.setItem('amount', parseInt(sessionStorage.getItem('amount')) + amount)
        } else {
            sessionStorage.setItem('amount', parseInt(1))
        }
        console.log(sessionStorage.getItem('amount'))
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
                total: data.price * amount

            }
            let check = false
            const newCart = cart && cart.length > 0 && cart.map(obj => {
                if (obj.productId === product) {
                    check = true
                    return {
                        ...obj,
                        count: obj.count + amount,
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

        } catch (error) {
            console.log(error)
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
    const [searchPdt, setSearchPdt] = useState('')
    const handleChangeSearchPdt = e => {
        const value = e.target.value;
        setSearchPdt(value);
    }
    const handeClickSearch = () => {
        const name = {
            limit: 12,
            page: 1,
            name: searchPdt,
            brandId: '',
            categoryId: '',
            description: '',
            sortBy: '',
            sort: '',
        }
        dispatch(choseCategories(name))
    }
    const optionsfiter = [
        { value: 'all', label: 'Tất cả' },
        { value: 'new', label: 'Mới nhất' },
        { value: 'sale', label: 'Khuyến mãi' }
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
                className="d-block w-100"
                src={require('~/assets/images/banner-1.jpg')}
                style={{ maxHeight: '300px' }}
            />
            <div >
                <div className='container' style={{ backgroundColor: '#ffffff' }}>
                    <div className='row'>
                        <div className='col-12 mt-4 mb-2'>
                            <div className='row' >
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-1 btn border' disabled>
                                            Lọc
                                        </div>
                                        <div className='col-4 col-md-2'>
                                            <Select
                                                onChange={handleFiter}
                                                defaultValue={optionsfiter[0]}
                                                options={optionsfiter}
                                            />
                                        </div>
                                        <div className='col-4  col-md-2'>
                                            <Select
                                                onChange={handleSortByPrice}
                                                defaultValue={optionsprice[0]}
                                                options={optionsprice}

                                            />
                                        </div>
                                        <div className='col-4 col-md-2'>
                                            <Select
                                                onChange={handleChangeBrand}
                                                defaultValue={optionsbrands[0]}
                                                options={optionsbrands}

                                            />
                                        </div>
                                        <div className='col-7 offset-1 col-xl-5 offset-xl-0'>
                                            <div className='search-bar '>
                                                <Form className="d-flex">
                                                    <Form.Control
                                                        type="search"
                                                        placeholder="...Search"
                                                        className="me-2"
                                                        aria-label="Search"
                                                        onChange={handleChangeSearchPdt}
                                                    />
                                                    <Button onClick={handeClickSearch} variant="warning">Search</Button>
                                                </Form>
                                            </div>
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
                                    <div className="offset-md-0 col-md-6 col-lg-4 col-2-4 mt-4">
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
                                            <ul className="product-action-icon-front">
                                                <li>
                                                    <button onClick={() => handleSwitchDetail(item.id)} className="tooltip" href="#" data-tip="Chi Tiết">
                                                        <FontAwesomeIcon icon={faSearch} className='fa-icon' />
                                                    </button>
                                                </li>
                                                <li >
                                                    <button onClick={() => handleAddcart(item.id, 1)} className="tooltip" href="#" data-tip="Thêm Vào Giỏ Hàng">
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
            </div>

        </>
    )
}
export default ProductBody;
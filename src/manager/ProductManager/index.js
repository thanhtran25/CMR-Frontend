import React, { useState, useEffect } from 'react';

import './productManager.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Layout/AdminLayout/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faCalendar } from '@fortawesome/free-solid-svg-icons';

import { getProductService, createProductService } from '~/service/productService';
import { getBrandService } from '~/service/brandService';
import { getCategoriesService } from '~/service/categoriesService';

import { validateFull, validateProduct } from '~/core/utils/validate';
import { Notify, Gender, Roles } from '~/core/constant';
import { handleError, handelNotify } from '~/core/utils/req';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

function ProductManager() {

    const [showAdd, setShowAdd] = useState(false);
    const handleshowAdd = () => {
        SetAddValidate('')
        setAddProduct({
            name: '',
            price: '',
            description: '',
            brandId: '',
            categoryId: '',
            saleCodeId: 0,
            warrantyPeriod: '',
        })
        setShowAdd(true)
    };
    const [showRepair, setShowRepair] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [searchProduct, setSearchProduct] = useState({
        page: 1,
        limit: 4,
        sort: '',
        sortBy: '',
        description: '',
        name: '',
        brandId: '',
        categoryId: '',
        saleCodeId: '',
    });
    const getListProduct = async () => {
        try {
            const res = await getProductService(searchProduct);
            const data = (res && res.data) ? res.data : [];
            setProduct(data.products);
        } catch {

        }
    }
    const [brand, setBrand] = useState({
        page: 1,
        limit: 4,
        sort: '',
        sortBy: '',
        name: '',
    });
    const getListBrand = async () => {
        try {
            const res = await getBrandService(brand);
            const data = (res && res.data) ? res.data : [];
            setBrand(data.brands);
        } catch {

        }
    }
    const [categories, setCategories] = useState({
        page: 1,
        limit: 4,
        sort: '',
        sortBy: '',
        name: '',
    });
    const getListCategories = async () => {
        try {
            const res = await getCategoriesService(categories);
            const data = (res && res.data) ? res.data : [];
            setCategories(data.categories);
        } catch {

        }
    }

    useEffect(() => {
        getListProduct();
        getListBrand();
        getListCategories();
    }, [searchProduct])
    const [product, setProduct] = useState();
    const [files, setFile] = useState([]);
    const [addProduct, setAddProduct] = useState({
        name: '',
        price: '',
        description: '',
        brandId: '',
        categoryId: '',
        saleCodeId: 0,
        warrantyPeriod: '',
    });
    const [addValidate, SetAddValidate] = useState('');

    const handleChangeAddProduct = (e) => {
        const value = e.target.value;
        setAddProduct({
            ...addProduct,
            [e.target.name]: value
        });
    }
    const handleChangeBrand = (e) => {
        setAddProduct({
            ...addProduct,
            brandId: e.target.value
        });
    }
    const handleChangeCategories = (e) => {
        setAddProduct({
            ...addProduct,
            categoryId: e.target.value
        });
    }
    const handleChangeWarranty = (e) => {
        setAddProduct({
            ...addProduct,
            warrantyPeriod: e.target.value
        });
    }

    const handleChangeFiles = (e) => {
        setFile({
            files: e.target.files,
        })

    }
    const handleClickAddProduct = async () => {

        let bodyFormData = new FormData();
        for (let key in files.files) {
            bodyFormData.append('images', files.files[key]);
        }
        bodyFormData.append('name', addProduct.name);
        bodyFormData.append('price', addProduct.price);
        bodyFormData.append('description', addProduct.description);
        bodyFormData.append('brandId', addProduct.brandId);
        bodyFormData.append('categoryId', addProduct.categoryId);
        bodyFormData.append('warrantyPeriod', addProduct.warrantyPeriod);
        const isValid = validateProduct(bodyFormData);
        SetAddValidate(isValid);
        if (Object.keys(isValid).length > 0) return
        try {
            const data = await createProductService(bodyFormData);
            const req = handleError(data.request)
            setShowAdd(false);
            handelNotify('success', 'Thêm sản phẩm thành công')
            setProduct(prevState => [...prevState, data.data]);

        } catch (error) {
            const req = handleError(error.request)
            handelNotify('success', req)
        }

    }
    return (
        <>
            <div id="main" className="layout-navbar">
                <Header />
                <div id="main-content">
                    <div className="page-heading">
                        <div className="col-sm-6">
                            <h6>Tìm Kiếm</h6>
                            <div id="search-product-form" name="search-product-form">
                                <div className="form-group position-relative has-icon-right">
                                    <input id="serch-product-text" type="text" className="form-control" placeholder="Tìm kiếm" />
                                    <div className="form-control-icon">
                                        <i className="bi bi-search"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-title">
                            <div className="row">
                                <div className="col-12 col-md-7 order-md-1 order-last">
                                    <label>
                                        <h3>Danh sách sản phẩm</h3>
                                    </label>
                                    <label>
                                        <h5 style={{ marginLeft: '50px', marginRight: '10px' }}> Lọc Theo:</h5>
                                    </label>
                                    <select className="btn btn btn-primary" name="search-cbb" id="cars-search">
                                        <option>Tất Cả</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-5 order-md-2 order-first">

                                    <div className=" loat-start float-lg-end mb-3">
                                        <button id='btn-delete-product' className="btn btn-danger">
                                            <i className="bi bi-trash-fill"></i> Xóa sản phẩm
                                        </button>
                                        <button id='btn-createproduct' className="btn btn-primary" onClick={handleshowAdd}>
                                            <i className="bi bi-plus"></i> Thêm sản phẩm
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="section">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table mb-0 table-danger" id="table1">
                                            <thead>
                                                <tr>
                                                    <th>Chọn</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Giá sản phẩm</th>
                                                    <th>Hình ảnh 1</th>
                                                    <th>Hình ảnh 2</th>
                                                    <th>Tác vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    product && product.length > 0 &&
                                                    product.map(item => {
                                                        let s = 'table-info';
                                                        if ((product.indexOf(item) + 1) % 2 !== 0) {
                                                            s = 'table-light';
                                                        } return (
                                                            <tr className={s}>
                                                                <td>{item.id}</td>
                                                                <td className='text-break'>{item.name}</td>
                                                                <td className='text-break'>{item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                                <td className='text-break'>
                                                                    <div className="productmanager">
                                                                        <img className="imgmanager" src={'http://localhost:1912/static/product/image/' + item.img1} alt="Canon" />
                                                                    </div>
                                                                </td>
                                                                <td className='text-break'>
                                                                    <div className="productmanager">
                                                                        <img className="imgmanager" src={'http://localhost:1912/static/product/image/' + item.img2} alt="Canon" />
                                                                    </div>
                                                                </td>
                                                                <td className='text-break'>
                                                                    <pre>
                                                                        <button ><FontAwesomeIcon icon={faCalendar} className='fa-icon pr-2' /></button><span>  </span>
                                                                        <button ><FontAwesomeIcon icon={faScrewdriverWrench} className='fa-icon' /></button><span>  </span>
                                                                        <button ><FontAwesomeIcon icon={faTrash} className='fa-icon' /></button>
                                                                    </pre>
                                                                </td>
                                                            </tr>
                                                        )

                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <nav className="mt-5">
                                            <ul id="pagination" className="pagination justify-content-center">
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div>
                        <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thêm sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tên sản phẩm:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name='name'
                                            onChange={handleChangeAddProduct}
                                            autoFocus
                                        />
                                        {addValidate.name && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.name}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Thương hiệu:</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={handleChangeBrand}>
                                            <option value='0'>Chọn thương hiệu</option>
                                            {
                                                brand && brand.length > 0 &&
                                                brand.map(item => {
                                                    return (
                                                        <option value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }

                                        </Form.Select>
                                        {addValidate.brandId && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.brandId}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Danh mục:</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={handleChangeCategories}>
                                            <option value='0'>Chọn danh mục</option>
                                            {
                                                categories && categories.length > 0 &&
                                                categories.map(item => {
                                                    return (
                                                        <option value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        {addValidate.categoryId && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.categoryId}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Giá sản phẩm:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name='price'
                                            onChange={handleChangeAddProduct}
                                            autoFocus
                                        />
                                        {addValidate.price && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.price}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Chọn 2 ảnh sản phẩm:</Form.Label>
                                        <Form.Control type="file" multiple name="file" onChange={handleChangeFiles} />
                                        {addValidate.images && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.images}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Thời hạn bảo hành:</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={handleChangeWarranty}>
                                            <option value="0">Chọn thời hạn bảo hành</option>
                                            <option value="1">1 năm</option>
                                            <option value="2">2 năm</option>
                                            <option value="3">3 năm</option>
                                        </Form.Select>
                                        {addValidate.warrantyPeriod && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.warrantyPeriod}</p>}
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"

                                    >
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control name='description' onChange={handleChangeAddProduct} as="textarea" rows={3} />
                                        {addValidate.description && <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{addValidate.description}</p>}
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowAdd(false)}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={handleClickAddProduct}>
                                    Thêm
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal show={showRepair} onHide={() => setShowRepair(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sửa thông tin sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tên sản phẩm:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Thương hiệu:</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Chọn thương hiệu</option>
                                            <option value="1">Canon</option>
                                            <option value="2">...</option>
                                            <option value="3">...</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Danh mục:</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Chọn danh mục</option>
                                            <option value="1">Máy ảnh</option>
                                            <option value="2">...</option>
                                            <option value="3">...</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Kho:</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Chọn kho</option>
                                            <option value="1">Tp HCM</option>
                                            <option value="2">Hà Nội</option>
                                            <option value="3">...</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Giá sản phẩm:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Khuyến mãi:</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Chọn khuyến mãi</option>
                                            <option value="1">20/10/2022 ngày hội siêu sale phụ nữ</option>
                                            <option value="2">...</option>
                                            <option value="3">...</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Chọn 2 ảnh sản phẩm:</Form.Label>
                                        <Form.Control type="file" multiple />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Thời hạn bảo hành:</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Chọn thời hạn bảo hành</option>
                                            <option value="1">1 năm</option>
                                            <option value="2">...</option>
                                            <option value="3">...</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"

                                    >
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowRepair(false)}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={() => setShowRepair(false)}>
                                    Sửa
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div>
                        <Modal show={showDetail} onHide={() => setShowDetail(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thông tin chi tiết sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>ID sản phẩm:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tên sản phẩm:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Thương hiệu:</Form.Label>
                                        <Form.Select aria-label="Default select example" disabled readOnly>
                                            <option value="1">Canon</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Danh mục:</Form.Label>
                                        <Form.Select aria-label="Default select example" disabled readOnly>
                                            <option value="1">Máy ảnh</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Kho:</Form.Label>
                                        <Form.Select aria-label="Default select example" disabled readOnly>
                                            <option value="1">Tp HCM</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Giá sản phẩm:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            disabled
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Khuyến mãi:</Form.Label>
                                        <Form.Select aria-label="Default select example" disabled readOnly>
                                            <option value="1">20/10/2022 ngày hội siêu sale phụ nữ</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3" >
                                        <Form.Label>Hình ảnh 1</Form.Label>
                                        <img src={require('~/assets/images/cam-6-1-1.jpg')} width='100px' height='100px' />
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3" >
                                        <Form.Label>Hình ảnh 2</Form.Label>
                                        <img src={require('~/assets/images/cam-6-1-2.jpg')} width='100px' height='100px' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Thời hạn bảo hành:</Form.Label>
                                        <Form.Select aria-label="Default select example" disabled readOnly>
                                            <option value="1">1 năm</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                    >
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control as="textarea" rows={3} disabled readOnly />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDetail(false)}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductManager;
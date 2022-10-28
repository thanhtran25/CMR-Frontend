import React, { useState } from 'react';
import './productManager.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Layout/AdminLayout/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ProductManager() {
    const [showAdd, setShowAdd] = useState(false);
    const [showRepair, setShowRepair] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
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
                                        <button id='btn-createproduct' className="btn btn-primary" onClick={() => setShowAdd(true)}>
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
                                                    <th>ID</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Giá sản phẩm</th>
                                                    <th>Hình ảnh 1</th>
                                                    <th>Hình ảnh 2</th>
                                                </tr>
                                            </thead>
                                            <tbody>

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
                                        <Form.Control type="file" />
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
                                <Button variant="secondary" onClick={() => setShowAdd(false)}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={() => setShowAdd(false)}>
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
                                        <Form.Control type="file" />
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
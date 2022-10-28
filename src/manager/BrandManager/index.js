import React, { useState } from 'react';
import './brandManager.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Layout/AdminLayout/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function BrandManager() {
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
                            <div id="search-brand-form" name="search-brand-form">
                                <div className="form-group position-relative has-icon-right">
                                    <input id="serch-brand-text" type="text" className="form-control" placeholder="Tìm kiếm" />
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
                                        <h3>Danh sách thương hiệu</h3>
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
                                        <button id='btn-delete-brand' className="btn btn-danger">
                                            <i className="bi bi-trash-fill"></i> Xóa thương hiệu
                                        </button>
                                        <button id='btn-createbrand' className="btn btn-primary" onClick={() => setShowAdd(true)}>
                                            <i className="bi bi-plus"></i> Thêm thương hiệu
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
                                                    <th>Tên thương hiệu</th>
                                                    <th>Tác vụ</th>
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
                                <Modal.Title>Thêm thương hiệu</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tên thương hiệu:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
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
                                <Modal.Title>Sửa thông tin thương hiệu</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Tên thương hiệu:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            autoFocus
                                        />
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


                </div>
            </div >
        </>
    )
}

export default BrandManager;
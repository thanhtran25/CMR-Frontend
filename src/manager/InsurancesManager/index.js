import React from 'react';
import './insurancesManager.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '~/components/Layout/AdminLayout/Header';

function insurancesManager() {
    return (
        <>
            <div id="main" className="layout-navbar">
                <Header />
                <div id="main-content">
                    <div className="page-heading">
                        <div className="col-sm-6">
                            <h6>Tìm Kiếm</h6>
                            <div id="search-insurances-form" name="search-insurances-form">
                                <div className="form-group position-relative has-icon-right">
                                    <input id="serch-insurances-text" type="text" className="form-control" placeholder="Tìm kiếm" />
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
                                        <h3>Danh sách phiếu bảo hành</h3>
                                    </label>
                                    <label>
                                        <h5 style={{ marginLeft: '50px', marginRight: '10px' }}> Lọc Theo:</h5>
                                    </label>
                                    <select className="btn btn btn-primary" name="search-cbb" id="cars-search">
                                        <option>Tất Cả</option>
                                    </select>
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
                                                    <th>ID chi tiết sản phẩm</th>
                                                    <th></th>
                                                    <th></th>
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
                </div>
            </div >
        </>
    )
}

export default insurancesManager;
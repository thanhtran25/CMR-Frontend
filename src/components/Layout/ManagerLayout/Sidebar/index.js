import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCartFlatbed, faCheck, faDollar, faDollarSign, faHouse, faList, faMoneyBill, faMoneyCheckDollar, faTags, faTruckFieldUn } from '@fortawesome/free-solid-svg-icons';
import './sidebar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
    return (
        <div className="active sidebar">
            <div className="sidebar-wrapper active">
                <div className="sidebar-header">
                    <div className="d-flex justify-content-center">
                        <div className="logo">
                            <Link to="/homeManager"><img style={{ borderRadius: '100%' }} src={require('~/assets/images/logo.jpg')} alt="Logo" />
                            </Link>
                        </div>
                        <div className="toggler">
                            <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <NavLink to="/homeManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link" >
                                <FontAwesomeIcon icon={faHouse} />
                                <span>Trang chủ</span>
                            </span>
                        </NavLink>
                        <NavLink to="/productManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faCamera} />
                                <span>Quản lý sản phẩm</span>
                            </span>
                        </NavLink>
                        <NavLink to="/brandManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faCheck} />
                                <span>Quản lý thương hiệu</span>
                            </span>
                        </NavLink>
                        <NavLink to="/categoriesManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faList} />
                                <span>Quản lý danh mục</span>
                            </span>
                        </NavLink>
                        <NavLink to="/inventoriesManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faCartFlatbed} />
                                <span>Quản lý tồn kho</span>
                            </span>
                        </NavLink>
                        <NavLink to="/billManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faMoneyBill} />
                                <span>Quản lý hóa đơn</span>
                            </span>
                        </NavLink>
                        <NavLink to="/salecodeManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faTags} />
                                <span>Quản lý mã giảm giá</span>
                            </span>
                        </NavLink>
                        <NavLink to="/supplierManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faTruckFieldUn} />
                                <span>Quản lý nhà cung cấp</span>
                            </span>
                        </NavLink>
                        <NavLink to="/purchaseorderManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faDollarSign} />
                                <span>Quản lý đơn nhập hàng</span>
                            </span>
                        </NavLink>
                        <NavLink to="/insurancesManager" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                            <span className="sidebar-link">
                                <FontAwesomeIcon icon={faMoneyCheckDollar} />
                                <span>Quản lý phiếu bảo hành</span>
                            </span>
                        </NavLink>
                    </ul>
                </div>
                <button className="sidebar-toggler btn x">
                    <i data-feather="x"></i>
                </button>
            </div>
        </div>
    )
}

export default Sidebar;
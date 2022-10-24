import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, NavLink } from 'react-router-dom'
import './home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSearch, faShoppingBasket, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
function homeAdmin() {
    return (
        <>
            <div className="active sidebar">
                <div className="sidebar-wrapper active">
                    <div className="sidebar-header">
                        <div className="d-flex justify-content-center">
                            <div className="logo">
                                <Link to="/homeAdmin"><img style={{ borderRadius: '100%' }} src={require('~/assets/images/logo.jpg')} alt="Logo" />
                                </Link>
                            </div>
                            <div className="toggler">
                                <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <ul className="menu">
                            <NavLink to="/homeAdmin" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                                <span className="sidebar-link" >
                                    <FontAwesomeIcon icon={faHouse} />
                                    <span>Trang chủ</span>
                                </span>
                            </NavLink>
                            <NavLink to="/userAdmin" id="CN13" className={(navData) => "sidebar-item" + (navData.isActive ? " active" : " link")} >
                                <span className="sidebar-link">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Quản lý tài khoản</span>
                                </span>
                            </NavLink>
                        </ul>
                    </div>
                    <button className="sidebar-toggler btn x">
                        <i data-feather="x"></i>
                    </button>
                </div>
            </div>
            <div id="main" className="layout-navbar" style={{ backgroundColor: '#f2f7ff' }}>
                <div id="main-content">
                    <div className="page-heading">
                        <section id="content-types">
                            <div className="row">
                                <div className="col-xl-12 col-md-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <div id="carouselExampleControls" className="carousel slide1" data-bs-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active">
                                                        <img src={require('~/assets/images/banner-1.jpg')} className="d-block w-100" />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img src={require('~/assets/images/banner-2.jpg')} className="d-block w-100" />
                                                    </div>

                                                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                                                        data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    </a>
                                                    <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                                                        data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-4 col-md-4 col-sm-12">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="card-body">
                                                <h4 className="card-title">Hướng tới tương lai</h4>
                                                <img className="img-fluid w-100" src={require('~/assets/images/mayquay-gioithieu.jpg')} />
                                                <p className="card-text">

                                                    Là một hãng hàng không quốc tế năng động, hiện đại và mang đậm dấu ấn bản sắc văn hóa truyền thống Việt Nam, trong suốt hơn 20 năm phát triển với tốc độ tăng trưởng ở mức hai con số, Vietnam Airlines đã và đang dẫn đầu thị trường hàng không Việt Nam - một trong những thị trường nội địa có sức tăng trưởng nhanh nhất thế giới. Là hãng hàng không hiện đại với thương hiệu được biết đến rộng rãi nhờ bản sắc văn hóa riêng biệt, TDPQ Air đang hướng tới trở thành hãng hàng không quốc tế chất lượng 5 sao dẫn đầu khu vực châu Á.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4 col-sm-12">
                                    <div className="card collapse-icon accordion-icon-rotate">
                                        <div className="card-header" style={{ backgroundColor: '#fff', padding: '24px' }}>
                                            <h1 className="card-title pl-1">Phương châm</h1>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="accordion" id="cardAccordion">
                                                    Sự hài lòng của khách hàng là thành tựu lớn nhất mà chất lượng dịch vụ mang lại
                                                    Cùng với việc đảm bảo an toàn bay là nhiệm vụ số một, TPDQ Air cũng không ngừng nâng cao chất lượng dịch vụ, đảm bảo chỉ số đúng giờ để tăng sức cạnh tranh trong hàng không.
                                                </div>
                                            </div>
                                        </div>
                                        <img className="img-fluid w-80" src={require('~/assets/images/mayquay-gioithieu.jpg')} />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-4 col-sm-12">
                                    <div className="card collapse-icon accordion-icon-rotate">
                                        <div className="card-header" style={{ backgroundColor: '#fff', padding: '24px' }}>
                                            <h1 className="card-title pl-1">Vip Pro Team</h1>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="accordion" id="cardAccordion">
                                                    <div className="card">
                                                        <div id="headingFive" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" role="button">
                                                            <i className="bi bi-star"></i><span className="collapsed collapse-title"> Trần Thị Thu Thanh</span>
                                                        </div>
                                                        <div id="collapseFive" className="collapse pt-1" aria-labelledby="headingFive" data-parent="#cardAccordion">
                                                            <div className="card-body">
                                                                <img src="assets/images/faces/thuthanh.png" className="d-block w-100" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div id="headingEight" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight" role="button">
                                                            <i className="bi bi-star"></i><span className="collapsed  collapse-title"> Nguyễn Huỳnh Thanh Duy</span>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div id="headingEight" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight" role="button">
                                                            <i className="bi bi-star"></i><span className="collapsed  collapse-title"> Tô Phương Dũng</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}

export default homeAdmin;
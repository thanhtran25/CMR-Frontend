import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import './Cartbox.scss'
import { useNavigate } from "react-router-dom";
const CartBox = () => {
    const navigate = useNavigate();
    const [isOpen, setisOpen] = useState(false);
    const cart = useSelector(state => state.cart.cart);
    const wrapperRef = useRef();
    const showBox = () => {
        setisOpen(!isOpen);
    }
    function VND(x) {
        return x.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    const SwitchPageCart = () => {
        navigate('/cart')
    }
    useEffect(() => {
        console.log(cart)
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setisOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, []);
    return (
        <div className="popup-box" ref={wrapperRef}>
            <button className={isOpen === true ? "btn-click btn-popup" : "btn-popup"} onClick={() => showBox()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
            </button>
            <div className={isOpen === true ? "box-body" : "box-body box-hiden"}>
                <div className="box-content">
                    <div className="box-header">
                        <div className="box-title">SẢN PHẨM TRONG GIỎ HÀNG</div>
                        <button className="box-btn-close" onClick={() => showBox()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-x"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className="box-list-item">
                        {cart.map((element, index) => {
                            return (

                                <div className="box-item" key={index}>
                                    <div className="box-icon">
                                        <img src={'http://localhost:1912/static/product/image/' + element.img1} alt="" />
                                    </div>
                                    <div className="box-item-content">{element.name}</div>
                                    <div className="box-item-content-2" style={{ fontSize: '0.8rem', fontStyle: 'italic', marginLeft: '', textAlign: 'right' }}>{VND(element.price)}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div onClick={SwitchPageCart} className="box-footer">Xem tất cả</div>
                </div>
                <div className="box-triangle"></div>
            </div>
            <div className="box-number">{cart.length}</div>
        </div>
    )
}
export default React.memo(CartBox)
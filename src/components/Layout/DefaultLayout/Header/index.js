import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.scss';
const cx = classNames.bind(styles);
function Header() {
    return (
        <div>
            <div className={cx('header-topbar')}>

                <div className={cx('header-topbar-leftitems')}>
                    <a title='Facebook' href='https://www.facebook.com/kindaichicao' target='_blank'><FontAwesomeIcon icon={faSquareFacebook} className={cx('fa-icon')} /></a>
                    <a title='Instagram' href='https://www.instagram.com/thanh_tranthithu/' target='_blank'><FontAwesomeIcon icon={faInstagram} className={cx('fa-icon1')} /></a>
                    <a title='Twitter' href='#'><FontAwesomeIcon icon={faTwitter} className={cx('fa-icon')} /></a>
                    <a title='Youtube' href='https://www.youtube.com/channel/UC9sbR6aLg0ftGiC41ILVIlQ?view_as=subscriber' target='_blank'><FontAwesomeIcon icon={faYoutube} className={cx('fa-icon')} /></a>
                </div>

                <div className={cx('header-topbar-content')}>
                    <pre> G O L D    D U C K    C A M E R A </pre>
                </div>

                <div className={cx('search-bar')}>
                    <input type='text' name='search' className={cx('search-txt')} placeholder='Search ...' />
                    <a className={cx('search-btn')}>
                        <img src={require('~/assets/images/search.png')} alt='Hello Duck' />
                    </a>
                </div>


                <div className={cx('header-DKDN')}>
                    <a href='#' className={cx('shop-card')}>
                        <FontAwesomeIcon icon={faBasketShopping} className={cx('fa-icon')} style={{ fontSize: '22px', color: '#999999' }} />
                        <span className={cx('cart-count')}>0</span>
                    </a>

                    <button type='button' className={cx('Dkdn')}>Sign In</button>
                    {/* 
                    <a href='#' id='profile' onclick='trangcanhan()' style='display: none;'><i class='fa fa-user-circle-o' aria-hidden='true'></i></a>
                    <button type='button' id='logout' class='Dkdn2' onclick='logOut()' > Log Out </button>
                    */}

                </div>
            </div>
        </div>
    )

}

export default Header;
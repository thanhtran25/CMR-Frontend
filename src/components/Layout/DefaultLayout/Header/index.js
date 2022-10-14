import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faTwitter, faYoutube, faEmpire } from '@fortawesome/free-brands-svg-icons';
import { faCameraRetro, faVideo, faWrench, faPhone } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.scss';
const cx = classNames.bind(styles);
function Header() {
    const mystyle = {
        color: "yellow",
    };
    const mystylehover = {
        color: "yellow",
    };
    return (
        <header className={cx('header')}>
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
            </div>
            <div className={cx('header-menu')}>
                <a className={cx('logo')} href='#'>
                    <img src={require('~/assets/images/logo.jpg')} alt='Gold Duck Camera' />
                </a>
                <ul className={cx('ulcss')}>
                    <li><a href='#'><FontAwesomeIcon icon={faCameraRetro} className={cx('fa-icon')} />Camera</a></li>
                    <li><a href='#'><FontAwesomeIcon icon={faVideo} className={cx('fa-icon')} />Video Cam</a></li>
                    <li><a href='#'><FontAwesomeIcon icon={faEmpire} className={cx('fa-icon')} />Accessories</a></li>
                    <li><a href='#'><FontAwesomeIcon icon={faWrench} className={cx('fa-icon')} />Guarantee</a></li>
                    <li><a href='#'><FontAwesomeIcon icon={faPhone} className={cx('fa-icon')} />Contact</a></li>
                </ul>
            </div>
        </header >
    )

}

export default Header;
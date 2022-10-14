import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEmpire } from '@fortawesome/free-brands-svg-icons';
import { faCameraRetro, faVideo, faWrench, faPhone } from '@fortawesome/free-solid-svg-icons';
import styles from './sidebar.module.scss';
const cx = classNames.bind(styles);
function Sidebar() {
    return (
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
    )
}

export default Sidebar;
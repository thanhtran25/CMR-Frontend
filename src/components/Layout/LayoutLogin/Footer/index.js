import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className='footer-1' style={{ backgroundColor: '#1C2331', width: '100%' }}>
            <div className='container'>
            <div className='row'>
                <div className={cx('col-0 col-md-3 offset-1 pt-3')} >
                    <ul className={cx('text-md text-xl')}>
                        <li > <Link to='/' >MÁY ẢNH </Link><br /></li>
                        <li > <Link to='/products' style={{ color: 'rgb(211, 207, 207)' }}>MÁY QUAY</Link></li>
                        <li > <Link to='/products' style={{ color: 'rgb(211, 207, 207)' }}>PHỤ KIỆN</Link></li>
                        <li > <Link to='/guarantee' style={{ color: 'rgb(211, 207, 207)' }}>BẢO HÀNH </Link> </li>
                        <li > <Link to='/contact' style={{ color: 'rgb(211, 207, 207)' }}>LIÊN HỆ </Link> </li>
                    </ul>
                </div>
                <div className={cx('col-5 offset-1 pt-3 text-md-span')}>
                    <li><h6 style={{ color: 'rgb(211, 207, 207)' }} className={cx('text-md')}> Liên Hệ </h6></li>
                    <span style={{ color: 'rgb(211, 207, 207)' }}>
                        <FontAwesomeIcon icon={faHome} className={cx('fa-icon')} /> 273 An Dương Vương, Quận 5, TP. Hồ Chí Minh </span><br />
                    <span style={{ color: 'rgb(211, 207, 207)' }}>
                        <FontAwesomeIcon icon={faEnvelope} className={cx('fa-icon')} /> goldduckcamera@mailinator.com</span><br />
                    <span style={{ color: 'rgb(211, 207, 207)' }}>
                        <FontAwesomeIcon icon={faPhone} className={cx('fa-icon')} /> + 01 234 567 88</span><br />
                    <span style={{ color: 'rgb(211, 207, 207)' }}>
                        <FontAwesomeIcon icon={faPrint} className={cx('fa-icon')} /> + 01 234 567 89</span><br />
                </div>
            </div>
            </div>
           

        </footer>
    )

}

export default Footer;
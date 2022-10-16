import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import styles from './footer.module.scss';
const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer style={{ backgroundColor: '#1C2331', width: '100%' }}>

            <div className={cx('end')} style={{ marginLeft: '15%' }}>
                <ul >
                    <li > <a href='#'>CAMERA </a><br /></li>
                    <li > <a href='#'>VIDEO CAM</a></li>
                    <li > <a href='#'>ACCESSORIES</a></li>
                    <li > <a href='#'>GUARANTEE </a> </li>
                    <li > <a href='#'>CONTACT </a> </li>
                </ul>
            </div>
            <div className={cx('end')}>
                <ul>
                    <li><h6>Đồng Sáng Lập Tập Đoàn</h6></li>
                    <li><a target='_blank' href='https://www.facebook.com/kindaichicao/'>Trần Thị Thu Thanh (Chủ Tịch/CEO)</a></li>
                    <li><a target='_blank' href='https://www.facebook.com/Changdino.BLACKPINK'>Cao Nguyễn Phương Trang (Giám Đốc Sáng Tạo)</a></li>
                    <li><a target='_blank' href='https://www.facebook.com/tramanh.trinh.1441'>Trịnh Trâm Anh (Giám Đốc Marketing)</a></li>
                    <li><a target='_blank' href='https://www.facebook.com/tran.thanhtung.54738943'>Trần Thanh Tùng (Giám Đốc Nhân Sự)</a></li>
                </ul>
            </div>
            <div className={cx('end')}>
                <li><h6 > Liên Hệ </h6></li>
                <span>
                    <FontAwesomeIcon icon={faHome} className={cx('fa-icon')} /> 273 An Dương Vương, Quận 5, TP. Hồ Chí Minh </span><br />
                <span>
                    <FontAwesomeIcon icon={faEnvelope} className={cx('fa-icon')} /> goldduckcamera@gmail.com</span><br />
                <span>
                    <FontAwesomeIcon icon={faPhone} className={cx('fa-icon')} /> + 01 234 567 88</span><br />
                <span>
                    <FontAwesomeIcon icon={faPrint} className={cx('fa-icon')} /> + 01 234 567 89</span><br />
            </div>
            <div className={cx('copyright')}>
                <a href='#' style={{ fontSize: '12px' }} className={cx('f-left-1')}>© 2020 Copyright: goldduckcamera.com</a>
                <a target='_blank' style={{ fontSize: '12px', marginLeft: '2%' }} href='https://www.facebook.com/kindaichicao' className={cx('f-left-2')}><FontAwesomeIcon icon={faSquareFacebook} className={cx('fa-icon1')} /></a>
                <a target='_blank' style={{ fontSize: '12px' }} href='https://www.instagram.com/thanh_tranthithu/' className={cx('f-left-2')}><FontAwesomeIcon icon={faInstagram} className={cx('fa-icon2')} /></a>
                <a target='_blank' style={{ fontSize: '12px' }} href='#' className={cx('f-left-2')}><FontAwesomeIcon icon={faTwitter} className={cx('fa-icon3')} /></a>
                <a target='_blank' style={{ fontSize: '12px' }} href='https://www.youtube.com/channel/UC9sbR6aLg0ftGiC41ILVIlQ?view_as=subscriber' className={cx('f-left-2')}><FontAwesomeIcon icon={faYoutube} className={cx('fa-icon4')} /></a>
            </div>

        </footer>
    )

}

export default Footer;
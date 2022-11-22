import 'bootstrap/dist/css/bootstrap.min.css'
import './userprofile.scss'
import { useState } from 'react';
import { Gender } from '~/core/constant'
import { useDispatch, useSelector } from "react-redux"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import cookies from 'react-cookies';
import { updateUserService } from '~/service/userService';
import { userLogin } from '~/store/action/userAction';
import { Notify } from '~/core/constant';
const UserProfile = () => {
    const user = useSelector(state => state.user.user);
    const token = cookies.load('Token')
    const dispatch = useDispatch()
    const [userProfile, setUserProfile] = useState({
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        birthday: user.birthday,
        gender: user.gender,
        numberPhone: user.numberPhone,
        address: user.address
    });
    const [repair, setRepair] = useState(true)
    const [showAlertCf, setShowAlertCf] = useState(false);
    const handleChange = e => {
        const value = e.target.value;
        console.log(value)
        setUserProfile({
            ...userProfile,
            [e.target.name]: value
        });
    };
    const handleOnclickEdit = () => {
        setRepair(false)
    }
    const handleOnclickSave = () => {
        setShowAlertCf({
            open: true,
            variant: Notify.WARNING,
            text: 'Bạn chắc chắc thay đổi thông tin cá nhân',
            title: 'Xác nhận',
            backdrop: 'static',
            onClick: () => handleclickSaveCf()
        })
        // setRepair(true)
    }
    const handleclickSaveCf = async () => {
        try {
            const res = await updateUserService(userProfile, token)
            const data = res && res.data ? res.data : '';
            console.log(data)
            // dispatch(userLogin({...user}))
            setRepair(true)
        } catch (error) {

        }
    }
    let pathBtn = <input type="button" className="profile-edit-btn" onClick={handleOnclickEdit} name="btnAddMore" value="Edit Profile" />
    let pathFullname = <p>{userProfile.fullname}</p>
    let pathBirthday = <p>{userProfile.birthday}</p>
    let pathNumberPhone = <p>{userProfile.numberPhone}</p>
    let pathAddress = <p>{userProfile.address}</p>
    let pathGender = <p>{userProfile.gender}</p>
    if (!repair) {
        pathBtn = <input type="button" className="profile-save-btn" onClick={handleOnclickSave} name="btnAddMore" value="Save" />
        pathFullname = <input type="text" name='fullname' onChange={handleChange} className="form-control inputProfile" value={userProfile.fullname} />
        pathBirthday = <input type="date" name="birthday" onChange={handleChange} className="form-control inputProfile" value={userProfile.birthday} />
        pathNumberPhone = <input type="text" name="numberPhone" onChange={handleChange} className="form-control inputProfile" value={userProfile.numberPhone} />
        pathAddress = <input type="text" name="address" onChange={handleChange} className="form-control inputProfile" value={userProfile.address} />
        pathGender = (<div className='row' style={{ padding: '0 12px' }}>
            <div className="form-check col-4">
                <input className="form-check-input" type="radio" onChange={handleChange} checked={userProfile.gender === 'male'} value={Gender.MALE} name="gender" id="flexRadioDefault1" />
                <label className="form-check-label" for="flexRadioDefault1">
                    Nam
                </label>
            </div>
            <div className="form-check col-4">
                <input className="form-check-input" type="radio" onChange={handleChange} checked={userProfile.gender === 'female'} value={Gender.FEMALE} name="gender" id="flexRadioDefault2" />
                <label className="form-check-label" for="flexRadioDefault2">
                    Nữ
                </label>
            </div>
            <div className="form-check col-4">
                <input className="form-check-input" type="radio" onChange={handleChange} checked={userProfile.gender === 'other'} value={Gender.OTHER} name="gender" id="flexRadioDefault2" />
                <label className="form-check-label" for="flexRadioDefault2">
                    Khác
                </label>
            </div>
        </div>)
    }
    return (
        <>
            <Modal
                show={showAlertCf.open}
                onHide={() => setShowAlertCf({ open: false })}
                backdrop={showAlertCf.backdrop}
                keyboard={false}
            >
                <Modal.Header style={{ backgroundColor: showAlertCf.variant }} closeButton>
                    <Modal.Title>{showAlertCf.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showAlertCf.text}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAlertCf({ open: false })}
                    >
                        trở lại
                    </Button>
                    <Button onClick={showAlertCf.onClick} variant="primary">OK</Button>
                </Modal.Footer>
            </Modal>
            <div className="container">
                <form method="post">
                    <div className='row '>
                        <div className="emp-profile col-10 offset-1">
                            <div className='row p-5'>

                                <div className="col-md-2">
                                    {pathBtn}

                                </div>
                                <div className="col-md-8">
                                    <div className="tab-content profile-tab" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                            <div className="row">
                                                <div className="col-md-5">
                                                    <label >Name</label>
                                                </div>
                                                <div className="col-md-7">
                                                    {pathFullname}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5 mt-2">
                                                    <label >Birth Day</label>
                                                </div>
                                                <div className="col-md-7 mt-2">
                                                    {pathBirthday}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5 mt-2">
                                                    <label>Phone</label>
                                                </div>
                                                <div className="col-md-7 mt-2">
                                                    {pathNumberPhone}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5 mt-2">
                                                    <label>Address</label>
                                                </div>
                                                <div className="col-md-7 mt-2">
                                                    {pathAddress}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5 mt-2">
                                                    <label>Gender</label>
                                                </div>
                                                <div className="col-md-7 mt-2">
                                                    {pathGender}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserProfile
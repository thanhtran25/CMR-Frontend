import 'bootstrap/dist/css/bootstrap.min.css'
import './userprofile.scss'
import { useState } from 'react';
import { Gender } from '~/core/constant'
import { useSelector } from "react-redux"

const UserProfile = () => {
    let user = useSelector(state => state.user.user);
    console.log(user)
    const [userProfile, setUserProfile] = useState({
        email: user.email,
        fullname: user.fullname,
        birthday: user.birthday,
        gender: user.gender,
        numberPhone: user.numberPhone,
        address: user.address
    });

    const [repair, setRepair] = useState(true)
    const handleChange = e => {
        const value = e.target.value;

        setUserProfile({
            ...userProfile,
            [e.target.name]: value
        });
    };
    const handleOnclickEdit = () => {
        setRepair(false)
    }
    const handleOnclickSave = () => {
        setRepair(true)
    }
    let pathBtn = <input type="button" className="profile-edit-btn" onClick={handleOnclickEdit} name="btnAddMore" value="Edit Profile" />
    let pathFullname = <p>{userProfile.fullname}</p>
    let pathBirthday = <p>{userProfile.birthday}</p>
    let pathNumberPhone = <p>{userProfile.numberPhone}</p>
    let pathAddress = <p>{userProfile.address}</p>
    let pathGender = <p>{userProfile.gender}</p>
    if (!repair) {
        pathBtn = <input type="button" className="profile-save-btn" onClick={handleOnclickSave} name="btnAddMore" value="Save" />
        pathFullname = <input type="text" name='fullname' onChange={handleChange} class="form-control inputProfile" value={userProfile.fullname} />
        pathBirthday = <input type="date" name="birthday" onChange={handleChange} class="form-control inputProfile" value={userProfile.birthday} />
        pathNumberPhone = <input type="text" name="numberPhone" onChange={handleChange} class="form-control inputProfile" value={userProfile.numberPhone} />
        pathAddress = <input type="text" name="address" onChange={handleChange} class="form-control inputProfile" value={userProfile.address} />
        pathGender = (<div className='row' style={{ padding: '0 12px' }}>
            <div class="form-check col-4">
                <input class="form-check-input" type="radio" onChange={handleChange} value={Gender.MALE} name="gender" id="flexRadioDefault1" />
                <label class="form-check-label" for="flexRadioDefault1">
                    Nam
                </label>
            </div>
            <div class="form-check col-4">
                <input class="form-check-input" type="radio" onChange={handleChange} value={Gender.FEMALE} name="gender" id="flexRadioDefault2" />
                <label class="form-check-label" for="flexRadioDefault2">
                    Nữ
                </label>
            </div>
            <div class="form-check col-4">
                <input class="form-check-input" type="radio" onChange={handleChange} value={Gender.OTHER} name="gender" id="flexRadioDefault2" />
                <label class="form-check-label" for="flexRadioDefault2">
                    Khác
                </label>
            </div>
        </div>)
    }
    return (
        <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>
                                {userProfile.fullname}
                            </h5>
                            <h6>
                                {userProfile.email}
                            </h6>
                            <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        {pathBtn}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">

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
            </form>
        </div>
    )
}

export default UserProfile
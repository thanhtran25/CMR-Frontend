import 'bootstrap/dist/css/bootstrap.min.css'
import './userprofile.scss'
import { useState } from 'react';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState({
        name: "",
        birthday: "",
        gender: "",
        numberphone: "",
        address: ""
    });

    let path = <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />;

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
                                Kshiti Ghelani
                            </h5>
                            <h6>
                                kshitighelani@gmail.com
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
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="row">
                                    <div className="col-md-6">
                                        <label >Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        {/* <p>Kshiti Ghelani</p> */}
                                        <input type="text" class="form-control inputProfile" value="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-2">
                                        <label >Birth Day</label>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <input type="text" class="form-control inputProfile" value="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-2">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        {/* <p>123 456 7890</p> */}
                                        <input type="text" class="form-control inputProfile" value="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-2">
                                        <label>Address</label>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        {/* <p>123 abc</p> */}
                                        <input type="text" class="form-control inputProfile" value="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-2">
                                        <label>Gender</label>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        {/* <p>Nữ</p> */}
                                        <div className='row' style={{ padding: '0 12px' }}>
                                            <div class="form-check col-4">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Nam
                                                </label>
                                            </div>
                                            <div class="form-check col-4">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    Nữ
                                                </label>
                                            </div>
                                            <div class="form-check col-4">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    Khác
                                                </label>
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
    )
}

export default UserProfile
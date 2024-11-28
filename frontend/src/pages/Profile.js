import React, { useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ProfileSideBar from '../components/ProfileSideBar';
import ProfileContent from '../components/ProfileContent';
const Profile = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title="Profile" />
      <div className="profile-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            </div>
            <div className="col-3">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <div className="col-9">
              <ProfileContent active={active} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
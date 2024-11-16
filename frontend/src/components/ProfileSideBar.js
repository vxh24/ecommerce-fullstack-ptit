import React from 'react'
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
const ProfileSideBar = ({ setActive, active }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full bg-white shadow rounded p-4 pt-8">
        <div
          className="d-flex align-items-center cursor-pointer w-100 mb-3 gap-10"
          onClick={() => setActive(1)}
        >
          <RxPerson size={26} color={active === 1 ? "red" : ""} />
          <span
            className={` ${active === 1 ? "text-red" : ""
              } 800px:block hidden`}
          >
            Profile
          </span>
        </div>
        <div
          className="d-flex align-items-center cursor-pointer w-100 mb-3 gap-10"
          onClick={() => setActive(2)}
        >
          <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
          <span
            className={`pl-3 ${active === 2 ? "text-red" : ""
              } 800px:block hidden`}
          >
            Orders
          </span>
        </div>

        <div
          className="d-flex align-items-center cursor-pointer w-100 mb-3 gap-10"
          onClick={() => setActive(3)}
        >
          <AiOutlineMessage size={20} color={active === 3 ? "red" : ""} />
          <span
            className={`pl-3 ${active === 3 ? "text-red" : ""
              } 800px:block hidden`}
          >
            Inbox
          </span>
        </div>


        <div
          className="d-flex align-items-center cursor-pointer w-100 mb-3 gap-10"
          onClick={() => setActive(4)}
        >
          <RiLockPasswordLine size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`pl-3 ${active === 4 ? "text-red" : ""
              } 800px:block hidden`}
          >
            Change Password
          </span>
        </div>

        <div
          className="d-flex align-items-center cursor-pointer w-100 mb-3 gap-10"
          onClick={() => setActive(5)}
        >
          <TbAddressBook size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`pl-3 ${active === 5 ? "text-red" : ""
              } 800px:block hidden`}
          >
            Address
          </span>
        </div>

        <div
          className="d-flex align-items-center cursor-pointer w-100 mb-3 gap-10"
        // onClick={logoutHandler}
        >
          <AiOutlineLogin size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`pl-3 ${active === 6 ? "text-red" : ""
              } 800px:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </>
  )
}

export default ProfileSideBar
import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import {
  logout,
  resetAuthReducer,
  getUserProfile,
} from '../reducers/authSlice';
import Button from './Button';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RxAvatar } from 'react-icons/rx';
import { FiCreditCard } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

// export
// const userProfileData = [
//   {
//     icon: <BsCurrencyDollar />,
//     title: 'My Profile',
//     desc: 'Account Settings',
//     iconColor: '#03C9D7',
//     iconBg: '#E5FAFB',
//     to: '/profile',
//   },
//   // {
//   //   icon: <BsShield />,
//   //   title: 'My Inbox',
//   //   desc: 'Messages & Emails',
//   //   iconColor: 'rgb(0, 194, 146)',
//   //   iconBg: 'rgb(235, 250, 242)',
//   //   to: '',
//   // },
//   {
//     icon: <FiCreditCard />,
//     title:  t('my_tasks') ,
//     desc: 'To-do and Daily Tasks',
//     iconColor: 'rgb(255, 244, 229)',
//     iconBg: 'rgb(254, 201, 15)',
//     to: '/tasks',
//   },
// ];

export default function UserProfile(props) {
  const { currentColor } = useStateContext();
  const { user, userProfile } = useSelector((state) => state.auth);
  const { setIsClicked, initialState } = useStateContext();
  const { t } = useTranslation();

  const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: t('my_profile'),
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      to: '/profile',
    },
    // {
    //   icon: <BsShield />,
    //   title: 'My Inbox',
    //   desc: 'Messages & Emails',
    //   iconColor: 'rgb(0, 194, 146)',
    //   iconBg: 'rgb(235, 250, 242)',
    //   to: '',
    // },
    {
      icon: <FiCreditCard />,
      title: t('my_tasks'),
      desc: 'To-do and Daily Tasks',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      to: '/tasks',
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthReducer());

    // window.location.href = 'http://localhost:3002/';

    navigate('/login');
  };

  const handleProfileBtn = (value) => {
    setIsClicked(initialState);
    navigate(`${value}`);
  };

  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, [dispatch, user]);

  return (
    <div
      className={
        props.valueFromChild === 'en'
          ? `nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96`
          : 'nav-item absolute left-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96'
      }
    >
      {' '}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          {t('user_profile')}
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        {userProfile.image ? (
          <img
            className="rounded-full h-24 w-24"
            src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${userProfile.image}`}
            alt="user-profile"
          />
        ) : (
          <RxAvatar className="rounded-full h-24 w-24" />
        )}
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {' '}
            {userProfile.name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {' '}
            {userProfile.role}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {' '}
            {userProfile.email}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p
                className="font-semibold dark:text-gray-200 "
                onClick={() => handleProfileBtn(item.to)}
              >
                {item.title}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {' '}
                {item.desc}{' '}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          onClick={handleLogout}
          type="button"
          className={` mb-10 mt-8  w-full font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-${currentColor} focus:bg-${currentColor}`}
          style={{
            backgroundColor: currentColor,
            borderRadius: '10px',
            color: 'white',
          }}
        >
          {t('logout')}
        </button>
      </div>
    </div>
  );
}

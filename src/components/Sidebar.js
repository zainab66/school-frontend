import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import { AiOutlineHome, AiOutlineCalendar } from 'react-icons/ai';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { RiParentLine } from 'react-icons/ri';
import { SiGoogleclassroom } from 'react-icons/si';
import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
} from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

export default function AppSidebar() {
  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const { t } = useTranslation();

  const links = [
    {
      title: t('main'),
      links: [
        {
          name: t('dashboard'),
          icon: <AiOutlineHome />,
          to: '/',
        },
      ],
    },
    {
      title: t('pages'),
      links: [
        {
          name: t('teachers'),
          icon: <FaChalkboardTeacher />,
          to: 'teachers',
        },
        {
          name: t('students'),
          icon: <FaUserGraduate />,
          to: 'students',
        },
        // {
        //   name: t('parents'),
        //   icon: <RiParentLine />,
        //   to: 'parents',
        // },
        {
          name: t('grades'),
          icon: <SiGoogleclassroom />,
          to: 'grades',
        },
        {
          name: t('classes'),
          icon: <SiGoogleclassroom />,
          to: 'grades&classes',
        },
      ],
    },
    {
      title: t('apps'),
      links: [
        {
          name: t('calendar'),
          icon: <AiOutlineCalendar />,
          to: '/calender',
        },
        {
          name: t('tasks'),
          icon: <BsKanban />,
          to: '/tasks',
        },
      ],
    },
  ];

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Xi_Team</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.to}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

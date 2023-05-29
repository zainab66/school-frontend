import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useStateContext } from '../contexts/ContextProvider';
import ThemeSettings from '../components/ThemeSettings';
import { ToastContainer } from 'react-toastify';
import cookies from 'js-cookie';

export default function Dashboard() {
  const [valueFromChild, setValueFromChild] = useState(cookies.get('i18next'));

  const handleValueFromChild = (childValue) => {
    setValueFromChild(childValue);
  };

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <button
              onClick={() => setThemeSettings(true)}
              type="button"
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </div>

          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          <div
            className={
              activeMenu && valueFromChild === 'ar'
                ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen md:mr-72 w-full  overflow-x-auto`
                : activeMenu && valueFromChild === 'en'
                ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  overflow-x-auto`
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar onValueFromChild={handleValueFromChild} />
              <ToastContainer />
            </div>
            {themeSettings && <ThemeSettings />} <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-wrap sm:hidden">
        <p className="relative inline-block items-center  bg-white px-1 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {' '}
          © 2022 All rights reserved by Shoppy.com
        </p>
        <p className="relative ml-2 inline-flex items-center justify-between bg-white  px-20 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {' '}
          <button
            type="button"
            className="rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <FiFacebook className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="ml-2  rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <FiInstagram className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="ml-2 rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <FiTwitter className="h-6 w-6" aria-hidden="true" />
          </button>
        </p>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            © 2022 All rights reserved by Shoppy.com
          </p>
        </div>
        <div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <FiFacebook className="h-6 w-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              className=" ml-2 rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <FiInstagram className="h-6 w-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              className=" ml-2 rounded-full bg-blue-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <FiTwitter className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

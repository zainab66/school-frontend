import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, resetAuthReducer } from '../reducers/authSlice';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { loginSchema } from '../schema/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
// import { GoogleLogin } from 'react-google-login';
// import Axios from 'axios';
// import { gapi } from 'gapi-script';

export default function Login() {
  const { user, isErrorLogin, isSuccessLogin, messageLogin } = useSelector(
    (state) => state.auth
  );
  const [type, setType] = useState('school');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const formSubmitHandler = (data) => {
    console.log(data, type);
    dispatch(
      login({
        email: data.email,
        password: data.password,
        type,
      })
    );
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (isErrorLogin) {
      toast.error(messageLogin);
    }
    if (isSuccessLogin) {
      toast.success(messageLogin);
      navigate('/');
      reset();
    }
  }, [
    navigate,
    messageLogin,
    isErrorLogin,
    isSuccessLogin,
    dispatch,
    reset,
    user,
  ]);

  // const handleFailure = (result) => {
  //   //alert(result);
  // };

  // const handleLogin = async (response) => {
  //   console.log('responseSuccessGoogle', response);
  //   Axios({
  //     method: 'POST',
  //     url: 'http://localhost:3001/api/school/users/googlelogin',
  //     data: { tokenId: response.tokenId },
  //   }).then((response) => {
  //     console.log('hhh', response.data);
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //     // dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
  //   });
  // };
  // const clientId =
  //   '206377628079-jdpf1r9ee11oeqo3jo5ek14beil4n1ov.apps.googleusercontent.com';

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: '',
  //     });
  //   }
  //   gapi.load('client:auth2', start);
  // });

  return (
    <>
      <ToastContainer />

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your school account
            </h2>
          </div>
          <form
            noValidate="novalidate"
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Email address"
                  {...register('email')}
                />{' '}
                {errors.email ? (
                  <span className="text-red-900 text-sm">
                    {errors.email.message}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                  {...register('password')}
                />{' '}
                {errors.password ? (
                  <span className="text-red-900 text-sm">
                    {errors.password.message}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              {/* <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div> */}

              <div className="text-sm">
                <a
                  href="/forgetPassword"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>

              <div className="flex items-center justify-end mt-4">
                <div className="text-sm">
                  {' '}
                  Don't have an account?
                  <a
                    href="/register"
                    className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                  >
                    Sign up!
                  </a>
                </div>
              </div>
            </div>
          </form>

          {/* <GoogleLogin
            clientId={clientId}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin> */}
        </div>
      </div>
    </>
  );
}

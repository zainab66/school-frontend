import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useStateContext } from '../contexts/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileSchema } from '../schema/formSchema';
import {
  resetAuthReducer,
  editUserProfile,
  getUserProfile,
} from '../reducers/authSlice';
import { toast } from 'react-toastify';

export default function Profile() {
  const { currentColor } = useStateContext();
  const {
    user,
    userProfile,
    messageEditUserProfile,
    isErrorEditUserProfile,
    isSuccessEditUserProfile,
  } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched', resolver: yupResolver(profileSchema) });

  const formSubmitHandler = (data) => {
    const formData = new FormData();
    if (data.image[0]) {
      formData.append('image', data.image[0]);
      formData.append('email', data.email);
      formData.append('name', data.name);
      formData.append('about', data.about);
      formData.append('id', id);
    } else {
      formData.append('image', imagePreview);
      formData.append('email', data.email);
      formData.append('name', data.name);
      formData.append('about', data.about);
      formData.append('id', id);
    }

    // console.log(data);
    // for (var p of formData) {
    //   let name = p[0];
    //   let value = p[1];

    // }
    dispatch(editUserProfile(formData));
  };
  const watchNewImagePreview = watch('image');
  const watchName = watch('name');
  const watchEmail = watch('email');
  const watchAbout = watch('about');
  const check =
    (watchName === name || watchName === undefined) &&
    (watchEmail === email || watchEmail === undefined) &&
    (watchAbout === about || watchAbout === undefined) &&
    (watchNewImagePreview === newImagePreview ||
      watchNewImagePreview === undefined);

  const handleCancel = async () => {
    setNewImagePreview(null);

    setShowModal(false);
    reset();
  };
  const handleEdit = async (value) => {
    setName(value.name);
    setEmail(value.email);
    setAbout(value.about);
    setImagePreview(value.image);
    setId(value._id);
  };

  const handleImagePreview = (e) => {
    setNewImagePreview(URL.createObjectURL(e.target.files[0]));

    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setImagePreview(reader.result);
    // };
    // reader.readAsDataURL(file);
  };
  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, [dispatch, user]);

  useEffect(() => {
    if (isErrorEditUserProfile) {
      toast.error(messageEditUserProfile);
      setShowModal(true);
    }

    if (isSuccessEditUserProfile) {
      toast.success(messageEditUserProfile);
      setShowModal(false);
      reset();
    }
    if (messageEditUserProfile) {
      dispatch(getUserProfile(user._id));
    }
    dispatch(resetAuthReducer());
  }, [
    reset,
    isErrorEditUserProfile,
    isSuccessEditUserProfile,
    dispatch,
    messageEditUserProfile,
    user,
  ]);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex flex-wrap justify-between">
          <Header category="Page" title="Profile" />

          <button
            onClick={() => {
              setShowModal(true);
              handleEdit(userProfile);
            }}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex justify-center ">
              <AiOutlineEdit className=" mr-2" size="18" />
              Edit
            </div>
          </button>
        </div>

        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Photo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {' '}
                  <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    {userProfile && (
                      <img
                        src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${userProfile.image}`}
                        alt=""
                      />
                    )}
                  </span>
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userProfile.name}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userProfile.email}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {userProfile.about}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                  <h3 className="text-lg font-semibold">Update profile</h3>
                </div>
                <div className="relative flex-auto">
                  <form
                    onSubmit={handleSubmit(formSubmitHandler)}
                    // encType="multipart/form-data"
                  >
                    <div className="overflow-hidden  sm:rounded-md">
                      <div className=" bg-gray-50 px-4 ">
                        <div className="grid grid-cols-6 gap-6">
                          {/* <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            {imagePreview && !newImagePreview ? (
                              <img
                                src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${imagePreview}`}
                                alt=""
                              />
                            ) : (
                              <img src={newImagePreview} alt="" />
                            )}

            
                          </span>

                          <div>
                            <input
                              className="ml-4"
                              type="file"
                              {...register('image')}
                              onChange={handleImagePreview}
                            />
                          </div>
                        </div>
                      </div> */}

                          <div className="col-span-6 sm:col-span-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Photo
                              </label>
                              <div className="mt-1 flex items-center">
                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                  {imagePreview && !newImagePreview ? (
                                    <img
                                      src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${imagePreview}`}
                                      alt=""
                                    />
                                  ) : (
                                    <img src={newImagePreview} alt="" />
                                  )}
                                </span>
                                <input
                                  className="ml-4"
                                  type="file"
                                  {...register('image')}
                                  onChange={handleImagePreview}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              defaultValue={name}
                              {...register('name')}
                            />
                            {errors.name ? (
                              <span className="text-red-900 text-sm">
                                {errors.name.message}
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              defaultValue={email}
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

                          <div className="col-span-6 sm:col-span-6">
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium text-gray-700"
                            >
                              About
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="you@example.com"
                                defaultValue={about}
                                {...register('about')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 text-right sm:px-6">
                        <button
                          className="text-white justify-center  border border-transparent bg-red-500 active:bg-red-700 font-medium px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>

                        <button
                          style={{
                            backgroundColor: !check
                              ? currentColor
                              : currentColor,
                            opacity: !check ? '' : 0.25,
                          }}
                          disabled={check}
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
                        text-white shadow-sm"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

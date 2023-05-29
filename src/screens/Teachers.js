import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Header from '../components/Header';
import { useStateContext } from '../contexts/ContextProvider';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  inviteTeacherSchema,
  inviteTeacherSchemaArabic,
  editTeacherSchema,
  editTeacherSchemaArabic,
} from '../schema/formSchema';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTeacher,
  deleteTeacher,
  getTeachers,
  editTeacher,
  resetTeacherReducer,
} from '../reducers/teacherSlice';

import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxAvatar } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

export default function Teachers() {
  const { currentColor } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem('isModalOpen') === 'true'
  );
  const [role, setRole] = useState('teacher');
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const { messageAddTeacher, isErrorAddTeacher, isSuccessAddTeacher } =
    useSelector((state) => state.teacher);
  const {
    teacherList,
    messageDeleteTeacher,
    isErrorDeleteTeacher,
    isSuccessDeleteTeacher,
    messageEditTeacher,
    isErrorEditTeacher,
    isSuccessEditTeacher,
    isLoadingeEditTeacher,
  } = useSelector((state) => state.teacher);

  const dispatch = useDispatch();
  const [nameTODelete, setNameToDelete] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const { t } = useTranslation();

  const [showDeleteModal, setShowDeleteModal] = useState(
    localStorage.getItem('showDeleteModal') === 'true'
  );
  const [imagePreview, setImagePreview] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const [keyImageToDelete, setKeyImageToDelete] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');
  const [joiningDate, setJoiningDate] = useState(new Date());

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = async (value) => {
    setSelectedFile(value.image);

    // setImagePreview(value.image);
    setFirstName(value.firstName);
    setLastName(value.lastName);
    setEmail(value.email);
    setPhoneNumber(value.phoneNumber);
    setGender(value.gender);
    setAge(value.age);
    setAddress(value.address);
    setSalary(value.salary);
    setJoiningDate(new Date());
    setTeacherId(value._id);
  };

  const handleDeleteInfo = async (row) => {
    setNameToDelete(row.firstName);
    setTeacherId(row._id);
  };

  const languages = [
    // {
    //   code: 'fr',
    //   name: 'Français',
    //   country_code: 'fr',
    // },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      country_code: 'sa',
    },
  ];

  const paginationOptions = {
    rowsPerPageText: 'صفوف في الصفحة', // Arabic translation for "rows per page"
    rangeSeparatorText: 'of', // Example for range separator text (optional)
    noRowsPerPage: false, // Example for hiding rows per page dropdown (optional)
  };

  const currentLanguageCode = cookies.get('i18next') || 'en';

  useEffect(() => {
    localStorage.setItem('isModalOpen', isModalOpen);
    localStorage.setItem('showDeleteModal', showDeleteModal);
  }, [isModalOpen, showDeleteModal]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return '';
  };

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headCells: {
      style: {
        color: 'black',
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        width: '180px',
      },
    },
  };

  const columns = [
    {
      name: t('photo'),
      selector: (row) =>
        row.image ? (
          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
            <img
              src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${row.image}`}
              alt=""
            />
          </span>
        ) : (
          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
            <RxAvatar className="rounded-full h-12 w-12" />
          </span>
        ),
    },
    {
      name: t('first_name'),
      selector: (row) => row.firstName,
    },
    {
      name: t('last_name'),
      selector: (row) => row.lastName,
    },

    {
      name: t('email'),
      selector: (row) => row.email,
    },
    {
      name: t('phone'),
      selector: (row) => row.phoneNumber,
    },
    {
      name: t('age'),
      selector: (row) => row.age,
    },
    {
      name: t('gender'),
      selector: (row) => row.gender,
    },

    {
      name: t('address'),
      selector: (row) => row.address,
    },
    {
      name: t('salary'),
      selector: (row) => row.salary,
    },
    {
      name: t('joining_date'),
      selector: (row) => formatDate(row.joiningDate),
    },
    {
      name: t('approved'),
      selector: (row) => (row.token === '' ? 'Approve' : 'Not approve'),
    },
    {
      name: '      ',
      cell: (row) => (
        <>
          <button
            onClick={() => {
              setShowEditModal(true);
              handleEdit(row);
            }}
            type="button"
            style={{
              background: currentColor,
              borderRadius: '50%',
              margin: '2px',
            }}
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray "
          >
            <AiOutlineEdit size="1rem" />
          </button>

          <button
            onClick={() => {
              setShowDeleteModal(true);
              handleDeleteInfo(row);
            }}
            type="button"
            style={{ background: 'red', borderRadius: '50%' }}
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <AiOutlineDelete size="1rem" />
          </button>
        </>
      ),
      sortable: true,
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      currentLanguageCode === 'ar'
        ? inviteTeacherSchemaArabic
        : inviteTeacherSchema
    ),
  });

  const formSubmitHandler = (data) => {
    if (data) {
      dispatch(
        addTeacher({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role,
          createdBy,
        })
      );
    }
  };

  const watchFirstName = watch('firstName');
  const watchLastName = watch('lastName');
  const watchEmail = watch('email');

  const checkSubmitBtn =
    watchFirstName === undefined ||
    watchEmail === undefined ||
    watchLastName === undefined;

  const handelCancel = () => {
    setIsModalOpen(false);
    localStorage.removeItem('isModalOpen');
    reset();
  };

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (isErrorAddTeacher) {
      toast.error(t('message_error_add_teacher'));
      setIsModalOpen(true);
    }

    if (isSuccessAddTeacher && messageAddTeacher === 'Teacher already exists') {
      toast.error(t('message_error_add_teacher'));
      setIsModalOpen(true);
    }
    if (
      isSuccessAddTeacher &&
      messageAddTeacher === 'Invitation send successfully'
    ) {
      toast.success(t('message_success_add_teacher'));
      setIsModalOpen(false);
    }
    if (
      isSuccessAddTeacher &&
      messageAddTeacher === 'Invitation send successfully'
    ) {
      dispatch(getTeachers());
      reset();
      dispatch(resetTeacherReducer());
    }
  }, [
    t,
    isErrorAddTeacher,
    isSuccessAddTeacher,
    messageAddTeacher,
    reset,
    dispatch,
  ]);

  useEffect(() => {
    if (isErrorDeleteTeacher) {
      toast.error(t('message_error_delete_teacher'));
      setShowDeleteModal(true);
    }

    if (isSuccessDeleteTeacher) {
      toast.success(t('message_success_delete_teacher'));
      setShowDeleteModal(false);
      dispatch(resetTeacherReducer());
    }
    if (messageDeleteTeacher) {
      dispatch(getTeachers());
    }
  }, [
    t,
    isErrorDeleteTeacher,
    isSuccessDeleteTeacher,
    messageDeleteTeacher,
    dispatch,
  ]);

  useEffect(() => {
    if (isErrorEditTeacher) {
      toast.error(t('message_error_edit_teacher'));
      setShowEditModal(true);
    }

    if (isSuccessEditTeacher) {
      toast.success(t('message_success_edit_teacher'));
      setShowEditModal(false);
      dispatch(resetTeacherReducer());
    }
    if (messageEditTeacher) {
      dispatch(getTeachers());
    }
  }, [
    t,
    isErrorEditTeacher,
    isSuccessEditTeacher,
    messageEditTeacher,
    dispatch,
  ]);

  const handleDeleteCancel = async () => {
    setShowDeleteModal(false);
    localStorage.removeItem('showDeleteModal');
    reset();
  };

  const handleDelete = () => {
    dispatch(deleteTeacher(teacherId));
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
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({
    resolver: yupResolver(
      currentLanguageCode === 'ar' ? editTeacherSchemaArabic : editTeacherSchema
    ),
  });

  const formSubmitHandlerEdit = (data) => {
    console.log(data, teacherId);

    if (data) {
      const formData = new FormData();
      if (selectedFile) {
        if (keyImageToDelete) {
          formData.append('keyImageToDelete', keyImageToDelete);
        }
        formData.append('image', selectedFile);
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('age', data.age);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('salary', data.salary);
        formData.append('joiningDate', joiningDate);
        formData.append('role', role);
        formData.append('createdBy', createdBy);
        formData.append('teacherId', teacherId);
      } else {
        if (keyImageToDelete) {
          formData.append('keyImageToDelete', keyImageToDelete);
        }
        formData.append('image', '');
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('age', data.age);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('salary', data.salary);
        formData.append('joiningDate', joiningDate);
        formData.append('role', role);
        formData.append('createdBy', createdBy);
        formData.append('teacherId', teacherId);
      }

      dispatch(editTeacher(formData));
    }
    // dispatch(
    //   editTeacher({
    //     email: data.email,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     phoneNumber: data.phoneNumber,
    //     age: data.age,
    //     gender: data.gender,
    //     address: data.address,
    //     salary: data.salary,
    //     joiningDate,
    //     role,
    //     createdBy,
    //     teacherId,
    //   })
    // );
  };

  const handleJoiningDate = async (date) => {
    setJoiningDate(date);
  };

  const watchEditFirstName = watchEdit('firstName');
  const watchEditLastName = watchEdit('laststName');
  const watchEditEmail = watchEdit('email');
  const watchEditAge = watchEdit('age');
  const watchEditGender = watchEdit('gender');
  const watchEditAddress = watchEdit('address');
  const watchEditSalary = watchEdit('salary');
  const watchEditPhoneNumber = watchEdit('phoneNumber');
  const watchEditJoiningDate = watchEdit('joiningDate');

  const check =
    (watchEditFirstName === firstName || watchEditFirstName === undefined) &&
    (watchEditEmail === email || watchEditEmail === undefined) &&
    (watchEditAge === age || watchEditAge === undefined) &&
    (watchEditGender === gender || watchEditGender === undefined) &&
    (watchEditLastName === lastName || watchEditLastName === undefined) &&
    (watchEditPhoneNumber === phoneNumber ||
      watchEditPhoneNumber === undefined) &&
    (watchEditAddress === address || watchEditAddress === undefined) &&
    (watchEditSalary === salary || watchEditSalary === undefined) &&
    (watchEditJoiningDate === joiningDate ||
      watchEditJoiningDate === undefined);

  const handleEditCancel = async () => {
    setShowEditModal(false);
    resetEdit();
    setSelectedFile(null);
    setPreviewURL(null);
  };
  // md:m-10 mt-24 p-2 md:p-10

  useEffect(() => {
    setRecords(teacherList);
  }, [teacherList]);
  const [records, setRecords] = useState();

  const handelFilter = (event) => {
    const newData = teacherList.filter((row) => {
      return row.firstName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null);
    }
  };

  const handleRemoveFile = () => {
    setKeyImageToDelete(selectedFile);
    setSelectedFile(null);
    setPreviewURL(null);
  };

  return (
    <>
      <div className="md:m-2 mt-5 p-2 md:p-5 rounded-3xl">
        <div className="flex justify-between -mb-10">
          <Header category={t('page')} title={t('teachers')} />

          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className=" mr-2 pt-1 " />
              {t('add_teacher')}
            </div>
          </button>
        </div>

        {isModalOpen ? (
          <>
            <div
              className=" m-2 md:m-10 mt-24 p-2 md:p-10  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none

"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none ">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-lg font-semibold">
                      {t('invite_new_teacher')}
                    </h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className=" px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm  mb-1">
                        {t('first_name')}
                      </label>
                      <input
                        name="firstName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register('firstName')}
                      />
                      {errors.firstName ? (
                        <span className="text-red-900 text-sm">
                          {errors.firstName.message}
                        </span>
                      ) : (
                        <></>
                      )}

                      <label className="block text-black text-sm  mb-1">
                        {t('last_name')}
                      </label>
                      <input
                        name="lastName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register('lastName')}
                      />
                      {errors.lastName ? (
                        <span className="text-red-900 text-sm">
                          {errors.lastName.message}
                        </span>
                      ) : (
                        <></>
                      )}
                      <label className="block text-black text-sm  mb-1 pt-1">
                        {t('email')}
                      </label>
                      <input
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register('email')}
                      />
                      {errors.email ? (
                        <span className="text-red-900 text-sm">
                          {errors.email.message}
                        </span>
                      ) : (
                        <></>
                      )}
                    </form>
                  </div>
                  <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      style={{
                        borderRadius: '10px',
                      }}
                      className="text-white  bg-red-500 active:bg-red-700 font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handelCancel}
                    >
                      {t('close')}{' '}
                    </button>
                    <button
                      disabled={checkSubmitBtn}
                      style={{
                        borderRadius: '10px',
                        backgroundColor: !checkSubmitBtn
                          ? currentColor
                          : currentColor,
                        opacity: !checkSubmitBtn ? '' : 0.25,
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
                        text-white shadow-sm"
                      type="submit"
                      onClick={handleSubmit(formSubmitHandler)}
                    >
                      {t('add_teacher')}{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {showDeleteModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl -mt-10">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <form className=" px-8 pt-6 pb-8 w-full">
                      <div>
                        {t('are_you_sure_you_want_to_delete_teacher', {
                          nameTODelete,
                        })}
                      </div>
                    </form>
                  </div>
                  <div className="flex items-center justify-between p-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-white  bg-red-500 active:bg-red-700 font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleDeleteCancel}
                    >
                      {t('close')}{' '}
                    </button>
                    <button
                      style={{ backgroundColor: currentColor }}
                      className="text-white font-semibold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      onClick={handleDelete}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {showEditModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                    <h3 className="text-lg font-semibold">{t('edit')}</h3>
                  </div>
                  <div className="relative flex-auto">
                    <form onSubmit={handleSubmitEdit(formSubmitHandlerEdit)}>
                      <div className="overflow-hidden  sm:rounded-md">
                        <div className=" bg-gray-50 px-4 ">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label className="block text-sm font-medium text-gray-700">
                                {t('photo')}
                              </label>
                              <div className="mt-1 flex items-center">
                                {/* <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                  {imagePreview && !newImagePreview ? (
                                    <img
                                      src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${imagePreview}`}
                                      alt=""
                                    />
                                  ) : !imagePreview && !newImagePreview ? (
                                    <RxAvatar className="rounded-full w-12 h-12" />
                                  ) : (
                                    <img src={newImagePreview} alt="" />
                                  )}
                                </span>
                                <input
                                  className="m-4"
                                  type="file"
                                  {...registerEdit('image')}
                                  onChange={handleImagePreview}
                                /> */}

                                <div>
                                  <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                  />
                                  <label
                                    htmlFor="fileInput"
                                    style={{
                                      display: 'inline-block',
                                      padding: '10px 20px',
                                      backgroundColor: currentColor,
                                      color: 'white',
                                      textAlign: 'center',
                                      borderRadius: '4px',
                                      direction: 'rtl',
                                      cursor: 'pointer',
                                      marginRight: '14px',
                                      border: '6px',
                                    }}
                                  >
                                    اختر الملف
                                  </label>

                                  {selectedFile ? (
                                    <div>
                                      {previewURL ? (
                                        <div>
                                          <img
                                            src={previewURL}
                                            alt="Selected File"
                                            style={{ maxWidth: '200px' }}
                                          />
                                          <span>{selectedFile.name}</span>
                                        </div>
                                      ) : (
                                        <div>
                                          <img
                                            src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${selectedFile}`}
                                            alt=""
                                            style={{ maxWidth: '200px' }}
                                          />
                                          <span>{selectedFile.name}</span>
                                        </div>

                                        // <span>Loading image...</span>
                                      )}
                                      <button onClick={handleRemoveFile}>
                                        إزالة
                                      </button>
                                    </div>
                                  ) : (
                                    <RxAvatar className="rounded-full w-12 h-12" />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('first_name')}
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="firstName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={firstName}
                                {...registerEdit('firstName')}
                              />
                              {errorsEdit.firstName ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.firstName.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('last_name')}
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="lastName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={lastName}
                                {...registerEdit('lastName')}
                              />{' '}
                              {errors.lastName ? (
                                <span className="text-red-900 text-sm">
                                  {errors.lastName.message}
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
                                {t('email')}
                              </label>
                              <input
                                type="text"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={email}
                                {...registerEdit('email')}
                              />{' '}
                              {errorsEdit.email ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.email.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('phone')}
                              </label>
                              <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={phoneNumber}
                                {...registerEdit('phoneNumber')}
                              />{' '}
                              {errorsEdit.phoneNumber ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.phoneNumber.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('gender')}
                              </label>
                              <select
                                id="gender"
                                name="gender"
                                autoComplete="gender"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={gender}
                                {...registerEdit('gender')}
                              >
                                <option value="">{t('select')}</option>
                                <option value="Male">{t('male')}</option>
                                <option value="Female">{t('female')}</option>
                              </select>{' '}
                              {errorsEdit.gender ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.gender.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="age"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('age')}
                              </label>
                              <input
                                type="text"
                                name="age"
                                id="age"
                                autoComplete="age"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={age}
                                {...registerEdit('age')}
                              />{' '}
                              {errorsEdit.age ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.age.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                              <label
                                htmlFor="salary"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('salary')}
                              </label>
                              <input
                                type="text"
                                name="salary"
                                id="salary"
                                autoComplete="salary"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={salary}
                                {...registerEdit('salary')}
                              />{' '}
                              {errorsEdit.salary ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.salary.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                              <label
                                htmlFor="joiningDate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('joining_date')}
                              </label>

                              <DatePicker
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholderText="Select date"
                                selected={joiningDate}
                                onChange={(date) => handleJoiningDate(date)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('address')}
                              </label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                autoComplete="address-level2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={address}
                                {...registerEdit('address')}
                              />{' '}
                              {errorsEdit.address ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.address.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 text-right sm:px-6">
                          <button
                            className="text-white justify-center  border border-transparent bg-red-500 active:bg-red-700 font-medium px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                            type="button"
                            onClick={handleEditCancel}
                          >
                            {t('cancel')}{' '}
                          </button>

                          <button
                            disabled={check}
                            type="submit"
                            style={{
                              backgroundColor: !check
                                ? currentColor
                                : currentColor,
                              opacity: !check ? '' : 0.25,
                            }}
                            className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 mr-6 text-sm font-medium
                              text-white shadow-sm"
                          >
                            {t('save')}
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
        <input
          type="text"
          className=" w-80 px-4 py-2 mb-1 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder={t('search...')}
          onChange={handelFilter}
        />
        {teacherList && (
          <DataTable
            title={t('teacher_list')}
            columns={columns}
            data={records}
            customStyles={customStyles}
            pagination
            paginationComponentOptions={
              currentLanguageCode === 'ar' ? paginationOptions : ''
            } // Set the paginationComponentOptions
            noDataComponent={t('noDataMessage')}
            fixedHeader
            dense
          />
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import Header from '../components/Header';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addStudentSchema,
  editStudentSchema,
  editStudentSchemaArabic,
} from '../schema/formSchema';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxAvatar } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../reducers/classSlice';
import {
  addStudent,
  getStudents,
  deleteStudent,
  editStudent,
  resetStudentReducer,
} from '../reducers/studentSlice';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

export default function Students({ page }) {
  const { currentColor } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState('');
  const [nameTODelete, setNameToDelete] = useState('');
  const [studentId, setStudentId] = useState('');
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next') || 'en';

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
  const [grade, setGrade] = useState('');
  const [classType, setClassType] = useState('');
  const [fatherName, setFatherName] = useState('');

  const {
    studentList,
    messageAddStudent,
    isErrorAddStudent,
    isSuccessAddStudent,
    isLoadingeAddStudent,
    messageDeleteStudent,
    isErrorDeleteStudent,
    isSuccessDeleteStudent,
    isLoadingeDeleteStudent,
    messageEditStudent,
    isErrorEditStudent,
    isSuccessEditStudent,
    isLoadingeEditStudent,
  } = useSelector((state) => state.student);

  const { classList } = useSelector((state) => state.class);

  const handleJoiningDate = async (date) => {
    setJoiningDate(date);
  };

  const handleBirthDate = async (date) => {
    setBirthDate(date);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      currentLanguageCode === 'ar' ? editStudentSchemaArabic : addStudentSchema
    ),
  });

  const watchFirstName = watch('firstName');
  const watchLastName = watch('lastName');
  const watchEmail = watch('email');

  const checkSubmitBtn =
    watchFirstName === undefined ||
    watchEmail === undefined ||
    watchLastName === undefined;

  const formSubmitHandler = (data) => {
    if (data) {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('image', selectedFile);
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('fatherName', data.fatherName);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('age', data.age);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('grade', data.grade);
        formData.append('classType', data.classType);
        formData.append('joiningDate', joiningDate);
        formData.append('birthDate', birthDate);
        formData.append('createdBy', createdBy);
      } else {
        formData.append('image', previewURL);
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('fatherName', data.fatherName);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('age', data.age);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('grade', data.grade);
        formData.append('classType', data.classType);
        formData.append('joiningDate', joiningDate);
        formData.append('birthDate', birthDate);
        formData.append('createdBy', createdBy);
      }

      dispatch(addStudent(formData));
    }
  };

  const handelCancel = () => {
    setIsModalOpen(false);
    reset();
    setSelectedFile(null);
    setPreviewURL(null);
  };

  const handleImagePreview = (e) => {
    setNewImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (isErrorAddStudent) {
      toast.error(t('message_error_add_student'));
      setIsModalOpen(true);
    }

    if (isSuccessAddStudent && messageAddStudent === 'Student already exists') {
      toast.error(t('message_success_add_student'));
      setIsModalOpen(true);
    }
    if (
      isSuccessAddStudent &&
      messageAddStudent === 'Student create successfully'
    ) {
      toast.success(messageAddStudent);
      setIsModalOpen(false);
    }
    if (
      isSuccessAddStudent &&
      messageAddStudent === 'Student create successfully'
    ) {
      dispatch(getStudents());
      reset();
      dispatch(resetStudentReducer());
      setKeyImageToDelete(null);
      setSelectedFile(null);
      setPreviewURL(null);
    }
  }, [
    t,
    isErrorAddStudent,
    isSuccessAddStudent,
    messageAddStudent,
    reset,
    dispatch,
  ]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return '';
  };

  const handleEdit = async (value) => {
    setSelectedFile(value.image);
    setFirstName(value.firstName);
    setLastName(value.lastName);
    setEmail(value.email);
    setPhoneNumber(value.phoneNumber);
    setGender(value.gender);
    setAge(value.age);
    setAddress(value.address);
    setClassType(value.classType);
    setJoiningDate(new Date());
    setStudentId(value._id);
    setGrade(value.grade);
    setFatherName(value.fatherName);
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
    // {
    //   name: t('middle_name'),
    //   selector: (row) => row.middleName,
    // },
    {
      name: t('father_name'),
      selector: (row) => row.fatherName,
    },
    {
      name: t('last_name'),
      selector: (row) => row.lastName,
    },

    {
      name: t('grade'),
      selector: (row) => row.grade,
    },
    {
      name: t('class'),
      selector: (row) => row.classType,
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
      name: t('joining_date'),
      selector: (row) => formatDate(row.joiningDate),
    },
    {
      name: t('birth_date'),
      selector: (row) => formatDate(row.birthDate),
    },
    {
      name: '    ',
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
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray mr-1"
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
  const [records, setRecords] = useState();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    setRecords(studentList);
  }, [studentList]);

  const handelFilter = (event) => {
    const newData = studentList.filter((row) => {
      return row.firstName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const handleDeleteCancel = async () => {
    setShowDeleteModal(false);
    reset();
  };

  const handleDelete = () => {
    dispatch(deleteStudent(studentId));
    setSelectedFile(null);
    setPreviewURL(null);
  };

  const handleDeleteInfo = async (row) => {
    setNameToDelete(row.firstName);
    setStudentId(row._id);
  };

  useEffect(() => {
    if (isErrorDeleteStudent) {
      toast.error(t('message_error_delete_student'));
      setShowDeleteModal(true);
    }

    if (isSuccessDeleteStudent) {
      toast.success(t('message_success_delete_student'));
      setShowDeleteModal(false);
      dispatch(resetStudentReducer());
    }
    if (messageDeleteStudent) {
      dispatch(getStudents());
    }
  }, [
    t,
    isErrorDeleteStudent,
    isSuccessDeleteStudent,
    messageDeleteStudent,
    dispatch,
  ]);

  const [showEditModal, setShowEditModal] = useState(false);

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({
    resolver: yupResolver(
      // editStudentSchema
      currentLanguageCode === 'ar' ? editStudentSchemaArabic : editStudentSchema
    ),
  });

  const formSubmitHandlerEdit = (data) => {
    if (data) {
      const formData = new FormData();
      if (selectedFile) {
        if (keyImageToDelete) {
          formData.append('keyImageToDelete', keyImageToDelete);
        }
        // formData.append('keyImageToDelete', keyImageToDelete);
        formData.append('image', selectedFile);
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('fatherName', data.fatherName);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('age', data.age);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('grade', data.grade);
        formData.append('classType', data.classType);
        formData.append('joiningDate', joiningDate);
        formData.append('birthDate', birthDate);
        formData.append('createdBy', createdBy);
        formData.append('studentId', studentId);
      } else {
        console.log('22', selectedFile, previewURL);
        if (keyImageToDelete) {
          formData.append('keyImageToDelete', keyImageToDelete);
        }
        formData.append('image', '');
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('fatherName', data.fatherName);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('age', data.age);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('grade', data.grade);
        formData.append('classType', data.classType);
        formData.append('joiningDate', joiningDate);
        formData.append('birthDate', birthDate);
        formData.append('createdBy', createdBy);
        formData.append('studentId', studentId);
      }

      dispatch(editStudent(formData));
    }
  };

  const handleEditCancel = async () => {
    setShowEditModal(false);
    resetEdit();
    setSelectedFile(null);
    setPreviewURL(null);
  };

  const watchEditFirstName = watchEdit('firstName');
  const watchEditLastName = watchEdit('lastName');
  const watchEditEmail = watchEdit('email');
  const watchEditAge = watchEdit('age');
  const watchEditGender = watchEdit('gender');
  const watchEditAddress = watchEdit('address');
  const watchEditPhoneNumber = watchEdit('phoneNumber');
  const watchEditGrade = watchEdit('grade');
  const watchEditFatherName = watchEdit('fatherName');
  const watchEditClassType = watchEdit('classType');

  const check =
    (watchEditFirstName === firstName || watchEditFirstName === undefined) &&
    (watchEditEmail === email || watchEditEmail === undefined) &&
    (watchEditAge === age || watchEditAge === undefined) &&
    (watchEditGender === gender || watchEditGender === undefined) &&
    (watchEditLastName === lastName || watchEditLastName === undefined) &&
    (watchEditPhoneNumber === phoneNumber ||
      watchEditPhoneNumber === undefined) &&
    (watchEditAddress === address || watchEditAddress === undefined) &&
    (watchEditClassType === classType || watchEditClassType === undefined) &&
    (watchEditFatherName === fatherName || watchEditFatherName === undefined) &&
    (watchEditGrade === grade || watchEditGrade === undefined);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const paginationOptions = {
    rowsPerPageText: 'صفوف في الصفحة', // Arabic translation for "rows per page"
    rangeSeparatorText: 'of', // Example for range separator text (optional)
    noRowsPerPage: false, // Example for hiding rows per page dropdown (optional)
  };

  useEffect(() => {
    if (isErrorEditStudent) {
      toast.error(t('message_error_edit_student'));
      setShowEditModal(true);
    }

    if (isSuccessEditStudent) {
      toast.success(t('message_success_edit_student'));
      setShowEditModal(false);
      dispatch(resetStudentReducer());
    }
    if (messageEditStudent) {
      dispatch(getStudents());
    }
  }, [
    t,
    isErrorEditStudent,
    isSuccessEditStudent,
    messageEditStudent,
    dispatch,
  ]);

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
      {' '}
      <div className="md:m-2 mt-5 p-2 md:p-5 rounded-3xl">
        <div className="flex flex-wrap justify-between ">
          <Header category={t('page')} title={t('students')} />

          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className={
              'mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray'
            }
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className=" mr-2 pt-1 " />
              {t('add_student')}{' '}
            </div>
          </button>
        </div>
        {isModalOpen ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                    <h3 className="text-lg font-semibold">
                      {t('add_new_student')}
                    </h3>
                  </div>
                  <div className="relative flex-auto">
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
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
                                <label
                                  class="file-button"
                                  for="fileInput"
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
                                  {t('select_photo')}
                                </label>

                                <input
                                  className="m-4"
                                  type="file"
                                  id="fileInput"
                                  style={{ display: 'none' }}
                                  {...register('image')}
                                  onChange={handleFileChange}

                                  // onChange={handleImagePreview}
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
                                        <span>Loading image...</span>
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
                                {...register('firstName')}
                              />
                              {errors.firstName ? (
                                <span className="text-red-900 text-sm">
                                  {errors.firstName.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            {/* <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="middleName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Middle Name
                              </label>
                              <input
                                type="text"
                                name="middleName"
                                id="middleName"
                                autoComplete="middleName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('middleName')}
                              />
                              {errors.middleName ? (
                                <span className="text-red-900 text-sm">
                                  {errors.middleName.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div> */}

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
                                {...register('lastName')}
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
                                htmlFor="fatherName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('father_name')}
                              </label>
                              <input
                                type="text"
                                name="fatherName"
                                id="fatherName"
                                autoComplete="fatherName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('fatherName')}
                              />{' '}
                              {errors.fatherName ? (
                                <span className="text-red-900 text-sm">
                                  {errors.fatherName.message}
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
                                {...register('phoneNumber')}
                              />{' '}
                              {errors.phoneNumber ? (
                                <span className="text-red-900 text-sm">
                                  {errors.phoneNumber.message}
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
                                {...register('gender')}
                              >
                                <option value=""> {t('select')}</option>
                                <option value={t('male')}> {t('male')}</option>
                                <option value={t('female')}>
                                  {' '}
                                  {t('female')}
                                </option>
                              </select>{' '}
                              {errors.gender ? (
                                <span className="text-red-900 text-sm">
                                  {errors.gender.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                              <label
                                htmlFor="birthDate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('birth_date')}
                              </label>

                              <DatePicker
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholderText="Select date"
                                selected={birthDate}
                                onChange={(date) => handleBirthDate(date)}
                              />
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
                                {...register('age')}
                              />{' '}
                              {errors.age ? (
                                <span className="text-red-900 text-sm">
                                  {errors.age.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                              <label
                                htmlFor="grade"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('grade')}
                              </label>
                              <input
                                type="text"
                                name="grade"
                                id="grade"
                                autoComplete="grade"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('grade')}
                              />{' '}
                              {errors.grade ? (
                                <span className="text-red-900 text-sm">
                                  {errors.grade.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                              <label
                                htmlFor="classType"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('class')}
                              </label>{' '}
                              <select
                                id="classType"
                                name="classType"
                                autoComplete="classType"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('classType')}
                              >
                                <option value=""> {t('select')}</option>
                                {classList &&
                                  classList.map((value) => (
                                    <option>{value.name}</option>
                                  ))}
                              </select>
                              {errors.classType ? (
                                <span className="text-red-900 text-sm">
                                  {errors.classType.message}
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
                                {...register('address')}
                              />{' '}
                              {errors.address ? (
                                <span className="text-red-900 text-sm">
                                  {errors.address.message}
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
                            onClick={handelCancel}
                          >
                            {t('cancel')}
                          </button>

                          <button
                            disabled={checkSubmitBtn}
                            type="submit"
                            style={{
                              backgroundColor: !checkSubmitBtn
                                ? currentColor
                                : currentColor,
                              opacity: !checkSubmitBtn ? '' : 0.25,
                              margin: '4px',
                            }}
                            className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
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

        {showDeleteModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl -mt-10">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <form className=" px-8 pt-6 pb-8 w-full">
                      <div>
                        {t('are_you_sure_you_want_to_delete_student', {
                          nameTODelete,
                        })}{' '}
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
                                <label
                                  class="file-button"
                                  for="fileInput"
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
                                  {t('select_photo')}
                                </label>

                                <input
                                  className="m-4"
                                  type="file"
                                  id="fileInput"
                                  style={{ display: 'none' }}
                                  {...registerEdit('image')}
                                  onChange={handleImagePreview}
                                /> */}
                                {/* <input
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
                                            alt="Selected File"
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

                            {/* <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="middleName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Middle Name
                              </label>
                              <input
                                type="text"
                                name="middleName"
                                id="middleName"
                                autoComplete="middleName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={middleName}
                                {...registerEdit('middleName')}
                              />
                              {errorsEdit.middleName ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.middleName.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div> */}

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
                              {errorsEdit.lastName ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.lastName.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="fatherName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('father_name')}
                              </label>
                              <input
                                type="text"
                                name="fatherName"
                                id="fatherName"
                                autoComplete="fatherName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={fatherName}
                                {...registerEdit('fatherName')}
                              />{' '}
                              {errorsEdit.fatherName ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.fatherName.message}
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
                                <option value={t('male')}>{t('male')}</option>
                                <option value={t('female')}>
                                  {t('female')}
                                </option>
                              </select>{' '}
                              {errorsEdit.gender ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.gender.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                              <label
                                htmlFor="birthDate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('birth_date')}
                              </label>

                              <DatePicker
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholderText="Select date"
                                selected={birthDate}
                                onChange={(date) => handleBirthDate(date)}
                              />
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
                                htmlFor="grade"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('grade')}
                              </label>
                              <input
                                type="text"
                                name="grade"
                                id="grade"
                                autoComplete="grade"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={grade}
                                {...registerEdit('grade')}
                              />{' '}
                              {errorsEdit.grade ? (
                                <span className="text-red-900 text-sm">
                                  {errorsEdit.grade.message}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                              <label
                                htmlFor="classType"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('class')}
                              </label>{' '}
                              <select
                                defaultValue={classType}
                                id="classType"
                                name="classType"
                                autoComplete="classType"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...registerEdit('classType')}
                              >
                                <option value=""> {t('select')}</option>
                                {classList &&
                                  classList.map((value) => (
                                    <option>{value.name}</option>
                                  ))}
                              </select>
                              {errors.classType ? (
                                <span className="text-red-900 text-sm">
                                  {errors.classType.message}
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
                            {t('cancel')}
                          </button>

                          <button
                            disabled={check}
                            type="submit"
                            style={{
                              backgroundColor: !check
                                ? currentColor
                                : currentColor,
                              opacity: !check ? '' : 0.25,
                              margin: '4px',
                            }}
                            className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
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

        {studentList && (
          <DataTable
            title={t('student_list')}
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

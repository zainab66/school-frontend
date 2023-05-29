import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
import { RxAvatar } from 'react-icons/rx';
import Header from '../components/Header';
import { FaPlus } from 'react-icons/fa';
import {
  addStudent,
  getStudents,
  resetStudentReducer,
} from '../reducers/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addStudentSchema } from '../schema/formSchema';
import { getClasses } from '../reducers/classSlice';
import { toast } from 'react-toastify';
import Students from './Students';

export default function AddStudent() {
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const dispatch = useDispatch();

  const handleImagePreview = (e) => {
    setNewImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const { classList } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getStudents());
  }, [dispatch]);

  const {
    studentList,
    messageAddStudent,
    isErrorAddStudent,
    isSuccessAddStudent,
    isLoadingeAddStudent,
  } = useSelector((state) => state.student);

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
      name: 'Photo',
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
      name: 'First Name',
      selector: (row) => row.firstName,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
    },
    {
      name: 'Middle Name',
      selector: (row) => row.middleName,
    },
    {
      name: 'Father Name',
      selector: (row) => row.fatherName,
    },
    {
      name: 'Grade',
      selector: (row) => row.grade,
    },
    {
      name: 'Class',
      selector: (row) => row.classType,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: (row) => row.phoneNumber,
    },
    {
      name: 'Age',
      selector: (row) => row.age,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },

    {
      name: 'Address',
      selector: (row) => row.address,
    },

    {
      name: 'Joining Date',
      selector: (row) => formatDate(row.joiningDate),
    },
    {
      name: 'Birth Date',
      selector: (row) => formatDate(row.birthDate),
    },
    {
      name: 'Actions      ',
      cell: (row) => (
        <>
          <button
            // onClick={() => {
            //   setShowEditModal(true);
            //   handleEdit(row);
            // }}
            type="button"
            style={{ background: 'blue', borderRadius: '50%' }}
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray mr-1"
          >
            <AiOutlineEdit size="1rem" />
          </button>

          <button
            // onClick={() => {
            //   setShowDeleteModal(true);
            //   handleDeleteInfo(row);
            // }}
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
    resolver: yupResolver(addStudentSchema),
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
      console.log(data);

      const formData = new FormData();
      if (data.studentImage[0]) {
        formData.append('studentImage', data.studentImage[0]);
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('middleName', data.middleName);
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
        formData.append('studentImage', imagePreview);
        formData.append('email', data.email);
        formData.append('firstName', data.firstName);
        formData.append('middleName', data.middleName);
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
  };

  useEffect(() => {
    if (isErrorAddStudent) {
      toast.error(messageAddStudent);
      setIsModalOpen(true);
    }

    if (isSuccessAddStudent && messageAddStudent === 'Student already exists') {
      toast.error(messageAddStudent);
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
    }
  }, [
    isErrorAddStudent,
    isSuccessAddStudent,
    messageAddStudent,
    reset,
    dispatch,
  ]);
  const [records, setRecords] = useState();

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

  const handleJoiningDate = async (date) => {
    setJoiningDate(date);
  };

  const handleBirthDate = async (date) => {
    setBirthDate(date);
  };
  const [page, setPage] = useState(false);

  return (
    <>
      <Students page={page} />
      {/* <div className="md:m-2 mt-5 p-2 md:p-5 rounded-3xl">
        <div className="flex flex-wrap justify-between ">
          <div>
            {' '}
            <input
              type="text"
              className=" md:w-96 px-4 py-2 mb-1 sm:w-24  border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
              onChange={handelFilter}
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className=" m-2 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: 'blue', borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className=" mr-2 pt-1 " />
              Add Student
            </div>
          </button>
        </div>
        {isModalOpen ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                    <h3 className="text-lg font-semibold">Add new student</h3>
                  </div>
                  <div className="relative flex-auto">
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                      <div className="overflow-hidden  sm:rounded-md">
                        <div className=" bg-gray-50 px-4 ">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
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
                                  ) : !imagePreview && !newImagePreview ? (
                                    <RxAvatar className="rounded-full w-12 h-12" />
                                  ) : (
                                    <img src={newImagePreview} alt="" />
                                  )}
                                </span>
                                <input
                                  className="ml-4"
                                  type="file"
                                  {...register('studentImage')}
                                  onChange={handleImagePreview}
                                />
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                First Name
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

                            <div className="col-span-6 sm:col-span-3">
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
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Last name
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
                                Father's Name
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
                                Email address
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
                                Phone Number
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
                                Gender
                              </label>
                              <select
                                id="gender"
                                name="gender"
                                autoComplete="gender"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('gender')}
                              >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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
                                htmlFor="joiningDate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Birth Date
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
                                Age
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
                                Grade
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
                                Class
                              </label>{' '}
                              <select
                                id="classType"
                                name="classType"
                                autoComplete="classType"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('classType')}
                              >
                                <option value="">Select</option>
                                {classList &&
                                  classList.map((value) => (
                                    <option value="Male">{value.name}</option>
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
                                Joining Date
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
                                Address
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
                            Cancel
                          </button>

                          <button
                            disabled={checkSubmitBtn}
                            type="submit"
                            style={{
                              backgroundColor: !checkSubmitBtn
                                ? 'blue'
                                : 'blue',
                              opacity: !checkSubmitBtn ? '' : 0.25,
                            }}
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
        {studentList && (
          <DataTable
            title="Student List"
            columns={columns}
            data={records}
            customStyles={customStyles}
            pagination
            // selectableRows
            fixedHeader
            dense
          />
        )}
      </div> */}
    </>
  );
}

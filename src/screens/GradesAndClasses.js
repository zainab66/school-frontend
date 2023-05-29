import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FaPlus } from 'react-icons/fa';
import { useStateContext } from '../contexts/ContextProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addClassSchema, addGradeSchema } from '../schema/formSchema';
import { useDispatch, useSelector } from 'react-redux';
import {
  addClass,
  getClasses,
  deleteClass,
  resetClassReducer,
} from '../reducers/classSlice';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import DataTable from 'react-data-table-component';

import {
  addGrade,
  getGrades,
  deleteGrade,
  resetGradeReducer,
} from '../reducers/gradeSlice';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
export default function GradesAndClasses() {
  const { currentColor } = useStateContext();
  const [isGradeModalOpen, setIsGradeModalOpen] = useState('');

  const [isModalOpen, setIsModalOpen] = useState('');
  const {
    classList,
    messageAddClass,
    isErrorAddClass,
    isSuccessAddClass,
    isLoadingeAddClass,
    messageDeleteClass,
    isErrorDeleteClass,
    isSuccessDeleteClass,
    isLoadingeDeleteClass,
  } = useSelector((state) => state.class);

  const {
    messageAddGrade,
    isErrorAddGrade,
    isSuccessAddGrade,
    gradeList,
    messageDeleteGrade,
    isErrorDeleteGrade,
    isSuccessDeleteGrade,
    isLoadingeDeleteGrade,
  } = useSelector((state) => state.grade);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next') || 'en';

  const paginationOptions = {
    rowsPerPageText: 'صفوف في الصفحة', // Arabic translation for "rows per page"
    rangeSeparatorText: 'of', // Example for range separator text (optional)
    noRowsPerPage: false, // Example for hiding rows per page dropdown (optional)
  };

  const customNoDataComponent = () => (
    <div className="no-data-message">لا توجد سجلات للعرض</div>
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addClassSchema),
  });

  const watchName = watch('name');

  const checkSubmitBtn = watchName === undefined;

  const handleAddClassInfo = async (gradeId) => {
    setGradeId(gradeId);
  };

  const formSubmitHandler = (data) => {
    if (data) {
      console.log(data.name, data.teacherName, gradeId);
      dispatch(
        addClass({
          name: data.name,
          teacherName: data.teacherName,
          gradeId: gradeId,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getGrades());
  }, [dispatch]);

  const {
    register: registerGrade,
    handleSubmit: handleSubmitGrade,
    watch: watchGrade,
    formState: { errors: errorsGrade },
    reset: resetGrade,
  } = useForm({
    resolver: yupResolver(addGradeSchema),
  });

  const formSubmitGradeHandler = (data) => {
    if (data) {
      console.log(data.name);
      dispatch(addGrade(data.name));
    }
  };
  const watchGradeName = watchGrade('name');

  const checkSubmitBtnGrade = watchGradeName === undefined;

  const handelCancelGrade = () => {
    setIsGradeModalOpen(false);
    resetGrade();
  };

  const handelCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  useEffect(() => {
    if (isErrorAddClass) {
      toast.error(messageAddClass);
      setIsModalOpen(true);
    }

    if (isSuccessAddClass && messageAddClass === 'Class already exists') {
      toast.error(t('message_error_add_class'));
      setIsModalOpen(true);
    }
    if (isSuccessAddClass && messageAddClass === 'Class create successfully') {
      toast.success(t('message_success_add_class'));
      setIsModalOpen(false);
      dispatch(getClasses());
      dispatch(getGrades());
      reset();
      dispatch(resetClassReducer());
    }
  }, [isErrorAddClass, isSuccessAddClass, messageAddClass, t, reset, dispatch]);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const [classId, setClassId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState('');
  const [nameTODelete, setNameToDelete] = useState('');

  const [gradeId, setGradeId] = useState('');
  const [gradNameToDelete, setGradNameToDelete] = useState('');
  const [gradeShowDeleteModal, setGradeShowDeleteModal] = useState('');

  const handleDeleteInfo = async (row) => {
    setNameToDelete(row.name);
    setClassId(row._id);
  };

  console.log(nameTODelete, classId);

  const handleGradeDeleteInfo = async (row) => {
    setGradNameToDelete(row.name);
    setGradeId(row._id);
  };

  const handleGradeDelete = () => {
    dispatch(deleteGrade(gradeId));
  };

  const handleGradeDeleteCancel = async () => {
    setGradeShowDeleteModal(false);
    resetGrade();
  };

  const handleDeleteCancel = async () => {
    setShowDeleteModal(false);
    reset();
  };

  const handleDelete = () => {
    dispatch(deleteClass(gradeId, classId));
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

  const gradeColumns = [
    {
      name: 'Grade Name',
      selector: (row) => row.name,
    },
    {
      name: '      ',
      cell: (row) => (
        <>
          <button
            onClick={() => {
              setGradeShowDeleteModal(true);
              handleGradeDeleteInfo(row);
            }}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <AiOutlineDelete size="1rem " />
              Delete grade
            </div>
          </button>

          {/* <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className="1rem mr-2 pt-1 " />
              Add Class
            </div>
          </button> */}
          {/* <button
            onClick={() => {
              setShowDeleteModal(true);
              handleDeleteInfo(row);
            }}
            type="button"
            style={{ background: 'red', borderRadius: '50%' }}
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <AiOutlineDelete size="1rem" />
          </button> */}
        </>
      ),
      sortable: true,
    },
  ];

  const columns = [
    {
      name: t('class_name'),
      selector: (row) => row.name,
    },
    {
      name: t('teacher_name'),
      selector: (row) => row.teacherName,
    },

    {
      name: '      ',
      cell: (row) => (
        <>
          {/* <button
            // onClick={() => {
            //   setShowEditModal(true);
            //   handleEdit(row);
            // }}
            type="button"
            style={{ background: currentColor, borderRadius: '50%' }}
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray mr-1"
          >
            <AiOutlineEdit size="1rem" />
          </button> */}

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

  useEffect(() => {
    if (isErrorDeleteClass) {
      toast.error(t('message_error_delete_class'));
      setShowDeleteModal(true);
    }

    if (isSuccessDeleteClass) {
      toast.success(t('message_error_delete_class'));
      setShowDeleteModal(false);
    }
    if (messageDeleteClass) {
      dispatch(getClasses());
      dispatch(getGrades());
      dispatch(resetClassReducer());
    }
  }, [
    isErrorDeleteClass,
    isSuccessDeleteClass,
    messageDeleteClass,
    t,
    dispatch,
  ]);

  useEffect(() => {
    if (isErrorDeleteGrade) {
      toast.error(messageDeleteGrade);
      setGradeShowDeleteModal(true);
    }

    if (isSuccessDeleteGrade) {
      toast.success(messageDeleteGrade);
      setGradeShowDeleteModal(false);
      dispatch(resetGradeReducer());
    }
    if (messageDeleteGrade) {
      dispatch(getGrades());
    }
  }, [isErrorDeleteGrade, isSuccessDeleteGrade, messageDeleteGrade, dispatch]);

  useEffect(() => {
    if (isErrorAddGrade) {
      toast.error(messageAddGrade);
      setIsGradeModalOpen(true);
    }

    if (isSuccessAddGrade) {
      toast.success(messageAddGrade);
      setIsGradeModalOpen(false);
      dispatch(resetGradeReducer());
      resetGrade();
    }
    if (messageAddGrade) {
      dispatch(getGrades());
    }
  }, [
    isErrorAddGrade,
    isSuccessAddGrade,
    messageAddGrade,
    resetGrade,
    dispatch,
  ]);

  return (
    <>
      <div className="md:m-2 mt-5 p-2 md:p-5  rounded-3xl">
        <div className="flex justify-between ">
          <Header category={t('page')} title={t('classes')} />
          {/* <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className=" mr-2 pt-1 " />
              Add Class
            </div>
          </button> */}
          {/* <button
            onClick={() => setIsGradeModalOpen(true)}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className=" mr-2 pt-1 " />
              Add Grade
            </div>
          </button> */}
        </div>
        {isModalOpen ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                    <h3 className="text-lg font-semibold">
                      {t('add_new_class')}
                    </h3>
                  </div>
                  <div className="relative flex-auto">
                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                      <div className="overflow-hidden  sm:rounded-md">
                        <div className=" bg-gray-50 px-4 ">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('class_name')}
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                {t('teacher_name')}
                              </label>
                              <input
                                type="text"
                                name="teacherName"
                                id="teacherName"
                                autoComplete="teacherName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register('teacherName')}
                              />
                              {errors.teacherName ? (
                                <span className="text-red-900 text-sm">
                                  {errors.teacherName.message}
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
                        {t('are_you_sure_you_want_to_delete_class', {
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
                      {t('close')}
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
        {isGradeModalOpen ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                    <h3 className="text-lg font-semibold">Add new grade</h3>
                  </div>
                  <div className="relative flex-auto">
                    <form onSubmit={handleSubmitGrade(formSubmitGradeHandler)}>
                      <div className="overflow-hidden  sm:rounded-md">
                        <div className=" bg-gray-50 px-4 ">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Grade
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...registerGrade('name')}
                              />
                              {errors.name ? (
                                <span className="text-red-900 text-sm">
                                  {errors.name.message}
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
                            onClick={handelCancelGrade}
                          >
                            {t('cancel')}{' '}
                          </button>

                          <button
                            disabled={checkSubmitBtnGrade}
                            type="submit"
                            style={{
                              backgroundColor: !checkSubmitBtnGrade
                                ? currentColor
                                : currentColor,
                              opacity: !checkSubmitBtnGrade ? '' : 0.25,
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
        {gradeShowDeleteModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl -mt-10">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <form className=" px-8 pt-6 pb-8 w-full">
                      <div>
                        Are you sure you want to delete grade {gradNameToDelete}
                        ?
                      </div>
                    </form>
                  </div>
                  <div className="flex items-center justify-between p-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-white  bg-red-500 active:bg-red-700 font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleGradeDeleteCancel}
                    >
                      {t('close')}
                    </button>
                    <button
                      style={{ backgroundColor: currentColor }}
                      className="text-white font-semibold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      onClick={handleGradeDelete}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {/* {gradeList && (
          <DataTable
            title="Grade List"
            columns={gradeColumns}
            data={gradeList}
            customStyles={customStyles}
            pagination
            // selectableRows
            fixedHeader
            dense
          />
        )} */}
        {/* <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Grades</h1>
          {gradeList &&
            gradeList.map((grade) => (
              <div key={grade._id} className="my-4">
                <h2 className="text-2xl font-semibold">{grade.name}</h2>
                <ul className="list-disc pl-6 mt-2">
                  {grade.classes.map((cls) => (
                    <li key={cls._id} className="text-lg">
                      {cls.name} - {cls.teacherName}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      handleAddClassInfo(grade._id);
                    }}
                    type="button"
                    className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    style={{
                      backgroundColor: currentColor,
                      borderRadius: '10px',
                    }}
                  >
                    <div className="flex  justify-center ">
                      <FaPlus className="1rem mr-2 pt-1 " />
                      Add Class
                    </div>
                  </button>
                </div>
              </div>
            ))}
        </div> */}
        {gradeList &&
          gradeList.map((grade) => (
            <>
              <div
                key={grade._id}
                className="px-4 py-6  sm:cols-3 sm:gap-4 sm:px-0"
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t('grade_name')} : {grade.name}
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:cols-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {gradeList && (
                      <DataTable
                        columns={columns}
                        data={grade.classes}
                        customStyles={customStyles}
                        pagination
                        paginationComponentOptions={
                          currentLanguageCode === 'ar' ? paginationOptions : ''
                        }
                        // selectableRows
                        fixedHeader
                        dense
                        noDataComponent={t('noDataMessage')}
                      />
                    )}
                  </ul>
                </dd>

                <dd className="mt-2 text-sm text-gray-900 sm:cols-1 sm:mt-0">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      handleAddClassInfo(grade._id);
                    }}
                    type="button"
                    className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    style={{
                      backgroundColor: currentColor,
                      borderRadius: '10px',
                    }}
                  >
                    <div className="flex  justify-center ">
                      <FaPlus className="1rem mr-2 pt-1 " />
                      {t('add_new_class')}{' '}
                    </div>
                  </button>
                </dd>
                <hr class="border-t border-gray-300 my-4" />
              </div>
            </>
          ))}
        {gradeList.length === 0 && <p>{t('noDataMessage')}</p>}

        {/* {classList && (
          <DataTable
            title="Class List"
            columns={columns}
            data={classList}
            customStyles={customStyles}
            pagination
            // selectableRows
            fixedHeader
            dense
          />
        )} */}
      </div>
    </>
  );
}

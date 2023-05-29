import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FaPlus } from 'react-icons/fa';
import { useStateContext } from '../contexts/ContextProvider';
import { addGradeSchema } from '../schema/formSchema';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

export default function Grade() {
  const { currentColor } = useStateContext();
  const [isGradeModalOpen, setIsGradeModalOpen] = useState('');
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

  const [gradeId, setGradeId] = useState('');
  const [gradNameToDelete, setGradNameToDelete] = useState('');
  const [gradeShowDeleteModal, setGradeShowDeleteModal] = useState('');

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
      name: t('grade_name'),
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
            style={{ backgroundColor: 'red', borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <AiOutlineDelete size="1rem " />
              {t('delete')}
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

  useEffect(() => {
    if (isErrorDeleteGrade) {
      toast.error(t('message_error_delete_grade'));
      setGradeShowDeleteModal(true);
    }

    if (isSuccessDeleteGrade) {
      toast.success(t('message_success_delete_grade'));
      setGradeShowDeleteModal(false);
      dispatch(resetGradeReducer());
    }
    if (messageDeleteGrade) {
      dispatch(getGrades());
    }
  }, [
    isErrorDeleteGrade,
    isSuccessDeleteGrade,
    messageDeleteGrade,
    t,
    dispatch,
  ]);

  useEffect(() => {
    if (isErrorAddGrade) {
      toast.error(t('message_error_add_grade'));
      setIsGradeModalOpen(true);
    }

    if (isSuccessAddGrade) {
      toast.success(t('message_success_add_grade'));
      setIsGradeModalOpen(false);
      dispatch(resetGradeReducer());
      resetGrade();
    }
    if (messageAddGrade) {
      dispatch(getGrades());
    }
  }, [
    t,
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
          <Header category={t('page')} title={t('grades')} />
          <button
            onClick={() => setIsGradeModalOpen(true)}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className=" mr-2 pt-1 " />
              {t('add_grade')}
            </div>
          </button>
        </div>
        {isGradeModalOpen ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                    <h3 className="text-lg font-semibold">
                      {' '}
                      {t('add_new_grade')}
                    </h3>
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
                                {t('grade_name')}
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...registerGrade('name')}
                              />
                              {errorsGrade.name ? (
                                <span className="text-red-900 text-sm">
                                  {errorsGrade.name.message}
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
                            {t('cancel')}
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
                        {' '}
                        {t('are_you_sure_you_want_to_delete_grade', {
                          gradNameToDelete,
                        })}
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
        {gradeList && (
          <DataTable
            title={t('grade_list')}
            columns={gradeColumns}
            data={gradeList}
            customStyles={customStyles}
            pagination
            paginationComponentOptions={
              currentLanguageCode === 'ar' ? paginationOptions : ''
            }
            noDataComponent={t('noDataMessage')}
            fixedHeader
            dense
          />
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewList,
  getLists,
  addNewTask,
  editCard,
  resetReducerTask,
} from '../reducers/taskSlice';
import { useStateContext } from '../contexts/ContextProvider';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { listSchema } from '../schema/formSchema';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Kanban() {
  const [newListTitle, setNewListTitle] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const [showModal, setShowModal] = useState(false);
  const { currentColor } = useStateContext();
  const {
    isLoadingDelTask,
    isErrorDelTask,
    isSuccessDelTask,
    messageDelTask,
    isErrorAddNewList,
    isSuccessAddNewList,
    messageAddNewList,
  } = useSelector((state) => state.task);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(listSchema),
  });

  const handelCancel = () => {
    setShowModal(false);
    reset();
  };

  const formSubmitHandler = (data) => {
    dispatch(
      addNewList({
        title: data.title,
        createdBy,
      })
    );
  };

  const watchTitle = watch('title');

  const checkSubmitBtn = watchTitle === undefined || watchTitle === undefined;
  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  useEffect(() => {
    if (isErrorAddNewList) {
      toast.error(t('message_erorr_add_new_list'));
      setShowModal(true);
    }

    if (isSuccessAddNewList) {
      toast.success(t('message_success_add_new_list'));
      setShowModal(false);
      reset();
    }
    if (messageAddNewList) {
      dispatch(getLists());
    }
    dispatch(resetReducerTask());
  }, [
    t,
    reset,
    isErrorAddNewList,
    isSuccessAddNewList,
    dispatch,
    messageAddNewList,
  ]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between">
        <Header category={t('app')} title={t('tasks')} />
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          style={{ backgroundColor: currentColor, borderRadius: '10px' }}
        >
          <div className="flex  justify-center ">
            <FaPlus className=" mr-2 pt-1 " />
            {t('add_list')}
          </div>
        </button>{' '}
      </div>

      {showModal ? (
        <>
          <div
            className=" m-2 md:m-10 mt-24 p-2 md:p-10  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none

"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none ">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-lg font-semibold">
                    {' '}
                    {t('add_new_list')}
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className=" px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm  mb-1">
                      {t('title')}
                    </label>
                    <input
                      name="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register('title')}
                    />
                    {errors.title ? (
                      <span className="text-red-900 text-sm">
                        {errors.title.message}
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
                    {t('close')}
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
                    {t('save')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Board />
    </div>
  );
}

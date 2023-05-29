import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStateContext } from '../contexts/ContextProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardSchema } from '../schema/formSchema';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  addNewList,
  getLists,
  addNewTask,
  editCard,
  delTask,
  resetReducerTask,
} from '../reducers/taskSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.task);
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const [showModal, setShowModal] = useState(false);
  const { currentColor } = useStateContext();
  const [listId, setListId] = useState('');
  const { t } = useTranslation();

  const {
    isLoadingDelTask,
    isErrorDelTask,
    isSuccessDelTask,
    messageDelTask,
    isErrorAddNewTask,
    isSuccessAddNewTask,
    messageAddNewTask,
  } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);
  useEffect(() => {
    setLists(list);
  }, [list]);

  // const handleAddList = () => {
  //   dispatch(
  //     addNewList({
  //       title: newListTitle,
  //       createdBy,
  //     })
  //   );
  // };

  const handleAddCard = (listId) => {
    setListId(listId);
    // dispatch(
    //   addNewTask({
    //     listId,
    //     title: newCardTitle,
    //     description: newCardDescription,
    //     createdBy,
    //   })
    // );
  };

  const handleDragEnd = async ({ draggableId, source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    // update the card's listId
    const card = lists.find((list) => list._id === source.droppableId).cards[
      source.index
    ];

    dispatch(
      editCard({
        cardId: card._id,
        listId: destination.droppableId,
        source: source.droppableId,
      })
    );

    // update the UI
    const sourceList = lists.find((list) => list._id === source.droppableId);
    const destinationList = lists.find(
      (list) => list._id === destination.droppableId
    );
    const updatedSourceList = { ...sourceList, cards: [...sourceList.cards] };
    const updatedDestinationList = {
      ...destinationList,
      cards: [...destinationList.cards],
    };
    const [removed] = updatedSourceList.cards.splice(source.index, 1);
    updatedDestinationList.cards.splice(destination.index, 0, removed);
    const updatedLists = lists.map((list) => {
      if (list._id === sourceList._id) return updatedSourceList;
      if (list._id === destinationList._id) return updatedDestinationList;
      return list;
    });
    setLists(updatedLists);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(cardSchema),
  });

  const handelCancel = () => {
    setShowModal(false);
    reset();
  };

  const formSubmitHandler = (data) => {
    setShowModal(false);

    if (data) {
      dispatch(
        addNewTask({
          listId,
          title: data.title,
          description: data.description,
          createdBy,
        })
      );
    }
  };
  const watchTitle = watch('title');

  const checkSubmitBtn = watchTitle === undefined || watchTitle === undefined;

  const handelDelete = (taskId) => {
    dispatch(delTask(taskId));
  };

  useEffect(() => {
    if (isErrorDelTask) {
      toast.error(t('message_erorr_delete_task'));
      setShowModal(true);
    }

    if (isSuccessDelTask) {
      toast.success(t('message_success_delete_task'));
      setShowModal(false);
    }
    if (messageDelTask) {
      dispatch(getLists());
    }
    dispatch(resetReducerTask());
  }, [t, isErrorDelTask, isSuccessDelTask, messageDelTask, dispatch]);

  useEffect(() => {
    if (isErrorAddNewTask) {
      toast.error(t('message_erorr_add_task'));
      setShowModal(true);
    }

    if (isSuccessAddNewTask) {
      toast.success(t('message_success_add_task'));
      setShowModal(false);
      reset();
    }
    if (messageAddNewTask) {
      dispatch(getLists());
    }
    dispatch(resetReducerTask());
  }, [
    t,
    reset,
    isErrorAddNewTask,
    isSuccessAddNewTask,
    dispatch,
    messageAddNewTask,
  ]);

  return (
    <>
      <div className="flex  flex-wrap md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {lists.map((list) => (
            <div className="list" key={list._id} data-id={list._id}>
              <h2>{list.title}</h2>
              <Droppable droppableId={list._id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="cards-container"
                  >
                    {list.cards.map((card, index) => (
                      <Draggable
                        key={card._id}
                        draggableId={card._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="card"
                          >
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>

                            <button
                              onClick={() => handelDelete(card._id)}
                              type="button"
                              style={{ background: 'red', borderRadius: '50%' }}
                              className="del-btn text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                              <AiOutlineDelete size="1rem" />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

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
                            {t('add_new_card')}
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
                            <label className="block text-black text-sm  mb-1 pt-1">
                              {t('description')}
                            </label>
                            <textarea
                              name="description"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              {...register('description')}
                            />
                            {errors.description ? (
                              <span className="text-red-900 text-sm">
                                {errors.description.message}
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

              <button
                onClick={() => {
                  setShowModal(true);
                  handleAddCard(list._id);
                }}
                type="button"
                className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                style={{ backgroundColor: currentColor, borderRadius: '10px' }}
              >
                {t('add_card')}
              </button>
            </div>
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

export default KanbanBoard;

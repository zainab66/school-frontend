import React, { useState, useMemo, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '../components/Header';
import { useStateContext } from '../contexts/ContextProvider';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as moment from 'moment';
import {
  Calendar,
  Views,
  dateFnsLocalizer,
  momentLocalizer,
} from 'react-big-calendar';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eventSchema } from '../schema/formSchema';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import * as dates from '../data/dates';
import {
  addNewEvent,
  resetReducerEvent,
  getEvents,
  delEvent,
  editEvents,
} from '../reducers/eventSlice';

import 'moment/locale/ar'; // Import Arabic locale

const ArabicToolbar = ({ label, onNavigate, onView }) => {
  const goToToday = () => {
    onNavigate('TODAY');
  };

  const goToPrev = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}
    >
      <button className="toolbar-button" onClick={goToPrev}>
        السابق
      </button>
      <button className="toolbar-button" onClick={goToToday}>
        اليوم
      </button>
      <button className="toolbar-button" onClick={goToNext}>
        التالي
      </button>
      <span className="toolbar-label">{label}</span>
      <button className="toolbar-button" onClick={() => onView('month')}>
        الشهر
      </button>
      <button className="toolbar-button" onClick={() => onView('week')}>
        الأسبوع
      </button>
      <button className="toolbar-button" onClick={() => onView('day')}>
        اليوم
      </button>

      <button className="toolbar-button" onClick={() => onView('agenda')}>
        الاجندة{' '}
      </button>
    </div>
  );
};
// const locales = {
//   'en-US': require('date-fns/locale/en-US'),
// };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });
const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: 'Vacation',
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: 'Conference',
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];
export default function Calender() {
  const { currentColor } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModalToChange, setShowModalToChange] = useState(false);
  const [event, setEvent] = useState('');
  const [eventId, setEventId] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [describe, setDescribe] = useState('');
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next') || 'en';

  const [language, setLanguage] = useState('en'); // Default language is English

  useEffect(() => {
    setLanguage(currentLanguageCode || 'en'); // Set the language state from the cookie or default to English
  }, [currentLanguageCode]);

  moment.locale(language);
  const localizer = momentLocalizer(moment);

  const dispatch = useDispatch();
  const {
    isErrorAddNewEvent,
    isSuccessAddNewEvent,
    messageAddNewEvent,
    eventList,
    isErrorDelEvent,
    isSuccessDelEvent,
    messageDelEvent,
    isErrorEditEvent,
    isSuccessEditEvent,
    messageEditEvent,
  } = useSelector((state) => state.event);

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      max: dates.add(dates.endOf(new Date(2023, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  const openEventClick = (event) => {
    setShowModalToChange(true);
    setEvent(event);
    setEventId(event.id);
  };

  const handleStartDate = async (date) => {
    setStartDate(date);
  };

  const handleEndDate = async (date) => {
    setEndDate(date);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const formSubmitHandler = (data) => {
    // console.log(data, startDate, endDate);
    if (data) {
      dispatch(
        addNewEvent({
          eventTitle: data.eventTitle,
          eventDescription: data.eventDescription,
          startDate,
          endDate,
        })
      );
    }
  };

  const handelCancelEvent = async () => {
    setShowModal(false);
    dispatch(resetReducerEvent());
    setEndDate(null);
    setStartDate(null);
    reset();
  };

  const handelCancelUpdateEvent = async () => {
    setShowUpdateModal(true);
    setShowModalToChange(false);

    setEndDate(new Date(event.end));
    setStartDate(new Date(event.start));
    setTitle(event.title);
    setDescribe(event.describe);
    setEventId(event.id);
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (isErrorAddNewEvent) {
      toast.error(t('message_erorr_add_new_event'));
      setShowModal(true);
    }

    if (isSuccessAddNewEvent) {
      toast.success(t('message_success_add_new_event'));
      setShowModal(false);
      reset();
    }
    if (messageAddNewEvent) {
      dispatch(getEvents());
    }
    dispatch(resetReducerEvent());
  }, [
    t,
    isErrorAddNewEvent,
    isSuccessAddNewEvent,
    messageAddNewEvent,
    dispatch,
    reset,
  ]);

  const handelCancelShowEvent = async () => {
    setShowModalToChange(false);
  };

  const handelDeleteShowEvent = async () => {
    dispatch(delEvent(eventId));
  };

  useEffect(() => {
    if (isErrorDelEvent) {
      toast.error(t('message_erorr_delete_new_event'));
      setShowModalToChange(true);
    }

    if (isSuccessDelEvent) {
      toast.success(t('message_success_delete_new_event'));
      setShowModalToChange(false);
    }
    if (messageDelEvent) {
      dispatch(getEvents());
    }
    dispatch(resetReducerEvent());
  }, [t, isErrorDelEvent, isSuccessDelEvent, dispatch, messageDelEvent]);

  useEffect(() => {
    if (isErrorEditEvent) {
      toast.error(t('message_erorr_edit_new_event'));
      setShowUpdateModal(true);
    }

    if (isSuccessEditEvent) {
      toast.success(t('message_success_edit_new_event'));
      setShowUpdateModal(false);
    }
    if (messageEditEvent) {
      dispatch(getEvents());
    }
    dispatch(resetReducerEvent());
  }, [t, isErrorEditEvent, isSuccessEditEvent, dispatch, messageEditEvent]);

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({ resolver: yupResolver(eventSchema) });

  const formSubmitHandlerEdit = (data) => {
    console.log(data);
    dispatch(
      editEvents({
        eventTitle: data.eventTitle,
        eventDescription: data.eventDescription,
        startDate,
        endDate,

        eventId,
      })
    );
  };
  const handelCancelEditEvent = () => {
    setShowUpdateModal(false);
    resetEdit();
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex flex-wrap justify-between">
        <Header category={t('app')} title={t('calender')} />
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          style={{ backgroundColor: currentColor, borderRadius: '10px' }}
        >
          <div className="flex  justify-center ">
            <FaPlus className=" mr-2 pt-1 " />
            {t('add_event')}
          </div>
        </button>
        {showModal ? (
          <>
            {' '}
            <div className=" m-2 md:m-10 mt-24 p-2 md:p-10  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none ">
                  <div className="flex items-start justify-between p-5  border-solid border-gray-300 rounded-t ">
                    <h3 className="text-lg font-semibold">
                      {' '}
                      {t('add_new_event')}
                    </h3>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <form className=" px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm  mb-1">
                        {t('event_title')}{' '}
                      </label>
                      <input
                        name="eventTitle"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register('eventTitle')}
                      />
                      {errors.eventTitle ? (
                        <span className="text-red-900 text-sm">
                          {errors.eventTitle.message}
                        </span>
                      ) : (
                        <></>
                      )}
                      <label className="block text-black text-sm  mb-1 pt-1">
                        {t('start_date')}
                      </label>

                      <DatePicker
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(date) => handleStartDate(date)}
                        id="start"
                        placeholderText="Select date"
                        selected={startDate}
                        timeIntervals={1}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                      />

                      <label className="block text-black text-sm  mb-1 pt-1">
                        {t('end_date')}
                      </label>

                      <DatePicker
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="end"
                        placeholderText="Select date"
                        selected={endDate}
                        onChange={(date) => handleEndDate(date)}
                        timeIntervals={1}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                      />

                      <label className="block text-black text-sm  mb-1">
                        {t('event_description')}
                      </label>
                      <input
                        name="eventDescription"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register('eventDescription')}
                      />
                      {errors.eventDescription ? (
                        <span className="text-red-900 text-sm">
                          {errors.eventDescription.message}
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
                      onClick={handelCancelEvent}
                    >
                      {t('close')}{' '}
                    </button>
                    <button
                      onClick={handleSubmit(formSubmitHandler)}
                      disabled={!endDate && !startDate}
                      style={{
                        borderRadius: '10px',
                        backgroundColor:
                          endDate && startDate ? currentColor : currentColor,
                        opacity: endDate && startDate ? '' : 0.25,
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
                        text-white shadow-sm"
                      type="submit"
                    >
                      {t('save')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {showModalToChange ? (
          <>
            <div
              className=" m-2 md:m-10 mt-24 p-2 md:p-10  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none

"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none ">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                  </div>

                  <div className=" px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-lg font-semibold mb-1">
                      {event.describe}
                    </label>
                    <div className="flex items-start flex-wrap justify-between ">
                      {' '}
                      <label className="block text-black text-sm  mb-1 pt-1">
                        {t('from')} :{' '}
                        {moment(event.start).format('ddd DD MMM YY LT')}
                      </label>
                      <label className="block text-black text-sm  mb-1 pt-1">
                        {t('to')} :{' '}
                        {moment(event.end).format('ddd DD MMM YY LT')}
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      style={{
                        borderRadius: '10px',
                      }}
                      className="inline-flex w-full justify-center  text-white rounded border border-gray-300 bg-red-500 px-4 py-2 text-sm font-semibold shadow hover:shadow-lg outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      type="button"
                      onClick={handelDeleteShowEvent}
                    >
                      {t('delete')}
                    </button>

                    <button
                      style={{
                        borderRadius: '10px',
                        backgroundColor: currentColor,
                      }}
                      className="inline-flex w-full justify-center text-white  border border-gray-300 px-4 py-2 font-semibold  text-sm rounded shadow hover:shadow-lg outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      type="button"
                      onClick={handelCancelUpdateEvent}
                    >
                      {t('update')}
                    </button>
                    <button
                      style={{
                        borderRadius: '10px',
                      }}
                      className="inline-flex w-full justify-center text-white border-gray-300  bg-yellow-500  font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      type="button"
                      onClick={handelCancelShowEvent}
                    >
                      {t('close')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {showUpdateModal ? (
          <>
            {' '}
            <div className=" m-2 md:m-10 mt-24 p-2 md:p-10  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none ">
                  <div className="flex items-start justify-between p-5  border-solid border-gray-300 rounded-t ">
                    <h3 className="text-lg font-semibold">
                      {' '}
                      {t('add_new_event')}
                    </h3>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <form className=" px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm  mb-1">
                        {t('event_title')}
                      </label>
                      <input
                        defaultValue={title}
                        name="eventTitle"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...registerEdit('eventTitle')}
                      />
                      {errorsEdit.eventTitle ? (
                        <span className="text-red-900 text-sm">
                          {errorsEdit.eventTitle.message}
                        </span>
                      ) : (
                        <></>
                      )}
                      <label className="block text-black text-sm  mb-1 pt-1">
                        {t('start_date')}
                      </label>

                      <DatePicker
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(date) => handleStartDate(date)}
                        id="start"
                        placeholderText="Select date"
                        selected={startDate}
                        timeIntervals={1}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                      />

                      <label className="block text-black text-sm  mb-1 pt-1">
                        {t('end_date')}
                      </label>

                      <DatePicker
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="end"
                        placeholderText="Select date"
                        selected={endDate}
                        onChange={(date) => handleEndDate(date)}
                        timeIntervals={1}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect
                      />

                      <label className="block text-black text-sm  mb-1">
                        {t('event_description')}
                      </label>
                      <input
                        defaultValue={describe}
                        name="eventDescription"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...registerEdit('eventDescription')}
                      />
                      {errorsEdit.eventDescription ? (
                        <span className="text-red-900 text-sm">
                          {errorsEdit.eventDescription.message}
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
                      onClick={handelCancelEditEvent}
                    >
                      {t('close')}
                    </button>
                    <button
                      onClick={handleSubmitEdit(formSubmitHandlerEdit)}
                      disabled={!endDate && !startDate}
                      style={{
                        borderRadius: '10px',
                        backgroundColor:
                          endDate && startDate ? currentColor : currentColor,
                        opacity: endDate && startDate ? '' : 0.25,
                      }}
                      className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
                        text-white shadow-sm"
                      type="submit"
                    >
                      {t('save')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <Calendar
        defaultDate={defaultDate}
        max={max}
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        className=" overflow-x-auto"
        style={{ height: 500, margin: '0px', fontFamily: 'Patrick Hand' }}
        // views={views}
        onSelectEvent={openEventClick}
        components={{
          toolbar: language === 'ar' ? ArabicToolbar : '',
        }}
      />
    </div>
  );
}

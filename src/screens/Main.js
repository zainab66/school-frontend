import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { RiParentLine } from 'react-icons/ri';
import { SiGoogleclassroom } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { useStateContext } from '../contexts/ContextProvider';
import { getTeachers } from '../reducers/teacherSlice';
import { getStudents } from '../reducers/studentSlice';
import { getClasses } from '../reducers/classSlice';
import BarChart from '../components/Charts/BarChart';
import PieChart from '../components/Charts/PieChart';
import { useTranslation } from 'react-i18next';

export default function Main() {
  const { currentColor, currentMode } = useStateContext();
  const { teacherList } = useSelector((state) => state.teacher);
  const { studentList } = useSelector((state) => state.student);
  const { classList } = useSelector((state) => state.class);
  const [teacherNumber, setTeacherNumber] = useState(0);
  const [studentNumber, setStudentNumber] = useState(0);
  const [classNumber, setClassNumber] = useState(0);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
    dispatch(getStudents());
    dispatch(getClasses());
  }, [dispatch]);

  useEffect(() => {
    setTeacherNumber((teacherList && teacherList.length) || 0);
  }, [teacherList, setTeacherNumber]);

  useEffect(() => {
    setStudentNumber((studentList && studentList.length) || 0);
  }, [studentList, setStudentNumber]);

  useEffect(() => {
    setClassNumber((classList && classList.length) || 0);
  }, [classList, setClassNumber]);

  const earningData = [
    {
      icon: <FaChalkboardTeacher />,
      amount: teacherNumber,
      percentage: '-12%',
      title: t('teachers'),
      iconColor: ' #fff',
      iconBg: currentColor,
      pcColor: 'red-600',
    },
    {
      icon: <FaUserGraduate />,
      amount: studentNumber,
      // percentage: '-4%',
      title: t('students'),
      iconColor: '#fff',
      iconBg: currentColor,
      pcColor: 'red-600',
    },
    {
      icon: <RiParentLine />,
      amount: '4,396',
      // percentage: '+23%',
      title: t('parents'),
      iconColor: '#fff',
      iconBg: currentColor,
      pcColor: 'green-600',
    },
    {
      icon: <SiGoogleclassroom />,
      amount: classNumber,
      // percentage: '+38%',
      title: t('classes'),
      iconColor: ' #fff',
      iconBg: currentColor,

      pcColor: 'green-600',
    },
  ];

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getMonth() + 1}`;
    }
    return '';
  };

  const maleCount =
    studentList &&
    studentList.filter((student) => student.gender === 'male').length;
  const femaleCount =
    studentList &&
    studentList.filter((student) => student.gender === 'female').length;

  return (
    <div className=" mt-20">
      <div className=" px-5  ">
        <div className="flex flex-wrap  lg:flex-nowrap justify-center">
          {earningData.map((item) => (
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <div className="bg-white border rounded shadow p-2">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <button
                      type="button"
                      style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                      }}
                      className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      {item.icon}
                    </button>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="text-sm text-gray-400  mt-1">
                      {item.title}
                    </h5>
                    <h3 className="text-lg font-semibold">{item.amount}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row flex-wrap flex-grow mt-2">
          <div className="w-full md:w-3/6	  p-3">
            <div className="bg-white border rounded shadow">
              <div className=" p-3">
                <h5 className="font-bold  text-gray-600">
                  {t('students_gender')}
                </h5>
              </div>
              <div className="p-5 ">
                {' '}
                <BarChart students={studentList} />
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/6		 p-3">
            <div className="bg-white border rounded shadow">
              <div className=" p-3">
                <h5 className="font-bold  text-gray-600">
                  {' '}
                  {t('teachers_age')}
                </h5>
              </div>
              <div className="p-5 ">
                <PieChart teacherList={teacherList} />
              </div>
            </div>
          </div>

          <div className="w-full 	 p-3">
            <div className="bg-white border rounded shadow">
              <div className=" p-3">
                <h5 className="font-bold  text-gray-600">
                  {t('number_of_students')}
                </h5>
              </div>
              <div className="p-5 ">chart</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

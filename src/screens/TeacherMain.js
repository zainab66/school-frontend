import React from 'react';
import AddStudent from './AddStudent';

export default function TeacherMain() {
  const Tabs = ({ color }) => {
    const [openTab, setOpenTab] = React.useState(1);

    return (
      <>
        <div className="flex flex-wrap mt-10">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-5 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === 1 ? 'text-blue-600 bg-white' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Student
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === 2 ? 'text-blue-600 bg-white' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Patients List
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                    (openTab === 3 ? 'text-blue-600 bg-white' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Dashboard Search
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? 'block' : 'hidden'}
                    id="link1"
                  >
                    <AddStudent />
                  </div>
                  <div
                    className={openTab === 2 ? 'block' : 'hidden'}
                    id="link2"
                  >
                    PatientsList
                  </div>
                  <div
                    className={openTab === 3 ? 'block' : 'hidden'}
                    id="link3"
                  >
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br /> Dramatically maintain clicks-and-mortar solutions
                      without functional solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Tabs color="blue" />
        </div>
      </main>
    </>
  );
}

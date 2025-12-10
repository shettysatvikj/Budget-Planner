// import React from 'react'
// import Sidebar from './Sidebar'
// import Navbar from './Navbar'
// import Navbar2 from './Navbar2'
// import StatsCards from './StatsCards'
// import Dashboard from './Dashboard'

// const Landingpage = () => {
//   return (
//        <div className='flex' >
//       <Sidebar/>
//       <div className='w-full'>
//       <Navbar/>
   
//       <StatsCards/>
//       <Dashboard/>
//     </div>
//     </div>
//   )
// }

// export default Landingpage
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCards from "./StatsCards";
import Dashboard from "./Dashboard";

const Landingpage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="w-full md:ml-[15%] p-4 md:p-6 mt-16 md:mt-0 transition-all">
        <Navbar />

        <div className="mt-6">
          <StatsCards />
        </div>

        <div className="mt-6">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Landingpage;

import React from 'react'
import { CalendarDays } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { Plus } from 'lucide-react';

const Navbar2 = () => {
  return (
    <div className='flex w-full p-5 font-bold items-center justify-between'>
        <div className='flex items-center gap-4'>
             <CalendarDays className='border-3 border-gray-200 rounded-full h-14 w-14 p-3 ' />
             <h3 className='border-3 text-sm border-gray-200 rounded-2xl  p-3 '>This month</h3>
        </div>
        <div className='flex gap-3'>
            <div className='flex rounded-2xl p-2.5 gap-2 border-3 border-gray-200'><LayoutGrid/> <h1>Manage widgets</h1></div>
            <div className=' flex rounded-2xl gap-2 bg-[#7e62e6] text-white p-2.5 '>  <Plus/> <h1>Add new widgets</h1></div>
        
      </div>
    </div>
  )
}

export default Navbar2
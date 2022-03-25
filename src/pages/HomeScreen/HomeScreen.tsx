import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Calendar } from '../../components/Calendar/Calendar';

export const HomeScreen = () => {
  return (
    <div>
        <Navbar />
      <div className='flex'>
        <Sidebar />
        <Calendar />
      </div>
    </div>
  )
}

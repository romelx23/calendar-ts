import React from 'react'
import { Form } from '../Form/Form'

export const Sidebar = () => {
  return (
    <div className=' w-full absolute lg:relative h-40 lg:top-0 lg:w-64 lg:min-h-[93vh] bg-gray-900 top-16 lg:flex flex-col'>
        <button className='absolute right-0 px-3 bg-gray-600 lg:hidden'>X</button>
        <h1>Home</h1>
        <h1>Calendar</h1>
        <Form/>
    </div>
  )
}

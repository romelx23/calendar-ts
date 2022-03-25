import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { CalendarContext } from '../../context/CalendarContext';
interface Calendar {
  month: string;
  days: Days[];
  currentYear: number;
  monthKey: number;
  startsOn: number;
}
interface Days {
  day: number;
}

export const Calendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null)
  const { moths, weekDays, setDays, intl, intlWeekDay, days, currentDay, currentMonth, year, dates } = useContext(CalendarContext);
  const [currentYear, setYear] = useState(2022);
  const [fecha, setFecha] = useState<number[][]>([]);

  const calendar: Calendar[] = moths.map(monthKey => {
    const month = intl.format(new Date(currentYear, monthKey));
    const nextMothIndex = monthKey + 1;
    const daysOfMonth = new Date(currentYear, nextMothIndex, 0).getDate();
    const days = [...Array(daysOfMonth).keys()].map(dayKey => {
      const day = dayKey + 1;
      return {
        day,
      }
    })
    let startsOn = new Date(currentYear, monthKey, 1).getDay();
    startsOn === 0 ? startsOn = 7 : startsOn;

    return {
      month,
      monthKey,
      currentYear,
      days,
      startsOn,
    }
  })

  const weekDaysNames = weekDays.map(weekDayIndex => {
    const date = new Date(2021, 10, weekDayIndex + 1)
    const weekDayName = intlWeekDay.format(date);
    // console.log(weekDayName);
    return weekDayName;
  })

  const showDate = (calendar: Calendar, i: number) => {
    // alert(`${calendar.days[i].day} ${calendar.month} del ${currentYear}`)
    const date = new Date(currentYear, calendar.monthKey, calendar.days[i].day)
    console.log(date);
  }

  const currentDate = (date:Calendar,day:number):string =>{
    return (currentDay === day && currentMonth === date.monthKey && year===date.currentYear) ? 'bg-purple-400' : ''
  }
  
  const setDates = () =>{
      const fecha=dates.map(d=>{
        return [parseInt(d.fecha.split('/')[0]),parseInt(d.fecha.split('/')[1]),parseInt(d.fecha.split('/')[2])]
      })
      console.log(fecha);
      setFecha(fecha);
      // const estilos=fecha.map(d => {
      //   // console.log(d[0],d[1],d[2]);
      //   return (d[0] === day && d[1] === date.monthKey && d[2]===date.currentYear) ? 'bg-purple-400' : ''
      // });
      // console.log(estilos);
  }
  
  useEffect(() => {
    setDates();
    setDays(calendar);
    // console.log(calendar);
    // console.log(weekDaysNames);
    // setDays(calendar);
  }, [currentYear,dates])

  return (
    <div className='w-full bg-gray-600 p-3 relative'>
      <div className="flex justify-between absolute w-[98%]">
        <button onClick={() => setYear(currentYear - 1)} className='p-2 rounded-full bg-gray-800 w-12 hover:bg-gray-700'>{'<'}</button>
        <button onClick={() => setYear(currentYear + 1)} className='p-2 rounded-full bg-gray-800 w-12 hover:bg-gray-700'>{'>'}</button>
      </div>
      <h1 className='text-3xl font-bold z-10'>Calendario {currentYear}</h1>
      <div className="grid grid-cols-cards gap-3">
        {
          calendar.map((date, i) => {
            return (
              <div key={i}>
                <h2 className='text-2xl font-bold capitalize'>{date.month}</h2>
                <div className="w-full h-10 bg-gray-800 grid grid-cols-7">
                  {
                    weekDaysNames.map((dayname, i) => {
                      return <h1 key={i}>{dayname.slice(0, 2)}</h1>
                    })
                  }
                </div>
                <div className='grid grid-cols-7'>
                  {
                    date.days.map((day, i) => {
                      return (
                        <div
                          key={i}
                          className={`calendar ${currentDate(date,i)}`}
                          style={{ gridColumnStart: `${i === 0 ? date.startsOn : ''}` }}
                          ref={calendarRef}
                          onClick={() => showDate(date, i)}
                        >
                          <h3 className='text-2xl font-bold'>{day.day}</h3>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

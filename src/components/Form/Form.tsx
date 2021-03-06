import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { CalendarContext } from '../../context/CalendarContext';
import { v4 as uuidv4 } from 'uuid';

interface Form {
  id: string;
  tarea: string;
  fecha: string;
  prioridad: string;
}

export const Form = () => {
  // const [dates, setDates] = useState<Form[]>([])
  const { dates, setDates, days, setDays } = useContext(CalendarContext);
  const { handleInputChange, values, reset } = useForm<Form>({
    id: '',
    tarea: '',
    fecha: '',
    prioridad: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(values);
    const format = {
      id: uuidv4(),
      tarea: values.tarea,
      fecha: new Date(values.fecha).toLocaleDateString(),
      prioridad: values.prioridad
    }
    // console.log(format);
    setDates([...dates, format])
    reset();
  }

  useEffect(() => {
    console.log(dates,'dates');
    const auxDays = days.map((mes) => {
      // día/mes/anio
      for (const event of dates){
        console.log({
          anio: event.fecha.split('/')[2],
          mes: event.fecha.split('/')[1],
          dia: event.fecha.split('/')[0],
          anio2: mes.currentYear,
          mes2: mes.monthKey-1,
          // dia2: mes.days[parseInt(event.fecha.split('/')[0]) - 1].day.toString()
        });
        if (event.fecha.split('/')[2] === mes.currentYear.toString() && event.fecha.split('/')[1] === (mes.monthKey-1).toString() ) {
          console.log('entro al if');
          console.log(parseInt(event.fecha.split('/')[0]) - 1);
          mes.days[parseInt(event.fecha.split('/')[0]) - 1].event = true;
          mes.days[parseInt(event.fecha.split('/')[0]) - 1].id_event = event.id;
          console.log(mes.days[parseInt(event.fecha.split('/')[0]) - 1]);
        }
      }
      console.log(mes,'mes');
      return mes;
    })
    console.log(auxDays);
    console.log('en el useEffect');
    setDays(auxDays);
  }, [dates])

  return (
    <div className='w-full h-60 bg-gray-800 text-gray-800 flex flex-col gap-3 p-2'>
      <h1 className='text-white'>Ingrese su Tarea</h1>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input onChange={handleInputChange} type="text" name="tarea" placeholder='tarea' className='w-full rounded-lg py-2 px-3' required={true} />
        <input onChange={handleInputChange} type="datetime-local" name="fecha" id="" className='w-full' required={true} />
        <select name="prioridad" id="" onChange={handleInputChange} required={true} defaultValue="green">
          <option value="green" defaultValue='green'>Verde 💹 </option>
          <option value="warning">Amarillo 😮</option>
          <option value="red">Rojo 🍚</option>
        </select>
        <button
          className='text-white 
        bg-gray-700
         p-2 rounded-lg
          hover:bg-gray-600'
        >Enviar
        </button>
      </form>
      {
        dates.map((date, i) => (
          <div className='flex flex-col gap-3 text-left bg-gray-500 rounded-lg p-2' key={i}>
            <p className='text-white text-right px-2 font-semibold text-2xl'>{i}</p>
            <p className='text-white'>{date.tarea}</p>
            <p className='text-white'>{date.fecha}</p>
            <p className='text-white'>{
              date.prioridad === 'green' ? 'Verde 💹' :
                date.prioridad === 'warning' ? 'Amarillo 😮' :
                  date.prioridad === 'red' ? 'Rojo 🍚' :
                    'No seleccionado'
            }</p>
          </div>
        ))
      }
    </div>
  )
}

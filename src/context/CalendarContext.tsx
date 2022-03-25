import { createContext, Dispatch, FC, useState } from "react";

interface CalendarContext {
    currentDate: Date;
    currentDay: number;
    currentMonth: number;
    year: number;
    days: Calendar[];
    currentYear: number;
    locale: string;
    moths: number[];
    weekDays: number[];
    dates:Form[];
    intl: Intl.DateTimeFormat;
    intlWeekDay: Intl.DateTimeFormat;
    weekDaysNames: string[];
    setDates: Dispatch<React.SetStateAction<Form[]>>;
    showDate: (calendar: Calendar, i: number) => void;
    setCurrentDate: (date: Date) => void;
    setCurrentDay: (day: number) => void;
    setCurrentMonth: (month: number) => void;
    setYear: Dispatch<React.SetStateAction<number>>;
    setDays: (days: Calendar[]) => void;
    setCurrentYear: (year: number) => void;
    setLocale: (locale: string) => void;
    setMoths: (moths: number[]) => void;
    setWeekDays: (weekDays: number[]) => void;
}

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

interface Form {
    tarea: string;
    fecha: string;
    prioridad: string;
  }

export const CalendarContext = createContext<CalendarContext>({
    currentDate: new Date(),
    currentDay: 0,
    currentMonth: 0,
    year: 0,
    days: [],
    currentYear: 0,
    locale: 'es-ES',
    moths: [],
    weekDays: [],
    intl: new Intl.DateTimeFormat('es-ES', { month: 'long' }),
    intlWeekDay: new Intl.DateTimeFormat('es-ES', { weekday: 'long' }),
    weekDaysNames: [],
    dates:[],
    setDates: () => {},
    showDate: () => { },
    setCurrentDate: () => { },
    setCurrentDay: () => { },
    setCurrentMonth: () => { },
    setYear: () => { },
    setDays: () => { },
    setCurrentYear: () => { },
    setLocale: () => { },
    setMoths: () => { },
    setWeekDays: () => { },
});

export const CalendarProvider:FC = ({children})=>{
    const [dates, setDates] = useState<Form[]>([])
    const currentDate = new Date();
    const currentDay = currentDate.getUTCDate()-1;
    const currentMonth = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const [days, setDays] = useState<Calendar[]>([]);
    // const currentYear = 2022;
    const [currentYear, setYear] = useState(2022);
    const locale = 'es-ES'
    const moths = [...Array(12).keys()];
    const weekDays = [...Array(7).keys()];
    const intl = new Intl.DateTimeFormat(locale, { month: 'long' });
    const intlWeekDay = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    // console.log(currentDate.getUTCDate(),currentMonth+1,year);
    // console.log(dates);

    return (
        <CalendarContext.Provider value={{
            currentDate,
            currentDay,
            currentMonth,
            year,
            days,
            currentYear,
            locale: 'es-ES',
            moths,
            weekDays,
            intl,
            intlWeekDay,
            weekDaysNames: [],
            dates,
            setDates,
            showDate: () => { },
            setCurrentDate: () => { },
            setCurrentDay: () => { },
            setCurrentMonth: () => { },
            setYear: () => { },
            setDays: () => { },
            setCurrentYear: () => { },
            setLocale: () => { },
            setMoths: () => { },
            setWeekDays: () => { },
        }}>
            {children}
        </CalendarContext.Provider>
    )
}
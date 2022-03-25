import './App.css'
import { HomeScreen } from './pages/HomeScreen/HomeScreen'
import { CalendarProvider } from './context/CalendarContext';

function CalendarApp() {
  return (
    <div className="App">
      <CalendarProvider>
        <HomeScreen />
      </CalendarProvider>
    </div>
  )
}

export default CalendarApp

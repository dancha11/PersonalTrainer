import './App.css';
import {  BrowserRouter,  Routes,  Route,   NavLink} from"react-router-dom";
import React from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import CalendarPage from './components/Calendar';
import Chart from './components/Chart';







function App() {


  const trainingsURL = 'https://customerrest.herokuapp.com/api/trainings/'

  const styles = {
    tab: {
        color: '#00394e',
        fontWeight: 'bold',
        margin: '30px',
        position: 'relative',
        padding: '20px',
    },
    title: {
      

      color: '#00394e',
      fontWeight: 'bold',
      
  }
  }

  
 
  return (
    <div>
          <h1 style={styles.title}> 
          Personal trainer</h1>
          <img src={'https://m.media-amazon.com/images/I/61zFHWGgDxL._AC_SL1500_.jpg'} 
          className='FrontPageImage' alt='handweights' width="10%" height= "10%"/>


   
  <BrowserRouter >
  
  <NavLink
        to="/"
        style={({ isActive }) => (isActive ? {color: 'green',
        fontWeight: 'bold',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',})}>
        Customer list
  </NavLink>
  <NavLink
        to="/training"
        style={({ isActive }) => (isActive ? {color: 'green',
        fontWeight: 'bold',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',})}>
        Training list
  </NavLink>
  <NavLink
        to="/chart"
        style={({ isActive }) => (isActive ? {color: 'green',
        fontWeight: 'bold',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',})}>
        Statistics
  </NavLink>
  <NavLink
        to="/calendar"
        style={({ isActive }) => (isActive ? {color: 'green',
        fontWeight: 'bold',
        padding: '20px',} : 
        {color: '#00394e',
        padding: '20px',})}>
        Calendar
  </NavLink>
 

  <Routes>
  <Route path="/"element={<Customerlist />} />
  <Route path="/training"element={<Traininglist link={trainingsURL}/>} />
  <Route path="/calendar"element={<CalendarPage link={trainingsURL}/>} />
  <Route path="/chart"element={<Chart link={trainingsURL}/>}/>

</Routes>
  </BrowserRouter>

  </div>
  )
}

export default App;

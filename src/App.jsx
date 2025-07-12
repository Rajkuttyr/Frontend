import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from "react-router-dom";
import Loginpages from './Login';
import Dashboard from './Dashboard';
import Courses from './Courses';
import Mycourses from './Mycourses';
import Subtopics from './subtopics';
import Contents from './coursecontents';





function App() {
  
  
  

  return (
    <>

   
   
    <Routes>
      <Route path="/" element={<Loginpages/>}/>
      
      
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/mycourses" element={<Mycourses/>}/>
      <Route path="/subtopics" element={<Subtopics/>}/>
      <Route path="/coursecontents" element={<Contents/>}/>
    </Routes>
    

    
 
    
    

    </>
  );
}

export default App

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
import CourseForm from './Addcourse';
import Quizz from './Quizz';
import Completedcourse from './Completedcourse';
import Signup from './Signup';
import axios from 'axios';  
import CourseDetailPage from './Coursedetailpage';  
import Controllrole from './Controllrole';




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
      <Route path="/addcourse" element={<CourseForm/>}/>
      <Route path="/quizz" element={<Quizz/>}/>
      <Route path='/completedcourses' element={<Completedcourse/>}/>
      <Route path='/ongoing' element={<Mycourses/>}/>
      <Route path ='/signup' element={<Signup/>}/>
      <Route path ='/coursedetail' element={<CourseDetailPage/>}/>
      <Route path='/controlrole' element ={<Controllrole/>}/>
    </Routes>
    
    

    
 
    
    

    </>
  );
}

export default App

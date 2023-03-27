import React from 'react'
import CustReportGen from './components/CustReportGen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Test from "./components/Test";

import "./styles/CustReportGen.scss"

export default function App() {

  return (

    <Router>
      <Routes>
        <Route path='/' element={<CustReportGen />} />
        <Route path='/test' element={<Test/>} />
      </Routes>
    </Router>
  )
}

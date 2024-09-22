import React from 'react'
import MainHome from './components/Templates/MainHome'
import Editor from './components/Editor/Editor'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<MainHome />} />
          <Route path='*' element={<h1>Not Found</h1>} />
          <Route path='/editor' element={<Editor />} />
        </Routes>
      </Router>
  )
}

export default App
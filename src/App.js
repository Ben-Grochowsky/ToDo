import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className='App'>
      <AuthProvider>
        
      </AuthProvider>
    </div>
  )
}
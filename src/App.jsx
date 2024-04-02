import { useState } from 'react'
import Header from './components/Header.jsx'
import Tasks from './components/Tasks.jsx'
import './css/App.css'

export default function App() {

  return (
    <div className='App'>
      <header><Header /></header>
      <main><Tasks /></main>
    </div>
  )
}
import './App.css'
import Header from './Component/Header'
import Participants from './Component/Participants'
import Tournaments from './Component/Tournaments'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Tournaments />} />
        <Route path='/participant' element={<Participants />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import CalendarioComunicaciones from './pages/CalendarioComunicaciones'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/calendario-comunicaciones" element={<CalendarioComunicaciones />} />
          <Route path="*" element={<Navigate to="/calendario-comunicaciones" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

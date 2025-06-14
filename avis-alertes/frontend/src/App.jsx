import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import AlertDetail from "./pages/AlertDetail"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alertDetail/:id' element={<AlertDetail />} />
      </Routes>
    </Router>
  )
}

export default App;
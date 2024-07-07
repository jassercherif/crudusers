import './App.css';
import Home from './pages/Home';
import { SimpleRegistrationForm } from './pages/RegisterForm';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/:id" element={<SimpleRegistrationForm />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App

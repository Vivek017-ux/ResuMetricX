import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'

 import { BrowserRouter, Route, Routes } from 'react-router';



import Root from './pages/Root';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import GenerateResume from './pages/GenerateResume';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='services' element={<Services />} />
          <Route path='contact' element={<Contact />} />
          <Route path='generate-resume' element={<GenerateResume />} />
        </Route>

      </Routes>

    </BrowserRouter>

  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Events from './Events.jsx';
import Resource from './Resource.jsx';
import Contact from './Contact.jsx';
import Advocacy from './Advocacy.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/event" element={<Events/>} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/advocacy" element={<Advocacy/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)



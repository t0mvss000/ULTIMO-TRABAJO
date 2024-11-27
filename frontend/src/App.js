import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Importa el componente Header
import HomePage from './components/HomePage';
import PracticeListPage from './components/PracticeListPage';
import casonaImage from './components/IMAGENES/Casona-2-scaled.jpg'; // Importa la imagen
import AddPracticePage from './components/AddPracticePage';
import EvaluationFormPage from './components/EvaluationFormPage';
import ProfilePage from './components/ProfilePage';
import DocumentManagementPage from './components/DocumentManagementPage';
import LoginPage from './components/LoginPage';
import PracticeDetailPage from './components/PracticeDetailsPage';

function App() {
  return (
    
    <Router>
      <div>
      
        

        <Routes>
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/practicas" element={<PracticeListPage />} />
          <Route path="/añadir-practica" element={<AddPracticePage />} />
          <Route path="/evaluacion" element={<EvaluationFormPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/documentos" element={<DocumentManagementPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/practicas/:id" element={<PracticeDetailPage />} />
        </Routes>
        
      </div>
    </Router>
   
    
  );
}

export default App;
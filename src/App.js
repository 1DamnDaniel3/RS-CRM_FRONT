import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/styles/global.css';

import Authorisation from './components/pages/authorisationPage';
import Registration from './components/pages/registrationPage';
import Account from './components/pages/profilePage';
import Leads from './components/pages/leadsPage';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/protectedRoute';

const App = () => {
  return (
    <div className='appContainer'>
      <ConditionalHeader />
      <div className='mainContent'>
        <Routes>
          <Route path="/login" element={<Authorisation />} />
          
          <Route element={<ProtectedRoute/>}>
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Account />} />
            <Route path="/leads" element={<Leads />} />
          </Route>
          
        </Routes>
      </div>
      <ConditionalFooter />
    </div>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  const showHeaderPaths = ['/profile', '/leads'];

  return showHeaderPaths.includes(location.pathname) ? <Header /> : null;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const showHeaderPaths = ['/leads'];

  return showHeaderPaths.includes(location.pathname) ? <Footer /> : null;
};

export default App;

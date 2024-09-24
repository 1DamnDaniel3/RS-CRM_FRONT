import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './assets/styles/global.css';

import Authorisation from './components/pages/authorisation/authorisationPage';
import Registration from './components/pages/registration/registrationPage';
import Account from './components/pages/profile/profilePage';
import Leads from './components/pages/leads/leadsPage';
import Students from './components/pages/students/studentsPage';
import Payment from './components/pages/beta-test-payment/paymentPagebeta'

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/protectedRoute/protectedRoute';

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
            <Route path="/students" element={<Students/>}/>
            <Route path="/payment" element={<Payment/>}/>
          </Route>
          
        </Routes>
      </div>
      <ConditionalFooter />
    </div>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  const showHeaderPaths = ['/profile', '/leads', '/students', '/payment'];

  return showHeaderPaths.includes(location.pathname) ? <Header /> : null;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const showHeaderPaths = ['/leads', '/students'];

  return showHeaderPaths.includes(location.pathname) ? <Footer /> : null;
};

export default App;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, ScrollRestoration } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { FooterWithLogo } from "./Components/Footer";
import DonorApplication from "./Pages/User/DonorApplication";
import Article from "./Pages/Article";
import SingleArticle from "./Pages/SingleArticle";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import { getUser } from "./utils/helper";
import ScrollToTop from "./utils/ScrollToTop";
import AdminSideNav from "./Components/Admin/AdminSideNav";
import { useMediaQuery } from 'react-responsive';
import { ComplexNavbar } from "./Components/Admin/AdminNavbar";
import DonorsPage from "./Pages/Admin/Donors/DonorsPage";
function MainContent() {
  const location = useLocation();
  
  const isAdministrativePersonnelRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff');
  const isAdministrativePersonnelUser = getUser() && (getUser().role === 'Admin' || getUser().role === 'Staff' || getUser().role === 'SuperAdmin');
  
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px' })
  return (
    <div className={`flex  ${isAdministrativePersonnelUser && isAdministrativePersonnelRoute && isDesktopOrLaptop ? 'flex-row' : 'flex-col'}`}>
      {isAdministrativePersonnelUser && isAdministrativePersonnelRoute && <AdminSideNav />}
      <ScrollToTop />
      {isAdministrativePersonnelUser && isAdministrativePersonnelRoute ? (
        <div className="w-full flex flex-col gap-2">
          <ComplexNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donor-application" element={<DonorApplication />} />
            <Route path="/articles" element={<ProtectedRoute><Article /></ProtectedRoute>} />
            <Route path="/article/:id" element={<ProtectedRoute><SingleArticle /></ProtectedRoute>} />

            {/* Superadmin routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute isAuthorized={true}><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/donors" element={<ProtectedRoute isAdmin={true}><DonorsPage/></ProtectedRoute>}/>
          </Routes>
        </div>) :
        (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donor-application" element={<DonorApplication />} />
            <Route path="/articles" element={<ProtectedRoute><Article /></ProtectedRoute>} />
            <Route path="/article/:id" element={<ProtectedRoute><SingleArticle /></ProtectedRoute>} />

            {/* Superadmin routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute isSuperAdmin={true}><Dashboard /></ProtectedRoute>} />
          </Routes>
        )}

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MainContent />

      <FooterWithLogo />
    </BrowserRouter>
  );
}

export default App;

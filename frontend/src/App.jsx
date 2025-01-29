import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useMatch } from 'react-router-dom';
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
import SingleDonor from "./Components/Admin/Donors/SingleDonor";
function MainContent() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const isAdministrativePersonnelRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff');
  const isAdministrativePersonnelUser = getUser() && (getUser().role === 'Admin' || getUser().role === 'Staff' || getUser().role === 'SuperAdmin');
  const donorMatch = useMatch('/admin/donors/:id');
  useEffect(() => {
    // Set the page title based on the current path
    const path = location.pathname;


    if (donorMatch) {
      setPageTitle('Donor Information');
    }
    else {
      switch (path) {
        case '/admin/donors':
          setPageTitle('Donor Record');
          break;
        case '/admin/dashboard':
        default:
          setPageTitle('Dashboard');
          break;
      }
    }


    // Save the current page title to localStorage
    localStorage.setItem('pageTitle', pageTitle);
  }, [location, pageTitle]);
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px' })
  return (
    <div className={`flex  ${isAdministrativePersonnelUser && isAdministrativePersonnelRoute && isDesktopOrLaptop ? 'flex-row' : 'flex-col'}`}>
      {isAdministrativePersonnelUser && isAdministrativePersonnelRoute && <AdminSideNav />}
      <ScrollToTop />
      {isAdministrativePersonnelUser && isAdministrativePersonnelRoute ? (
        <div className="w-full flex flex-col gap-2">
          <ComplexNavbar pageTitle={pageTitle} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donor-application" element={<DonorApplication />} />
            <Route path="/articles" element={<ProtectedRoute><Article /></ProtectedRoute>} />
            <Route path="/article/:id" element={<ProtectedRoute><SingleArticle /></ProtectedRoute>} />

            {/* Superadmin routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute isAuthorized={true}><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/donors" element={<ProtectedRoute isAdmin={true}><DonorsPage /></ProtectedRoute>} />
            <Route path="/admin/donors/:id" element={<ProtectedRoute isAdmin={true}><SingleDonor /></ProtectedRoute>} />
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

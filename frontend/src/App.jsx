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
import RecipientPage from "./Pages/Admin/Recipients/RecipientPage";
import SingleRecipient from "./Components/Admin/Recipients/SingleRecipient";
import Schedule from "./Pages/Admin/Calendar/Schedule";
import EditEvent from "./Components/Admin/Calendar/EditEvent";
import CreateAdmin from "./Pages/Admin/Account/CreateAdmin";
import Accounts from "./Pages/Admin/Account/Accounts";
import EmployeeLogin from "./Pages/EmployeeLogin";
import Resources from "./Pages/Admin/Resources/Resources";
import Announcement from "./Pages/Admin/Announcement/Announcement";
import CreateResources from "./Pages/Admin/Resources/CreateResources";
import EditArticle from "./Pages/Admin/Resources/EditArticle";
import Homepage from "./Pages/Admin/Inventory/Homepage";
import Refrigerator from "./Pages/Admin/Inventory/Refrigerator";
import Profile from "./Pages/Admin/Profile/Profile";
import PickUpSchedule from "./Pages/Admin/Calendar/PickUpSchedule";
import PickUpDetails from "./Components/Admin/Calendar/Schedule/PickUpDetails";
import Attendance from "./Components/Admin/Calendar/Letting/Attendance";
function MainContent() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const isAdministrativePersonnelRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff');
  const isAdministrativePersonnelUser = getUser() && (getUser().role === 'Admin' || getUser().role === 'Staff' || getUser().role === 'SuperAdmin');
  const donorMatch = useMatch('/admin/donors/:id');
  const recipientMatch = useMatch('/admin/recipient/:id');
  const eventMatch = useMatch('/admin/events/:id');
  useEffect(() => {
    // Set the page title based on the current path
    const path = location.pathname;



    if (donorMatch) {
      setPageTitle('Donor Information');
    }
    else if (recipientMatch) {
      setPageTitle('Recipient Information');
    }
    else if (eventMatch) {
      setPageTitle('Edit Event');
    }
    else {
      switch (path) {
        case '/admin/donors':
          setPageTitle('Donor Record');
          break;
        case '/admin/recipients':
          setPageTitle('Recipient Record');
          break;
        case '/admin/event/schedules':
          setPageTitle('Schedules');
          break;
        case '/admin/account':
          setPageTitle('Accounts');
          break;
        case '/admin/account/create-admin':
          setPageTitle('Create Admin');
          break;
        case '/admin/resources':
          setPageTitle('Resources');
          break;
        case '/admin/resources/create':
          setPageTitle('Create Resources');
          break;
        case '/admin/inventory':
          setPageTitle('Inventory');
          break;
        case '/admin/profile':
          setPageTitle('Profile');
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
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route path="/donor-application" element={<DonorApplication />} />
            <Route path="/articles" element={<ProtectedRoute><Article /></ProtectedRoute>} />
            <Route path="/article/:id" element={<ProtectedRoute><SingleArticle /></ProtectedRoute>} />

            {/* Superadmin routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute isAuthorized={true} isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/donors" element={<ProtectedRoute isAdmin={true}><DonorsPage /></ProtectedRoute>} />
            <Route path="/admin/donors/:id" element={<ProtectedRoute isAdmin={true}><SingleDonor /></ProtectedRoute>} />
            <Route path="/admin/recipients" element={<ProtectedRoute isAdmin={true}><RecipientPage /></ProtectedRoute>} />
            <Route path="/admin/recipient/:id" element={<ProtectedRoute isAdmin={true}><SingleRecipient /></ProtectedRoute>} />
            <Route path="/admin/event/schedules" element={<ProtectedRoute isAdmin={true}><Schedule /></ProtectedRoute>} />
            <Route path="/admin/pickup/schedules" element={<ProtectedRoute isAdmin={true}><PickUpSchedule /></ProtectedRoute>} />
            <Route path="/admin/events/:id" element={<ProtectedRoute isAdmin={true}><EditEvent /></ProtectedRoute>} />
            <Route path="/admin/schedules/:id" element={<ProtectedRoute isAdmin={true}><PickUpDetails /></ProtectedRoute>} />
            <Route path="/admin/account" element={<ProtectedRoute isAuthorized={true} isAdmin={true}><Accounts /></ProtectedRoute>} />
            <Route path="/admin/account/create-admin" element={<ProtectedRoute isAdmin={true}><CreateAdmin /></ProtectedRoute>} />
            <Route path="/admin/resources" element={<ProtectedRoute isAdmin={true}><Resources /></ProtectedRoute>} />
            <Route path="/admin/announcement" element={<ProtectedRoute isAdmin={true}><Announcement /></ProtectedRoute>} />
            <Route path="/admin/resources/create" element={<ProtectedRoute isAdmin={true}><CreateResources /></ProtectedRoute>} />
            <Route path="/admin/edit-article/:id" element={<ProtectedRoute isAdmin={true}><EditArticle /></ProtectedRoute>} />
            <Route path="/admin/inventory/refrigerator" element={<ProtectedRoute isAdmin={true}><Refrigerator /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute isAdmin={true}><Profile /></ProtectedRoute>} />
            <Route path="/admin/events/attendance/:id" element={<ProtectedRoute isAdmin={true}><Attendance/></ProtectedRoute>}/>
          </Routes>
        </div>) :
        (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route path="/donor-application" element={<DonorApplication />} />
            <Route path="/articles" element={<ProtectedRoute><Article /></ProtectedRoute>} />
            <Route path="/article/:id" element={<ProtectedRoute><SingleArticle /></ProtectedRoute>} />

            {/* Superadmin routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute isAuthorized={true} isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/donors" element={<ProtectedRoute isAdmin={true}><DonorsPage /></ProtectedRoute>} />
            <Route path="/admin/donors/:id" element={<ProtectedRoute isAdmin={true}><SingleDonor /></ProtectedRoute>} />
            <Route path="/admin/recipients" element={<ProtectedRoute isAdmin={true}><RecipientPage /></ProtectedRoute>} />
            <Route path="/admin/recipient/:id" element={<ProtectedRoute isAdmin={true}><SingleRecipient /></ProtectedRoute>} />
            <Route path="/admin/event/schedules" element={<ProtectedRoute isAdmin={true}><Schedule /></ProtectedRoute>} />
            <Route path="/admin/pickup/schedules" element={<ProtectedRoute isAdmin={true}><PickUpSchedule /></ProtectedRoute>} />
            <Route path="/admin/events/:id" element={<ProtectedRoute isAdmin={true}><EditEvent /></ProtectedRoute>} />
            <Route path="/admin/schedules/:id" element={<ProtectedRoute isAdmin={true}><PickUpDetails /></ProtectedRoute>} />
            <Route path="/admin/account" element={<ProtectedRoute isAuthorized={true} isAdmin={true}><Accounts /></ProtectedRoute>} />
            <Route path="/admin/account/create-admin" element={<ProtectedRoute isAdmin={true}><CreateAdmin /></ProtectedRoute>} />
            <Route path="/admin/resources" element={<ProtectedRoute isAdmin={true}><Resources /></ProtectedRoute>} />
            <Route path="/admin/announcement" element={<ProtectedRoute isAdmin={true}><Announcement /></ProtectedRoute>} />
            <Route path="/admin/resources/create" element={<ProtectedRoute isAdmin={true}><CreateResources /></ProtectedRoute>} />
            <Route path="/admin/edit-article/:id" element={<ProtectedRoute isAdmin={true}><EditArticle /></ProtectedRoute>} />
            <Route path="/admin/inventory/refrigerator" element={<ProtectedRoute isAdmin={true}><Refrigerator /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute isAdmin={true}><Profile /></ProtectedRoute>} />
            <Route path="/admin/events/attendance/:id" element={<ProtectedRoute isAdmin={true}><Attendance/></ProtectedRoute>}/>
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

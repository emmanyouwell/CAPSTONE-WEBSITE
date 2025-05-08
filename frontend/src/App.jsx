import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useMatch, useNavigate } from 'react-router-dom';
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
import NewDonorForm from "./Components/Admin/Calendar/Letting/NewDonorForm";
import Redirect from "./Redirect";
import DonationDetails from "./Components/Admin/Calendar/Letting/DonationDetails";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import History from "./Components/Admin/Calendar/Letting/History";
import UnpasteurizedMilk from "./Pages/Admin/Inventory/UnpasteurizedMilk";
import CollectionsTable from "./Pages/Admin/Inventory/collections/CollectionsTable";
import RedirectDetails from "./Pages/Admin/Inventory/collections/RedirectDetails";
import SidebarComponent from "./Components/Admin/SidebarComponent";
import PasteurizedMilk from "./Pages/Admin/Inventory/PasteurizedMilk";
import StaffDashboard from "./Pages/Staff/StaffDashboard";
import RequestView from "./Pages/Admin/Inventory/requests/RequestView";
import CreateRequest from "./Pages/Staff/Requests/CreateRequest";
import DashboardLayout from "./Pages/DashboardLayout";
import { useSelector } from "react-redux";
import RequestDataTable from "./Components/DataTables/RequestDataTable";
import RequestCardComponent from "./Pages/Admin/Inventory/requests/RequestCardComponent";
import SingleRequest from "./Pages/Admin/Inventory/requests/SingleRequest";
import StaffRequest from "./Pages/Staff/Requests/StaffRequest";
import StaffRequestView from "./Pages/Staff/Requests/StaffRequestView";



function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/employee/login" element={<EmployeeLogin />} />
      <Route path="/donor-application" element={<DonorApplication />} />
      <Route path="/new-donor-form" element={<NewDonorForm />} />
      <Route path="/articles" element={<ProtectedRoute><Article /></ProtectedRoute>} />
      <Route path="/article/:id" element={<ProtectedRoute><SingleArticle /></ProtectedRoute>} />
      <Route path="/redirect" element={<Redirect />} />

      {/* Superadmin routes */}

      <Route path="/dashboard" element={<ProtectedRoute isAuthorized={true}><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
        <Route path="donors" element={<ProtectedRoute isAdmin={true}><DonorsPage /></ProtectedRoute>} />
        <Route path="donors/:id" element={<ProtectedRoute isAdmin={true}><SingleDonor /></ProtectedRoute>} />
        <Route path="recipients" element={<ProtectedRoute isAuthorized={true}><RecipientPage /></ProtectedRoute>} />
        <Route path="recipient/:id" element={<ProtectedRoute isAuthorized={true}><SingleRecipient /></ProtectedRoute>} />
        <Route path="event/schedules" element={<ProtectedRoute isAdmin={true}><Schedule /></ProtectedRoute>} />
        <Route path="pickup/schedules" element={<ProtectedRoute isAdmin={true}><PickUpSchedule /></ProtectedRoute>} />
        <Route path="events/:id" element={<ProtectedRoute isAdmin={true}><EditEvent /></ProtectedRoute>} />
        <Route path="schedules/:id" element={<ProtectedRoute isAdmin={true}><PickUpDetails /></ProtectedRoute>} />
        <Route path="account" element={<ProtectedRoute isAuthorized={true} isAdmin={true}><Accounts /></ProtectedRoute>} />
        <Route path="account/create-admin" element={<ProtectedRoute isAdmin={true}><CreateAdmin /></ProtectedRoute>} />
        <Route path="resources" element={<ProtectedRoute isAdmin={true}><Resources /></ProtectedRoute>} />
        <Route path="announcement" element={<ProtectedRoute isAdmin={true}><Announcement /></ProtectedRoute>} />
        <Route path="resources/create" element={<ProtectedRoute isAdmin={true}><CreateResources /></ProtectedRoute>} />
        <Route path="edit-article/:id" element={<ProtectedRoute isAdmin={true}><EditArticle /></ProtectedRoute>} />
        <Route path="inventory/refrigerator" element={<ProtectedRoute isAdmin={true}><Refrigerator /></ProtectedRoute>} />
        <Route path="inventory/fridge/unpasteurized/:id" element={<ProtectedRoute isAdmin={true}><UnpasteurizedMilk /></ProtectedRoute>} />
        <Route path="inventory/fridge/pasteurized/:id" element={<ProtectedRoute isAdmin={true}><PasteurizedMilk /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute isAdmin={true}><Profile /></ProtectedRoute>} />
        <Route path="events/attendance/:id" element={<ProtectedRoute isAdmin={true}><Attendance /></ProtectedRoute>} />
        <Route path="event/history" element={<ProtectedRoute isAdmin={true}><History /></ProtectedRoute>} />
        <Route path="events/attendance/donations/:id" element={<ProtectedRoute isAdmin={true}><DonationDetails /></ProtectedRoute>} />
        <Route path="collections" element={<ProtectedRoute isAdmin={true}><CollectionsTable /></ProtectedRoute>} />
        <Route path="collections/details/:id" element={<ProtectedRoute isAdmin={true}><RedirectDetails /></ProtectedRoute>} />
        <Route path="requests" element={<ProtectedRoute isAuthorized={true}><RequestView /></ProtectedRoute>} />
        <Route path="staff" element={<ProtectedRoute isStaff={true}><StaffDashboard /></ProtectedRoute>} />
        <Route path="create-requests" element={<ProtectedRoute isAuthorized={true}><CreateRequest /></ProtectedRoute>} />
        <Route path="table" element={<ProtectedRoute isAuthorized={true}><RequestDataTable /></ProtectedRoute>} />
        <Route path="request/:id" element={<ProtectedRoute isAuthorized={true}><SingleRequest/></ProtectedRoute>}/>
        <Route path="staff/requests" element={<ProtectedRoute isStaff={true}><StaffRequestView/></ProtectedRoute>}/>
      </Route>
    </Routes>
  )

}
function MainContent() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const isAdministrativePersonnelRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff');
  const isAdministrativePersonnelUser = getUser() && (getUser().role === 'Admin' || getUser().role === 'Staff' || getUser().role === 'SuperAdmin');
  const donorMatch = useMatch('/admin/donors/:id');
  const recipientMatch = useMatch('/admin/recipient/:id');
  const eventMatch = useMatch('/admin/events/:id');
  const [userDetails, setUserDetails] = useState({});
  const { isLoggedIn } = useSelector((state) => state.users)
  useEffect(() => {
    if (getUser()) {
      setUserDetails({
        name: `${getUser().name.first} ${getUser().name.last}`,
        email: getUser().email,
        role: getUser().role,
      })
    }
  }, [location.pathname])

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
          setPageTitle('Event schedules');
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
        case '/admin/inventory/refrigerator':
          setPageTitle('Refrigerator Inventory');
          break;
        case '/admin/pickup/schedules':
          setPageTitle('Pick-up Schedules');
          break;
        case '/admin/collections':
          setPageTitle('Milk Collections');
          break;
        case '/admin/requests':
          setPageTitle('Requests');
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
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <div>
      {/* {isAdministrativePersonnelUser && isAdministrativePersonnelRoute && <AdminSideNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>} */}
      {isAdministrativePersonnelRoute && isAdministrativePersonnelUser ?
        <div className="flex">
          <SidebarComponent userDetails={userDetails} />
          <ScrollToTop />
          <div className="w-full flex flex-col gap-2">
            <ComplexNavbar pageTitle={pageTitle} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            <RoutesComponent />
          </div>
        </div> : <RoutesComponent />}


      <ToastContainer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MainContent />

      {/* <FooterWithLogo /> */}
    </BrowserRouter>
  );
}

export default App;

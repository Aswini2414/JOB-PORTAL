import './App.css'
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import UpdateProfile from './pages/UpdateProfile';
import CreateJob from './Components/CreateJob';
import ViewJobs from './Components/ViewJobs';
import UpdateJob from './Components/UpdateJob';
import AvailableJobs from './Components/AvailableJobs';
import AppliedJobs from './Components/AppliedJobs';
import ViewRecievedJobApplications from './Components/ViewRecievedJobApplications';
import TrackJobs from './Components/TrackJobs';
import Navbar from './Components/Navbar';


function App() {
  const location = useLocation();

  // Conditionally render the Navbar based on the route
  const hideNavbarRoutes = ['/user/login', '/user/register'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  
  return(
    <>
      {!shouldHideNavbar&&<Navbar/>}
        <Routes>
          <Route path="/user/login" element={<Login/>} />
          <Route path="/user/register" element={<Signup/>}/>
          <Route path="/user/home" element={<Home/>}/>
          <Route path="/user/update-profile" element={<UpdateProfile/>}/>
          <Route path="/user/employer/create-job" element={<CreateJob/>}/>
          <Route path="/user/employer/view-jobs" element={<ViewJobs/>}/>
          <Route path="/user/employer/update-job/:id" element={<UpdateJob/>}/>
          <Route path="/user/employee/view-jobs" element={<AvailableJobs/>}/>
          <Route path="/user/employee/applied-jobs" element={<AppliedJobs/>}/>
          <Route path="/user/employer/view-applications" element={<ViewRecievedJobApplications/>}/>
          <Route path="/user/employee/track-jobs" element={<TrackJobs/>}/>

      </Routes>
      <Toaster/>
      
    </>
  )
}

export default App;

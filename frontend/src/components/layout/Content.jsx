import {styled} from "@mui/material"
import {Routes, Route} from "react-router-dom"
import Login from "../pages/Login"
import Locations from "../pages/Locations"
import ActiveVisitors from "../pages/ActiveVisitors"
import AddBuilding from "../pages/AddBuilding"
import AddLocation from "../pages/AddLocation"
import AddOffice from "../pages/AddOffice"
import AddReason from "../pages/AddReason"
import AddVisitor from "../pages/AddVisitor"
import AddUser from "../pages/AddUser"
import Buildings from "../pages/Buildings"
import Offices from "../pages/Offices"
import Reasons from "../pages/Reasons"
import Reports from "../pages/Reports"
import Users from "../pages/Users"
import CheckIn from "../pages/CheckIn"
import MarkLocation from "../pages/MarkLocation"
import Visitors from "../pages/Visitors"
import NotFound from "../pages/NotFound"
import Home from "../pages/Home"
import Generator from "../pages/Generator.jsx"
import Admin from "../common/Admin.jsx"
import Auth from "../common/Auth.jsx"
import Forward from "../common/Forward.jsx";
import Tickets from "../pages/Tickets.jsx"
import AddDevices from "../pages/AddDevices.jsx"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = styled('div')(({theme}) => ({
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "100vh",
    maxWidth: "100%",
    backgroundColor: "white",
}))

const Content = () => {
    return (
        <div className="content-container">

            <ToastContainer/>
            <AppContent>

                <Routes>
                    <Route path="/home" element={<Auth redirectTo="/login" destination="/home"> <Home/></Auth>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/add-visitor"
                           element={<Auth redirectTo="/login" destination="/add-visitor"><AddVisitor/></Auth>}/>
                    <Route path="/add-building"
                           element={<Admin redirectTo="/login" destination="/add-building"><AddBuilding/></Admin>}/>
                    <Route path="/edit-building/:id"
                           element={<Admin redirectTo="/login" destination="/edit-building/:id">
                               <AddBuilding/></Admin>}/>
                    <Route path="/add-office"
                           element={<Admin redirectTo="/login" destination="/add-office"> <AddOffice/></Admin>}/>
                    <Route path="/edit-office/:id"
                           element={<Admin redirectTo="/login" destination="/edit-office:id"> <AddOffice/></Admin>}/>
                    <Route path="/add-reason"
                           element={<Admin redirectTo="/login" destination="/add-reason"> <AddReason/></Admin>}/>
                    <Route path="/edit-reason/:id"
                           element={<Admin redirectTo="/login" destination="/edit-reason/:id"> <AddReason/></Admin>}/>
                    <Route path="/add-location"
                           element={<Admin redirectTo="/login" destination="/add-location"> <AddLocation/></Admin>}/>
                    <Route path="/edit-location/:id"
                           element={<Admin redirectTo="/login" destination="/edit-location/:id">
                               <AddLocation/></Admin>}/>
                    <Route path="/add-user"
                           element={<Admin redirectTo="/login" destination="/add-user"> <AddUser/></Admin>}/>
                    <Route path="/edit-user/:id"
                           element={<Admin redirectTo="/login" destination="edit-user/:id"> <AddUser/></Admin>}/>
                    <Route path="/users" element={<Admin redirectTo="/login" destination="/users"> <Users/></Admin>}/>
                    <Route path="/offices"
                           element={<Admin redirectTo="/login" destination="/offices"> <Offices/></Admin>}/>
                    <Route path="/buildings"
                           element={<Admin redirectTo="/login" destination="/buildings"> <Buildings/></Admin>}/>
                    <Route path="/reasons"
                           element={<Admin redirectTo="login" destination="/reasons"> <Reasons/></Admin>}/>
                    <Route path="/visitors" element={<Visitors/>}/>
                    <Route path="/check" element={<Auth redirectTo="/login" destination="/check"><CheckIn/></Auth>}/>
                    <Route path="/active-visitors" element={<Auth redirectTo="/login" destination="/active-visitors">
                        <ActiveVisitors/></Auth>}/>
                    <Route path="/set-location" element={<Forward redirectTo="/home" destination="/set-location">
                        <MarkLocation/></Forward>}/>
                    <Route path="/locations" element={<Locations/>}/>
                    <Route path="/reports"
                           element={<Admin redirectTo="/login" destination="/reports"> <Reports/></Admin>}/>
                    <Route path="/generator/"
                           element={<Generator/>}/>
                    <Route path="/passes"
                           element={<Admin redirectTo="/login" destination="/passes"> <Tickets/></Admin>}/>
                    <Route path="/add-devices" element={<AddDevices/>}/>
                    <Route path="/*" element={<NotFound/>}/>

                </Routes>

            </AppContent>
        </div>
    )
}

export default Content;
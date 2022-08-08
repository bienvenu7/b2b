import { Route, Routes } from "react-router-dom"
import Header from "../Header/Header"
import Authentications from "./Authentications/Authentications"
import Dashboard from "./Dashboard/Dashboard"
import './PersonalAreaLayout.scss'

const PersonalAreaLayout = ({ children }) => {
    return (
        <>
            <div className="personal_area-container">
                <Header />
                <div className="content-wrapper">
                    <input type="checkbox" id="dashboard-open" className="hidden-menu-ticker" />
                    <Dashboard />
                    {children}
                </div>
            </div>
        </>
    )
}

export default PersonalAreaLayout
import Header from "../Header/Header"
import Dashboard from "./Dashboard/Dashboard"
import './PersonalAreaLayout.scss'

const PersonalAreaLayout = ({ children }) => {
    return (
        <>
            <Header/>
            <div className="content-wrapper">
                <Dashboard />
                {children}
            </div>
        </>
    )
}

export default PersonalAreaLayout
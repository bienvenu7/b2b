import Header from "../Header/Header"
import Dashboard from "./Dashboard/Dashboard"
import './PersonalAreaLayout.scss'

const PersonalAreaLayout = ({ children }) => {
    return (
        <>
        <div className="container-center">
            <Header/>
            <div className="content-wrapper">
                <Dashboard />
                {children}
            </div>
            </div>
        </>
    )
}

export default PersonalAreaLayout
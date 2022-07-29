import Header from "../Header/Header"
import Dashboard from "./Dashboard/Dashboard"
import './PersonalAreaLayout.scss'

const PersonalAreaLayout = ({ children }) => {
    return (
        <>
        <div className="container-center" style={{width: '1170px', margin: '0 auto'}}>
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
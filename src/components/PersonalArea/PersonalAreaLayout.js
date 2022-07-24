import Header from "../Header/Header"
import Dashboard from "./Dashboard/Dashboard"

const PersonalAreaLayout = ({children}) =>{
    return(
        <>
        <Header/>
        <Dashboard/>
        {children}
        <div>footer</div>
        </>
    )
}

export default PersonalAreaLayout
import './DashboardPage.scss'
import PersonalAreaLayout from '../../components/PersonalArea/PersonalAreaLayout'
import InfoBlock from '../../components/DashbordComponents/InfoBlock/InfoBlock'
import CheckBlock from '../../components/DashbordComponents/CheckBlock/CheckBlock'
import AuthenticBlock from '../../components/DashbordComponents/AuthenticBlock/AuthenticBlock'

const DashboardPage = () => {
  return (
    <div className='top'>
      <PersonalAreaLayout>
        <div className='content'>
          <InfoBlock/>
          <div className='second-block'>
            <CheckBlock/>
            <CheckBlock/>
          </div>
          <AuthenticBlock/>
        </div>
        

      </PersonalAreaLayout>
    </div>
    
  )
}

export default DashboardPage
import './DashboardPage.scss'
import PersonalAreaLayout from '../../components/PersonalArea/PersonalAreaLayout'
import BlockComponentLayout from '../../components/BlockComponentLayout/BlockComponentLayout'

const DashboardPage = () => {
  return (
    <div className='top'>
      <PersonalAreaLayout>
        <BlockComponentLayout/>
      </PersonalAreaLayout>
    </div>
    
  )
}

export default DashboardPage
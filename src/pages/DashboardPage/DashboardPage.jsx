import './DashboardPage.scss'
import PersonalAreaLayout from '../../components/PersonalArea/PersonalAreaLayout'
import BlockComponentLayout from '../../components/BlockComponentLayout/BlockComponentLayout'

const DashboardPage = () => {
  return (
    <div className='top'>
      <PersonalAreaLayout>
        <div className='content'>
        <BlockComponentLayout> 
          Первый блок
        </BlockComponentLayout>
        <div className='second-block'>
          <BlockComponentLayout> 
            второй блок
          </BlockComponentLayout>
          <BlockComponentLayout> 
            третий блок
          </BlockComponentLayout>
        </div>
        </div>
        

      </PersonalAreaLayout>
    </div>
    
  )
}

export default DashboardPage
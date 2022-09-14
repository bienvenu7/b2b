import React from 'react'
import './DashboardPage.scss'
import PersonalAreaLayout from '../../components/PersonalArea/PersonalAreaLayout'
import InfoBlock from '../../components/DashbordComponents/InfoBlock/InfoBlock'
import CheckBlock from '../../components/DashbordComponents/CheckBlock/CheckBlock'
import AuthenticInfoBlock from '../../components/DashbordComponents/AuthenticInfoBlock/AuthenticInfoBlock'
import AuthenticTableBlock from '../../components/DashbordComponents/AuthenticTableBlock/AuthenticTableBlock'
import camera from '../../common/icons/dashboard/camera.png'
import checkmark from '../../common/icons/dashboard/checkmark.png'
import CheckBlockMobile from '../../components/DashbordComponents/CheckBlockMobile/CheckBlockMobile'
import AuthenticMobile from '../../components/DashbordComponents/AuthenticInMobile/AuthenticMobile'

const DashboardPage = () => {
  const contentChekedBlock = [
    {
      textTop: "Completed authentications",
      numberTop: "911",
      textBottom: "in the past day",
      numberBottom: "+30",
      image: checkmark,
    },
    {
      textTop: "Orders that require additional photos",
      numberTop: "200",
      textBottom: "in the past day",
      numberBottom: "+30",
      image: camera,
    },
  ]

  return (
    <div className='top'>
      <PersonalAreaLayout>
        <div className='dashboard-page__content-desctop'>
          <InfoBlock/>
          <div className='dashboard-page__second-block'>
            {
              contentChekedBlock.map((block) => {
                return <CheckBlock image={block.image} textTop={block.textTop} numberTop={block.numberTop} textBottom={block.textBottom} numberBottom={block.numberBottom} />
              })
            }            
          </div>
          <AuthenticInfoBlock/>
          <AuthenticTableBlock/>
        </div>

        <div className='dashboard-page__content-mobile'>
          <CheckBlockMobile image={checkmark}/>
          <AuthenticMobile/>
        </div>
      </PersonalAreaLayout>
    </div>
    
  )
}

export default DashboardPage
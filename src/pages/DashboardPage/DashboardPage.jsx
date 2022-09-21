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
import { completedAuthentification } from '../../api/authRequest/authRequest-api'
import { useEffect, useState } from 'react'

const DashboardPage = () => {

  const [contentChecked, setContentChecked] = useState([
    {
      key: 1,
      textTop: "Completed authentications",
      numberTop: 0,
      textBottom: "in the past day",
      numberBottom: "+30",
      image: checkmark,
    },
    {
      key: 2,
      textTop: "Orders that require additional photos",
      numberTop: 0,
      textBottom: "in the past day",
      numberBottom: "+30",
      image: camera,
    }
  ])

  const [someData, setSomeData] = useState({
    completed: 0,
    updateNeeded: 0,
    authentic: 0
  })

  var first = someData.completed
  var second = someData.updateNeeded

  useEffect(() => {
    completedAuthentification().then((r) => {
      setSomeData(r.data)
    })
  }, []);

  return (
    <div className='top'>
      <PersonalAreaLayout>

        <div className='dashboard-page__content-desctop'>
          <InfoBlock />
          <div className='dashboard-page__second-block'>
            { 
              contentChecked.map((key, i) =>
                <CheckBlock image={key.image} textTop={key.textTop} numberTop={i === 1 ? second : first} textBottom={key.textBottom} numberBottom={key.numberBottom} key={i} />
              )
            }
          </div>
          <AuthenticInfoBlock />
          <AuthenticTableBlock />
        </div>

        <div className='dashboard-page__content-mobile'>
          <CheckBlockMobile image={checkmark} />
          <AuthenticMobile />
          <AuthenticTableBlock />
        </div>
      </PersonalAreaLayout>
    </div>

  )
}

export default DashboardPage
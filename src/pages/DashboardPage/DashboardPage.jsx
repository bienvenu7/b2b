import React, { useEffect, useState } from 'react';
import './DashboardPage.scss';
import { PersonalAreaLayout } from '../../components/PersonalArea/PersonalAreaLayout';
import { InfoBlock } from '../../components/DashbordComponents/InfoBlock/InfoBlock';
import { CheckBlock } from '../../components/DashbordComponents/CheckBlock/CheckBlock';
import { AuthenticInfoBlock } from '../../components/DashbordComponents/AuthenticInfoBlock/AuthenticInfoBlock';
import { AuthenticTableBlock } from '../../components/DashbordComponents/AuthenticTableBlock/AuthenticTableBlock';
import camera from '../../common/icons/dashboard/camera.png';
import checkmark from '../../common/icons/dashboard/checkmark.png';
import { CheckBlockMobile } from '../../components/DashbordComponents/CheckBlockMobile/CheckBlockMobile';
import { AuthenticMobile } from '../../components/DashbordComponents/AuthenticInMobile/AuthenticMobile';
import { completedAuthentification } from '../../api/authRequest/authRequest-api';

export const DashboardPage = () => {
  const [contentChecked] = useState([
    {
      key: 1,
      textTop: 'Completed authentications',
      numberTop: 0,
      textBottom: 'in the past day',
      numberBottom: '+30',
      image: checkmark,
    },
    {
      key: 2,
      textTop: 'Orders that require additional photos',
      numberTop: 0,
      textBottom: 'in the past day',
      numberBottom: '+30',
      image: camera,
    },
  ]);

  const [someData, setSomeData] = useState({
    completed: 0,
    updateNeeded: 0,
    authentic: 0,
  });

  const first = someData.completed;
  const second = someData.updateNeeded;
  const third = someData.authentic;
  const percentage = Math.round((third / first) * 100 * 100) / 100 || 0;
  const fake = first - third;

  useEffect(() => {
    completedAuthentification().then((r) => {
      setSomeData(r.data);
    });
  }, []);

  return (
    <div className="top">
      <PersonalAreaLayout>
        <div className="dashboard-page__content-desctop">
          <InfoBlock />
          <div className="dashboard-page__second-block">
            {contentChecked.map((key, index) => (
              <CheckBlock
                image={key.image}
                textTop={key.textTop}
                numberTop={index === 1 ? second : first}
                textBottom={key.textBottom}
                numberBottom={key.numberBottom}
                key={index}
              />
            ))}
          </div>
          <AuthenticInfoBlock authenticScore={percentage} authenticItems={third} fakeItems={fake} />
          <AuthenticTableBlock />
        </div>

        <div className="dashboard-page__content-mobile">
          <CheckBlockMobile image={checkmark} completed={first} additional={second} />
          <AuthenticMobile authenticScore={percentage} />
        </div>
      </PersonalAreaLayout>
    </div>
  );
};

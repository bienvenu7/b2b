import './AuthenticInfoBlock.scss'
import BlockComponentLayout from '../../BlockComponentLayout/BlockComponentLayout'
import { completedAuthentification } from '../../../api/authRequest/authRequest-api'
import { useEffect, useState } from 'react'

const AuthenticInfoBlock = () => {

  const [someData, setSomeData] = useState({
    completed: 0,
    updateNeeded: 0,
    authentic: 0
  })
  //use state
  var first = someData.completed
  var second = someData.updateNeeded
  var third = someData.authentic
  var authenticScore = (Math.round((third / first * 100) * 100) / 100) || 0
  var fakeItems = first - third

  console.log(authenticScore, 'check out one')

  useEffect(() => {
    completedAuthentification().then((r) => {
      setSomeData(r.data)
    })
  }, []);

  return (
    <BlockComponentLayout>
      <div className='authentic-info-block__container'>
        <div className='authentic-info-block__content-block'>
          <h3 className='authentic-info-block__title_big'>Authentic score = {authenticScore}%</h3>
          <p className='authentic-info-block__text_big'>Most of your items are authentic yet there is still room for impovement!</p>
          <button className='authentic-info-block__button_dark'>Learn how to improve the score</button>
        </div>
        <div className='authentic-info-block__content-block'>
          <div className='authentic-info-block__cards-block'>
            <div className='authentic-info-block__cards-block__item'>
              <h3 className='authentic-info-block__title_little'>Authentic items spotted: {third}</h3>
              <p className='authentic-info-block__text_little'>Your most common authentic items are Gucci bags and Saint Laurent shoes!</p>
            </div>
            <div className='authentic-info-block__cards-block__item'>
              <h3 className='authentic-info-block__title_little'>Fake items spotted:{fakeItems}</h3>
              <p className='authentic-info-block__text_little'>Your most common fake items are Prada bags and Dior t-shirts!</p>
            </div>
          </div>
          <button className='authentic-info-block__button_light'>See all verified items</button>
        </div>
      </div>
    </BlockComponentLayout>
  )
}

export default AuthenticInfoBlock
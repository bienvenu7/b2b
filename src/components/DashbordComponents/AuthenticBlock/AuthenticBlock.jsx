import './AuthenticBlock.scss'
import BlockComponentLayout from '../../BlockComponentLayout/BlockComponentLayout'

const AuthenticBlock = () => {
  return (
    <BlockComponentLayout>
      <div className='authentic-block__container'>
        <div className='authentic-block__content-block'>
          <h3 className='authentic-block__title_big'>Authentic score = 75%</h3>
          <p className='authentic-block__text_big'>Most of your items are authentic yet there is still room for impovement!</p>
          <button className='authentic-block__button_dark'>Learn how to improve the score</button>
        </div>
        <div className='authentic-block__content-block'>
          <div className='authentic-block__cards-block'>
            <div className='authentic-block__cards-block__item'>
              <h3 className='authentic-block__title_little'>Authentic items spotted: 75</h3>
              <p className='authentic-block__text_little'>Your most common authentic items are Gucci bags and Saint Laurent shoes!</p>
            </div>
            <div className='authentic-block__cards-block__item'>
              <h3 className='authentic-block__title_little'>Fake items spotted: 25</h3>
              <p className='authentic-block__text_little'>Your most common fake items are Prada bags and Dior t-shirts!</p>
            </div>
          </div>
          <button className='authentic-block__button_light'>See all verified items</button>
        </div>
      </div>
    </BlockComponentLayout>
  )
}

export default AuthenticBlock
import './AuthenticMobile.scss'
import BlockComponentLayout from '../../BlockComponentLayout/BlockComponentLayout'

const AuthenticMobile = ({ authenticScore }) => {
  return (
    <BlockComponentLayout>
      <div className='authentic-mobile__content-block'>
        <h3 className='authentic-mobile__title_big'>Authentic score = {authenticScore}</h3>
        <p className='authentic-mobile__text_big'>Most of your items are authentic yet there is still room for impovement!</p>
        <button className='authentic-mobile__button_dark'>Learn how to improve the score</button>
        <button className='authentic-mobile__button_light'>See all verified items</button>
      </div>
    </BlockComponentLayout>
  )
}

export default AuthenticMobile
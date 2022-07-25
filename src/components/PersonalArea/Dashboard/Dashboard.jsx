import SvgSelector from '../../../common/icons/SvgSelector'
import './Dashboard.scss'
import storeLogo from '../../../common/images/logo-of-store.png'
import dashboardIcon from '../../../common/images/dashboard-icon.png'
import { useNavigate } from 'react-router-dom'

const Dashboard = (props) =>{


    const navigate = useNavigate()


    //temp

    const balance = [
        {label: 'bags', count: 100},
        {label: 'bags', count: 10000},
        {label: 'bags', count: 10},
        {label: 'bags', count: 1},
    ]


    return(
        <>
        <div className='dashboard-container'>
            <div className='dashboard-wrapper'>
                <div className='dashboard__elem'>
                    <div className='dashboard__elem__top-wrapper'>
                        <div className='dashboard__elem__top-img'><img alt='' src={storeLogo}/></div>
                        <div className='dashboard__elem__top-label'>Luxury store <SvgSelector id='arrow'/></div>
                    </div>
                    <div className='dashboard__elem__child-wrapper'>
                        <div className='dashboard__elem__child-img'><img src={dashboardIcon} alt="" /></div>
                        <div className='dashboard__elem__child__label'>Dashboard</div>
                    </div>
                </div>
                <div className='dashboard__elem__auth_balance-wrapper'>
                    <div className='dashboard__elem__auth_balance-label'>Authentication balance <SvgSelector id='arrow'/></div>
                    <div className='dashboard__elem__auth_balance__balance-wrapper'>
                        {balance.map((el, index)=>
                        <div key={index} className='dashboard__elem__auth_balance__balance__elem'>
                            <div className='dashboard__elem__auth_balance__balance-category'>{el.label}</div>
                            <div className='dashboard__elem__auth_balance__balance-count'>{el.count}</div>
                        </div>)}
                        <div className='dashboard__elem__auth_balance__balance-button'>Top up now</div>
                        <div className='dashboard__elem__auth_balance__balance-button'>New authentication</div>
                    </div>
                </div>
                <div className='dashboard__elem__authentications-wrapper'>
                    <div className='dashboard__elem__authentications-label'>Authentications</div>
                    <div className='dashboard__elem__authentications-control__elements'>
                        <div className='dashboard__elem__authentications-control__elem-wrapper' onClick={()=>navigate('../authentications')}>
                            <SvgSelector id='check-icon'/>All authentication
                        </div>
                        <div className='dashboard__elem__authentications-control__elem-wrapper' onClick={()=>navigate('../photo-requests')}>
                            <SvgSelector id='camera-icon'/>Photo requests
                        </div>
                    </div>
                </div>
                <div className='dashboard__elem__tools-wrapper'>
                    <div className='dashboard__elem__tools-label'>Tools</div>
                    <div className='dashboard__elem__tools-control__elements'>
                        <div className='dashboard__elem__tools-control__elem-wrapper'>
                            <SvgSelector id='card-icon'/>Billing 
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Dashboard
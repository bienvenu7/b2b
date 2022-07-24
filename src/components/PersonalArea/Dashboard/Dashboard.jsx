import SvgSelector from '../../../common/icons/SvgSelector'
import './Dashboard.scss'

const Dashboard = (props) =>{


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
                        <div className='dashboard__elem__top-img'></div>
                        <div className='dashboard__elem__top-label'>Luxury store <SvgSelector id='arrow'/></div>
                    </div>
                    <div className='dashboard__elem__child-wrapper'>
                        <div className='dashboard__elem__child__elem'>
                            Dashboard
                        </div>
                    </div>
                </div>
                <div className='dashboard__elem__auth_balance-wrapper'>
                    <div className='dashboard__elem__auth_balance-label'>Authentication balance</div>
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
            </div>
        </div>
        </>
    )
}

export default Dashboard
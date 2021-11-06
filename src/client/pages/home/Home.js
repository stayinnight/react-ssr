import React from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../../../share/mock'
import { useSelector, useDispatch } from 'react-redux'
import PageWrap from '../../container/HOC/PageWrap'
import { addCount, initHome } from '../../../share/store/actions'
import './home.scss'

const Home = () => {
    
    const dispatch = useDispatch()
    const getCount = (store) => store.count
    const count = useSelector(getCount)

    const increase = ()=>{  
        dispatch(addCount())
    }

    return <div className='home'>
        <h1>我的</h1>
        <h2>{count}</h2>
        <button onClick={increase}>+</button>
        <br/>
        <img src="assets/images/303984.jpg"></img>
        <Link to='/list'>列表页</Link>
    </div>
}

Home.getInitProps = async (dispatch) => {
    const res = (await fetchData('home')).data
    dispatch(initHome(100))
    return res
}

export default PageWrap(Home)
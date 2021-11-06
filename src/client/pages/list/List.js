import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../../../share/mock/index'
import PageWrap from '../../container/HOC/PageWrap'
import './list.scss'

const List = (props) => {

    const { initData } = props
    
    return <div className='list'>
        <h1>列表</h1>
        <Link to='/home'>主页</Link>
        <ul>
            {
                initData.data ? initData.data.map((item, index) => {
                    return <li key={index}>{item.title}</li>
                }) : <li>！！！暂无数据！！！</li>
            }
        </ul>
    </div>
}

List.getInitProps = async () => {
    const res = (await fetchData('list')).data
    return res
}

export default PageWrap(List)
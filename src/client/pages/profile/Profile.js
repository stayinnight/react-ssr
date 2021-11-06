import React from 'react'
import { fetchData } from '../../../share/mock'
import PageWrap from '../../container/HOC/PageWrap'

const Profile = () => {
    return <div>Profile</div>
}

Profile.getInitProps = async ()=>{
    const res = (await fetchData("list")).data
    return res
}

export default PageWrap(Profile)
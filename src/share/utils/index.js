import { matchPath } from 'react-router-dom'
import routerMap from '../router/config'

export const defaultTdk = {
    title: 'default-title',
    keywords: 'default-keywords',
    description: 'dfault-description'
}

export const targetRoute = (path) => {
    let target = null
    for (let route of routerMap) {
        if (matchPath(path, route)) {
            target = route
        }
    }
    return target
}


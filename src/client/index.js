
import React from 'react'
import ReactDOM from 'react-dom'
import RouterView from '../share/router/index'
import routerMap from '../share/router/config'
import { BrowserRouter as Router } from 'react-router-dom'
import { targetRoute } from '../share/utils'
import { Provider } from 'react-redux'
import { createClientStore } from '../share/store'

const initData = document.getElementById('ssrTextInitData').value || {}
const reqPath = location.pathname
const target = targetRoute(reqPath)

if (target) {
    target.initData = JSON.parse(initData) || {}
}

const store = createClientStore()
const initStore = document.getElementById('ssrTextInitStore').value || {}
store.dispatch({
    type: 'INIT_STORE',
    initData: JSON.parse(initStore)
})

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <RouterView routerMap={routerMap} />
        </Router>
    </Provider>
    , document.getElementById('root')
)
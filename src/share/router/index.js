import {
    Switch,
    Route,
} from 'react-router-dom'
import React from 'react'

const RouterView = ({ routerMap }) => {
    return (
        <div>
            <Switch>
                {
                    routerMap.map((route) => {
                        if (route.initData) {
                            const {
                                initData,
                                path,
                                exect
                            } = route
                            return <Route
                                key={path}
                                path={path}
                                exact={exect}
                                render={(props) => {
                                    return <route.component {...props} initData={initData}></route.component>
                                }}
                            ></Route>
                        }
                        return (
                            <Route key={route.path} {...route}></Route>
                        )
                    })
                }
            </Switch>
        </div>
    )
}
export default RouterView
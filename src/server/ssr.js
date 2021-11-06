// 负责ssr的中间件
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import RouterView from '../share/router/index'
import routerMap from '../share/router/config'
import { targetRoute } from '../share/utils/index.js'
import { Helmet } from 'react-helmet'
import getAssets from './assets'
import { createServerStore } from '../share/store'
import { Provider } from 'react-redux'
import { globalConfig } from '../share/config/global'


export default async (ctx, next) => {

    let html = ''
    let initStore = {}
    let reqResult = null
    const reqPath = ctx.request.url

    if (globalConfig.IS_SSR) {

        global.document = {};
        global.window = {};

        const store = createServerStore()

        const target = targetRoute(reqPath)

        if (target) {
            const reqFn = target.component.getInitProps
            if (reqFn) {
                const dispatch = store.dispatch
                reqResult = await reqFn(dispatch)
                initStore = store.getState() || {}
            }
        }

        const context = {
            initData: reqResult
        }

        html = renderToString(
            <Provider store={store}>
                <StaticRouter location={reqPath} context={context}>
                    <RouterView routerMap={routerMap} />
                </StaticRouter>
            </Provider>
        )
    }

    const helmet = Helmet.renderStatic()
    const assets = getAssets()

    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${assets.css.join('')}
    </head>
    <body>
        <div id="root">${html}</div>
        <textarea id="ssrTextInitData" style="display:none;">
            ${JSON.stringify(reqResult)}
        </textarea>
        <textarea id="ssrTextInitStore" style="display:none;">
            ${JSON.stringify(initStore)}
        </textarea>
        ${assets.js.join('')}
    </body>
    </html>
    `

    next()
}
import Koa from 'koa'
import SSR from './ssr'
import staticKoa from 'koa-static'
import path from 'path'

import { createProxyMiddleware as httpProxy } from 'http-proxy-middleware'
import k2c from 'koa2-connect'


const app = new Koa()

app.use(async (ctx, next) => {
    if (ctx.url.startsWith('/api')) {
        ctx.respond = false
        await k2c(httpProxy({
            target: 'http://localhost:9000/',
            changeOrigin: true,
            secure: false,
        }))(ctx, next);
    }
    await next()
})

app.use(staticKoa(
    path.join(__dirname, '../../dist/public')
))

app.use(SSR)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
// 获取不同环境下的静态资源

module.exports = () => {
    const jsModules = ['main.js']
    const cssModules = ['main.css']
    const assets = {
        js: [],
        css: []
    }
    const map = IS_PROD ?
        require('../../dist/public/manifest/prod-manifest.json') :
        require('../../dist/public/manifest/dev-manifest.json')
    
    assets.js.push(`<script src="library/library.lib.js"></script>`)

    jsModules.forEach((m) => {
        if (map[m]) {
            assets.js.push(
                `<script type="text/javascript" defer src="${map[m]}"></script>`
            )
        }
    })
    cssModules.forEach((m) => {
        if (map[m]) {
            assets.css.push(
                `<link rel="stylesheet" type="text/css" href="${map[m]}" />`
            )
        }
    })

    return assets
}

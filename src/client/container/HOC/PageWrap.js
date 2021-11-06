import React from "react"
import { Helmet } from 'react-helmet'
import { connect } from "react-redux"

const mapProps = (dispatch)=>{
    return {
        dispatch
    }
}

const PageWrap = (SourceComponent) => {
    return connect(
        null,
        mapProps
    )(
        class Wrap extends React.Component {
            constructor(props) {
                super(props)
    
                let tdk = {
                    title: '前端',
                    keywords: '前端',
                    description: '前端'
                }
                let initData = {}
    
                if (__SERVER__) {
                    initData = props.staticContext?.initData
                    tdk = props.staticContext?.initData.tdk
                } else {
                    initData = props.initData
                    tdk = props.initData?.tdk 
                }
                 
                this.state = {
                    tdk,
                    initData: initData ? initData : {}
                }
            }
    
            static getInitProps = SourceComponent.getInitProps
    
            async componentDidMount() {
                const reqFn = SourceComponent.getInitProps
                if (reqFn) {
                    const dispatch = this.props.dispatch
                    const res = await reqFn(dispatch)
                    this.setState({
                        tdk: res.tdk,
                        initData: res
                    })
                }
            }
    
            render() {
                const props = {
                    ...this.props,
                    ...this.state
                }
                const { tdk } = this.state
                return <div>
                    <Helmet>
                        <title>{tdk?.title}</title>
                        <meta name="description" content={tdk?.description} />
                        <meta name="keywords" content={tdk?.keywords} />
                    </Helmet>
                    <SourceComponent {...props} />
                </div>
            }
        }
    )
}

export default PageWrap
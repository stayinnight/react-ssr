import { 
    ADD_COUNT,
    INIT_COUNT,
    INIT_STORE
 } from './actionTypes'

export const initState = {
    count: 0
}

const reducer = (state = initState, action)=>{
    const newState = {...state}
    switch (action.type) {
        case INIT_STORE:
            const newStore = action.initData
            return newStore
        case ADD_COUNT:
            newState.count ++
            return newState
        case INIT_COUNT:
            newState.count = action.count
            return newState
        default:
            break;
    }
}

export default reducer
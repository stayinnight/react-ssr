import {
    ADD_COUNT,
    INIT_COUNT
} from "./actionTypes"

export const addCount = () => {
    return {
        type: ADD_COUNT
    }
} 

export const initHome = (count) => {
    return {
        type: INIT_COUNT,
        count
    }
}
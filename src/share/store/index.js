import { createStore } from 'redux'
import reducer from './reducer'
export function createClientStore () {
    return createStore(reducer)
}
export function createServerStore () {
    return createStore(reducer)
}
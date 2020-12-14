import { connectRouter } from 'connected-react-router'
import Auth from './Auth'

const Reducers = (history) => ({
    router: connectRouter(history),
    auth: Auth
})

export default Reducers

import { store } from '../src/redux/store'
import { Provider } from 'react-redux'

import '../styles/mainStyle.css'


export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

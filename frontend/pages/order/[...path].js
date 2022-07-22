import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";

import Header from '../../src/components/header'
import Home from '../../src/components/home/home'
import Login from '../../src/components/login/login'

export default function Order() {
    const { signedIn } = useSelector((state) => state.user);

    const router = useRouter()
    const path = router.query.path || []


    return (
        <div style={{height: '100%'}}>
            <Header />
            {
                (!signedIn) ?
                    <Login /> :
                    (path.length == 1) ?
                        <Home path="order" params={path} /> :
                        (path.length == 2) ? 
                        <Home path="order" params={path} />:
                        <h1>error</h1>
            }

        </div>
    )

}
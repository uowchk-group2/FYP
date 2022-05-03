import { useRouter } from 'next/router'

import Header from '../../src/components/header'
import Home from '../../src/components/home/home'

export default function Order() {
    const router = useRouter()
    const path = router.query.path || []

    console.log(path)

    if (path.length == 1) {
        return (
            <>
                <Header />
                <Home path="order" params={path}/>
            </>
        )

    } else if (path.length == 2) {
        return (
            <>
                <Header />
                <Home path="order" params={path} />
            </>
        )

    } else {
        return (
            <>
                <Header />
                <h1>error</h1>
            </>
        )
    }
}
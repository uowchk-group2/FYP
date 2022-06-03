import Header from '../src/components/header'
import Login from '../src/components/login/login'
import Home from '../src/components/home/home'
import { useSelector, useDispatch } from "react-redux";


export default function LoginPage() {
    const { signedIn } = useSelector((state) => state.user);

    return (
        <>
            <Header />
            {
                !signedIn ?
                <Login />:
                <Home path="home" />
            }
            
        </>
    )
}
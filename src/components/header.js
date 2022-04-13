import { Link } from 'react-router-dom'
import { Group, Button } from '@mantine/core';

import '../styles/mainStyle.css'

const Header = () => {
    return (
        <header>
            <h2>This is icon.</h2>

            <div style={{ fontSize: 22, textAlign: 'right' }}>
                Hi, user.<br />
                <Link to="#">
                    <Button>Logout</Button>
                </Link>
            </div>

            <div style={{ fontSize: 22, textAlign: 'right' }}>
                Not signed in.<br/>
                <Link to="/">
                    <Button>Login</Button>
                </Link>
            </div>

            <Group>
                Demo: 
                <Link to="/">
                    <Button>Not sign in (Login page)</Button>
                </Link>
                <Link to="/home">
                    <Button>Signed in (Homepage)</Button>
                </Link>

            </Group>
            <hr/>
        </header>
    )
}

export default Header;
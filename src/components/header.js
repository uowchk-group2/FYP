import { Link } from 'react-router-dom'
import { Group, Button } from '@mantine/core';

import '../styles/mainStyle.css'

const Header = () => {
    return (
        <header>
            <h2>This is header.</h2>

            <Group>
                <Link to="/">
                    <Button >Home</Button>
                </Link>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
            </Group>

        </header>
    )
}

export default Header;
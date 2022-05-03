import Link from 'next/link'
import { Group, Button } from '@mantine/core';


const Header = () => {
    return (
        <header>
            <h2>This is icon.</h2>

            <div style={{ fontSize: 22, textAlign: 'right' }}>
                Hi, user.<br />
                <Link href="#">
                    <Button>Logout</Button>
                </Link>
            </div>

            <div style={{ fontSize: 22, textAlign: 'right' }}>
                Not signed in.<br/>
                <Link href="/">
                    <Button>Login</Button>
                </Link>
            </div>

            <Group>
                Demo: 
                <Link href="/">
                    <Button>Not sign in (Login page)</Button>
                </Link>
                <Link href="/home">
                    <Button>Signed in (Homepage)</Button>
                </Link>

            </Group>
            <hr/>
        </header>
    )
}

export default Header;
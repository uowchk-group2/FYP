import { Link } from "react-router-dom";

import {
    AppShell,
    Navbar,
    Text,
    Group,
    Button, 
} from '@mantine/core';




const Home = () => {
    return (
        <AppShell
            padding="md"
            navbar={<Navbar width={{ base: 300 }} style={{ padding: 15 }} >

                <Navbar.Section >
                    <Button variant='subtle' fullWidth>
                        Assets/Hosts
                    </Button>
                </Navbar.Section>

                <Navbar.Section>
                    <Button variant='subtle' fullWidth>
                        Software
                    </Button>
                </Navbar.Section>

                <Navbar.Section>
                    <Button variant='subtle' fullWidth>
                        Configurations
                    </Button>
                </Navbar.Section>

            </Navbar>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colors.gray[0] },
            })}
        >
            {/* Your application here */}
        </AppShell>
    )
}

export default Home;
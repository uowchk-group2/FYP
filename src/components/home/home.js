import {
    AppShell,
} from '@mantine/core';


import NavBar from './navbar'

const Home = () => {
    return (
        <AppShell
            padding="md"
            navbar={<NavBar />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colors.gray[0] },
            })}
        >
            {/* Your application here */}
        </AppShell>
    )
}

export default Home;
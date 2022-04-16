import {
    AppShell,
    Tabs
} from '@mantine/core';
import { BuildingSkyscraper, Dna } from 'tabler-icons-react';

import NavBar from './navbar'

import HomeContent from './homeContent'
import OrderPage from '../order/order'
import Blockchain from '../blockchain/blockchain'

//Select what content to show in the main frame
const PageContent = (props) => {
    const path = props.path;

    console.log("path: " + path)

    if (path === "home") {
        return <HomeContent />;
    }
    if (path === "order") {
        return <OrderPage />;
    }

}


const Home = (props) => {
    const path = props.path
    let data = [
        { id: 1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg", chosen: true },
        { id: 2, good: "Gold", date: "02-04-2022", supplier: "Oscar Co.", distributor: "Ivan Co.", delivered: 20, total: 20, unit: "kg", chosen: false }
    ]

    if (path !== "order") {
        data[0].chosen = false
    }

    return (
            <Tabs variant="outline">
                <Tabs.Tab
                    label="Operation Centre"
                    icon={<BuildingSkyscraper size={20} />}
                >
                    <AppShell
                        padding="md"
                        navbar={<NavBar data={data} />}
                        styles={(theme) => ({
                            main: { backgroundColor: theme.colors.gray[0] },
                        })}
                    >
                        {/* Your application here */}
                        <PageContent path={path} />
                    </AppShell>
                </Tabs.Tab>

                <Tabs.Tab
                    label="Blockchain Centre"
                    icon={<Dna size={20} />}
                >
                    <Blockchain />
                </Tabs.Tab>
            </Tabs>
    )
}

export default Home;
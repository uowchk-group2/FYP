import { useParams } from 'react-router-dom';

import {
    AppShell,
} from '@mantine/core';

import NavBar from './navbar'

import HomeContent from './homeContent'
import OrderPage from '../order/order'
import NewOrder from '../order/newOrder'

//Select what content to show in the main frame
const PageContent = (props) => {
    const path = props.path;
    
    console.log("path: "+path)

    if (path === "home") {
        return <HomeContent />;
    }
    if (path === "order") {
        return <OrderPage  />;
    }  

}


const Home = (props) => {
    const path = props.path
    let data = [
        {id:1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg", chosen: true },
        {id:2, good: "Gold", date: "02-04-2022", supplier: "Oscar Co.", distributor: "Ivan Co.", delivered: 20, total: 20, unit: "kg", chosen: false }
    ]

    if (path !== "order") {
        data[0].chosen = false
    }

    return (
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
    )
}

export default Home;
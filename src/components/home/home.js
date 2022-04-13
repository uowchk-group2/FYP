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
    const url = props.url;
    const param = props.param;
    const tabOption = props.option;

    if (url === "home") {
        return <HomeContent />;
    }
    if (url === "order") {
        return <OrderPage id={param} tabOption={tabOption} />;
    }
    if (url === "newOrder") {
        return <NewOrder />
    }


}


const Home = (props) => {
    const param = { params: useParams() };
    const url = props.path
    let data = [
        {id:1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg", chosen: true },
        {id:2, good: "Gold", date: "02-04-2022", supplier: "Oscar Co.", distributor: "Ivan Co.", delivered: 20, total: 20, unit: "kg", chosen: false }
    ]

    if (url !== "order") {
        data[0].chosen = false
    }
    console.log("url: "+url)
    console.log(param)


    return (
        <AppShell
            padding="md"
            navbar={<NavBar data={data} />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colors.gray[0] },
            })}
        >
            {/* Your application here */}
            <PageContent url={url} param={param} />
        </AppShell>
    )
}

export default Home;
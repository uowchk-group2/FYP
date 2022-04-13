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

    if (url == "home"){
        return <HomeContent />;
    }
    if (url == "order"){
        return <OrderPage id={param} />;
    }
    if (url == "newOrder"){
        return <NewOrder />
    }
}

const Home = (props) => {
    const param = { params: useParams() };
    const url = props.path

    return (
        <AppShell
            padding="md"
            navbar={<NavBar />}
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
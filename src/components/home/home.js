import { useEffect, useState } from 'react';
import { AppShell, Tabs } from '@mantine/core';
import { BuildingSkyscraper, Dna } from 'tabler-icons-react';
import { useSelector, useDispatch } from "react-redux";

import { retrieveOrders } from '../../functions/order'
import { setOrders } from '../../redux/order'

//Components
import NavBar from './navbar'
import HomeContent from './homeContent'
import OrderPage from '../order/order'
import Blockchain from '../blockchain/blockchain'


const Home = (props) => {
    const path = props.path
    const params = props.params

    //States
    const [ordersLoaded, setOrdersLoaded] = useState(false)

    //Redux
    const { orders } = useSelector((state) => state.order);
    const { userId } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            let ordersRetrieved = await retrieveOrders(userId)
            dispatch(setOrders(ordersRetrieved))
        }

        if (!ordersLoaded) {
            fetchOrders()
            setOrdersLoaded(true)
        }

    })

    return (
        <Tabs variant="outline">
            <Tabs.Tab
                label="Operation Centre"
                icon={<BuildingSkyscraper size={20} />}
            >
                <AppShell
                    padding="md"
                    navbar={<NavBar data={orders} />}
                    styles={(theme) => ({
                        main: { backgroundColor: theme.colors.gray[0] },
                    })}
                >
                    {
                        path === "home" ?
                            <HomeContent params={params} /> :
                            <OrderPage params={params} />
                    }
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
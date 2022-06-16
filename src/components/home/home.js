import { useEffect, useState } from 'react';
import { AppShell, Tabs } from '@mantine/core';
import { BuildingSkyscraper, Dna } from 'tabler-icons-react';
import { useSelector, useDispatch } from "react-redux";

import { retrieveOrders, retrieveSingleOrders } from '../../functions/order'
import { retrieveDeliveryNotesOfDriver } from '../../functions/delivery'
import { setOrders } from '../../redux/order'
import { setDeliveries } from '../../redux/delivery'

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
    const [activeTab, setActiveTab] = useState(0);

    //Redux
    const { orders } = useSelector((state) => state.order);
    const { deliveries } = useSelector((state) => state.delivery);
    const { userId, role } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            if (role != "Driver") {
                let ordersRetrieved = await retrieveOrders(userId)
                dispatch(setOrders(ordersRetrieved))
            } else {
                let tmpDeliveries = await retrieveDeliveryNotesOfDriver(userId)
                dispatch(setDeliveries(tmpDeliveries))

                //Fetch order detail of the delivery note
                let tmpOrders = []
                let tmpOrderId = []
                for (let delivery of tmpDeliveries) {
                    if (tmpOrderId.indexOf(delivery.orderId) === -1) {
                        tmpOrderId.push(delivery.orderId)
                        tmpOrders.push(await retrieveSingleOrders(delivery.orderId))
                    }
                }
                dispatch(setOrders(tmpOrders))
            }
        }

        if (!ordersLoaded) {
            fetchOrders()
            setOrdersLoaded(true)
        }


    })

    return (
        <Tabs active={activeTab} onTabChange={setActiveTab}
            grow position="center" variant="outline"
            style={{
                backgroundColor: "#e0e0e0",
                borderRadius: "10px 10px 0px 0px",
            }}>
            <Tabs.Tab
                label="Operation Centre"
                icon={<BuildingSkyscraper size={20} />}
                className="nav-option"
                style={{
                    color: activeTab === 0 ? "" : "",
                    borderRadius: "10px 10px 0px 0px ",
                    borderTop: activeTab === 0 ? "1px solid black " : "",
                    borderLeft: activeTab === 0 ? "1px solid black " : "",
                    borderRight: activeTab === 0 ? "1px solid black " : "",
                }}
            >
                <AppShell
                    navbar={<NavBar data={orders} params={params} />}
                    styles={(theme) => ({
                        main: { backgroundColor: theme.colors.gray[0], },
                    })}
                >
                    <div
                        className={(path === "home")?"nav-hide":"nav-body"}
                    >
                        {
                            path === "home" ?
                                <HomeContent params={params} /> :
                                <OrderPage params={params} />
                        }

                    </div>
                </AppShell>
            </Tabs.Tab>

            <Tabs.Tab
                label="Blockchain Centre"
                icon={<Dna size={20} />}
                className="nav-option"
                style={{
                    borderRadius: "10px 10px 0px 0px ",
                    borderTop: activeTab === 1 ? "1px solid black " : "",
                    borderLeft: activeTab === 1 ? "1px solid black " : "",
                    borderRight: activeTab === 1 ? "1px solid black " : "",
                    borderBottomStyle: "none"
                }}
            >
                <Blockchain />
            </Tabs.Tab>
        </Tabs>
    )
}

export default Home;
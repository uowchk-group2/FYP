import { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core'
import { useSelector, useDispatch } from "react-redux";

import { ReportAnalytics, FileDescription, TruckDelivery } from 'tabler-icons-react';

import { retrieveOrders, retrieveSingleOrders } from '../../functions/order'
import { retrieveDeliveryNotesOfDriver } from '../../functions/delivery'
import { setOrders, setCurrentOrder } from '../../redux/order'
import { setDeliveries } from '../../redux/delivery'

//Component
import OrderDetail from './orderDetail'
import Delivery from '../delivery/delivery'
import DeliveryDetailDesktop from '../delivery/detail/deliveryDetailDesktop'
import DeliveryDetailMobile from '../delivery/detail/deliveryDetailMobile'
import DocumentTableDesktop from '../document/documentListDesktop'
import DocumentTableMobile from '../document/documentListMobile'

const OrderPage = (props) => {

    //States
    const [ordersLoaded, setOrdersLoaded] = useState(false)
    const [url, setUrl] = useState([])

    //Redux
    const { orders, currentOrder } = useSelector((state) => state.order);
    const { userId, role } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    let params = props.params;
    const [activeTab, setActiveTab] = useState(params.length == 2 ? 1 : 0);

    function tabChangeHandler(props) {
        setActiveTab(props)
    }

    useEffect(() => {
        const fetchOrders = async () => {

            if (role != "Driver") {
                let ordersRetrieved = await retrieveOrders(userId)
                dispatch(setOrders(ordersRetrieved))


                for (let item of ordersRetrieved) {
                    if (item.id === parseInt(params)) {
                        dispatch(setCurrentOrder(item))
                    }
                }

            } else {
                let tmpDeliveries = await retrieveDeliveryNotesOfDriver(userId)
                dispatch(setDeliveries(tmpDeliveries))

                //Fetch order detail of the delivery note
                dispatch(setCurrentOrder(await retrieveSingleOrders(parseInt(params))))
            }

        }

        if (orders.length === 0 || !ordersLoaded) {
            fetchOrders()
            setOrdersLoaded(true)
        }


        if (url != params) {
            fetchOrders()
            setOrdersLoaded(true)
            setUrl(params)
        }

    })
    if (currentOrder != undefined) {
        return (
            <div>
                <Tabs tabPadding="md" active={activeTab} onTabChange={tabChangeHandler}>
                    <Tabs.Tab
                        label="Purchase Order"
                        icon={<ReportAnalytics size={20} />}
                    >
                        <OrderDetail />
                    </Tabs.Tab>

                    <Tabs.Tab
                        label="Delivery Notes"
                        icon={<TruckDelivery size={20} />}
                    >
                        {(orders.length === 0) ?
                            <></> : (params.length == 2) ?
                                <>
                                    <DeliveryDetailDesktop data={currentOrder} params={params} />
                                    <DeliveryDetailMobile data={currentOrder} params={params} />
                                </>
                                : <Delivery orderId={params} />
                        }

                    </Tabs.Tab>

                    <Tabs.Tab
                        label="Documents"
                        icon={<FileDescription size={20} />}
                    >
                        <DocumentTableDesktop params={params} data={currentOrder} all={true} />
                        <DocumentTableMobile params={params} data={currentOrder} all={true} />
                    </Tabs.Tab>


                </Tabs>

            </div>
        )
    } else {
        return (<></>)
    }
}

export default OrderPage;
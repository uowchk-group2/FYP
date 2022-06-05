import { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core'
import { useSelector, useDispatch } from "react-redux";

import { ReportAnalytics, FileDescription, TruckDelivery } from 'tabler-icons-react';

import { retrieveOrders } from '../../functions/order'
import { setOrders } from '../../redux/order'

//Component
import OrderDetail from './orderDetail'
import Delivery from '../delivery/delivery'
import DeliveryDetail from '../delivery/detail/deliveryDetail'
import DocumentList from '../document/documentList'

const OrderPage = (props) => {


    //States
    const [ordersLoaded, setOrdersLoaded] = useState(false)
    const [currentOrder, setCurrentOrder] = useState({});
    const [url, setUrl] = useState([])

    //Redux
    const { orders } = useSelector((state) => state.order);
    const { userId } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    let params = props.params;
    const [activeTab, setActiveTab] = useState(params.length == 2 ? 1 : 0);

    function tabChangeHandler(props) {
        setActiveTab(props)
    }
    
    console.log("orders")
    console.log(orders)
    


    useEffect(() => {
        console.log("Fetching:")
        const fetchOrders = async () => {
            let ordersRetrieved = await retrieveOrders(userId)
            dispatch(setOrders(ordersRetrieved))

            for (let item of ordersRetrieved) {
                if (item.id === parseInt(params)) {
                    setCurrentOrder(item)
                }
            }
        }

        if (orders.length === 0 || !ordersLoaded) {
            fetchOrders()
            setOrdersLoaded(true)
        }

        if (url != params){
            fetchOrders()
            setOrdersLoaded(true)
            setUrl(params)
        }

    })

    const data = { id: 1, orderId: 1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg" }
    return (
        <div>
            <Tabs tabPadding="md" active={activeTab} onTabChange={tabChangeHandler}>
                <Tabs.Tab
                    label="Purchase Order"
                    icon={<ReportAnalytics size={20} />}
                >
                    <OrderDetail data={currentOrder} />
                </Tabs.Tab>

                <Tabs.Tab
                    label="Delivery Notes"
                    icon={<TruckDelivery size={20} />}
                >
                    {(orders.length === 0) ? <></>:(params.length == 2 ) ?
                        <DeliveryDetail data={currentOrder} params={params} /> :
                        <Delivery data={currentOrder} />
                    }

                </Tabs.Tab>

                <Tabs.Tab
                    label="Documents"
                    icon={<FileDescription size={20}  />}
                >
                    <DocumentList params={params} data={currentOrder}/>
                </Tabs.Tab>


            </Tabs>

        </div>
    )
}

export default OrderPage;
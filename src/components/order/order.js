import { useState } from 'react';
// import { useParams, useNavigate } from "react-router-dom";
import { useRouter } from 'next/router'

import { MantineProvider, Tabs } from '@mantine/core'

import { ReportAnalytics, FileDescription, TruckDelivery } from 'tabler-icons-react';

import OrderDetail from './orderDetail'
import Delivery from '../delivery/delivery'
import DeliveryDetail from '../delivery/detail/deliveryDetail'
import DocumentList from '../document/documentList'

const OrderPage = (props) => {
    let params = props.params;
    console.log("props")
    console.log(props)
    const [activeTab, setActiveTab] = useState(params.length == 2 ? 1 : 0);

    function tabChangeHandler(props) {
        setActiveTab(props)
    }

    const data = { id: 1, orderId: 1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg" }
    return (
        <div>
            <Tabs tabPadding="md" active={activeTab} onTabChange={tabChangeHandler}>
                <Tabs.Tab
                    label="Purchase Order"
                    icon={<ReportAnalytics size={20} />}
                >
                    <OrderDetail data={data} />
                </Tabs.Tab>

                <Tabs.Tab
                    label="Delivery Notes"
                    icon={<TruckDelivery size={20} />}
                >
                    {(params.length == 2) ?
                        <DeliveryDetail data={data} /> :
                        <Delivery data={data} />
                    }

                </Tabs.Tab>

                <Tabs.Tab
                    label="Documents"
                    icon={<FileDescription size={20} />}
                >
                    <DocumentList />
                </Tabs.Tab>


            </Tabs>

        </div>
    )
}

export default OrderPage;
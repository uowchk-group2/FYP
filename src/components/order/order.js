import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Tabs } from '@mantine/core'

import { ReportAnalytics, FileDescription, TruckDelivery } from 'tabler-icons-react';

import OrderDetail from './orderDetail'
import Delivery from '../delivery/delivery'

const OrderPage = (props) => {
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);


    const data = { id: 1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg" }
    return (
        <div>
            <Tabs tabPadding="md" active={activeTab} onTabChange={setActiveTab}>
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
                    <Delivery data={data} />
                </Tabs.Tab>

                <Tabs.Tab
                    label="Documents"
                    icon={<FileDescription size={20} />}
                >
                    Content 2
                </Tabs.Tab>
            </Tabs>

        </div>
    )
}

export default OrderPage;
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Tabs } from '@mantine/core'

import { ReportAnalytics, FileDescription, TruckDelivery } from 'tabler-icons-react';


import OrderDetail from './orderDetail'
import Delivery from '../delivery/delivery'

const OrderPage = (props) => {
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1);
    const tabOption = props.tabOption;

    if (tabOption === "delivery") {
        setActiveTab(2)
    }
    if (tabOption === "docs") {
        setActiveTab(2)
    }

    function onTabChangeHandler(tabValue) {
        setActiveTab(tabValue)
        
        if (tabValue === 0){
            navigate("/order/1")
        }
        if (tabValue === 1){
            navigate("/order/1/delivery")
        }
        if (tabValue === 2){
            navigate("/order/1/docs")
        }
    }

    const data = { good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", status: "On the way", delivered: 10, total: 100, unit: "kg" }
    return (
        <div>
            <Tabs tabPadding="md" active={activeTab} onTabChange={onTabChangeHandler}>
                <Tabs.Tab
                    label="Purchase Order"
                    icon={<ReportAnalytics size={20} />}
                >
                    <OrderDetail data={data} />
                </Tabs.Tab>

                <Tabs.Tab
                    label="Delivery"
                    icon={<TruckDelivery size={20} />}
                >
                    <Delivery />
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
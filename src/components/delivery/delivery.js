import { useState } from 'react'
import { Link } from "react-router-dom";

import {
    Navbar,
    Button,
    ActionIcon,
    Group,
    Table,
    Text,
    Center,
    Modal
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import DeliveryItem from './deliveryItem'
import NewDelivery from './newDelivery'

const Delivery = (props) => {
    let [addNew, setAddNew] = useState(false)
    let data = props.data
    let deliveries = [
        {
            id: "1-1",
            orderId: "1",
            eta: "14-04-2022",
            from: "Tsing Yi",
            to: "Mong Kok",
            quantity: 4,
            status: "Delivered",
        },
        {
            id: "1-2",
            orderId: "1",
            eta: "11-04-2022",
            from: "Tsing Yi",
            to: "Prince Edward",
            quantity: 6,
            status: "On the way",
        },
    ]

    const tableStyle = {
        left: 0,
        fontSize: 16,
        padding: 15,

    }

    let totalQuant = 10;

    return (
        <div>
            <Button variant='filled' onClick={() => { setAddNew(true); console.log("Clicked") }}>
                <ActionIcon variant='transparent'>
                    <Plus color="white" />
                </ActionIcon>
                New Delivery Note
            </Button>
            <span style={{ fontSize: 18 }}> Delivery Notes Created: 10 / 100 kg</span>
            <br /><br />
            <Table style={tableStyle} highlightOnHover striped >
                <thead>
                    <tr>
                        <th>Delivery Note Id</th>
                        <th>Estimated Delivery Time</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {[...deliveries].map((item, i) => {
                        return <DeliveryItem data={item} detail={false} />
                    })}


                </tbody>
            </Table>

            <Modal
                size="xl"
                opened={addNew}
                onClose={() => { setAddNew(false) }}
            >

                <NewDelivery />
            </Modal>


        </div>
    )
}

export default Delivery;

import { useState } from 'react'
// import { Link } from "react-router-dom";

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
    let orderData = props.data
    let deliveries = orderData.notes


    const tableStyle = {
        left: 0,
        fontSize: 16,
        padding: 15,

    }


    return (
        <div>
            <Button variant='filled' onClick={() => { setAddNew(true); }}>
                    <Plus color="white" />
                New Delivery Note
            </Button>
            <span style={{ fontSize: 18 }}> Delivery Notes Created: {orderData.ordered} / {orderData.deliveryTotal} {orderData.deliveryUnit}</span>
            <br /><br />
            <Table style={tableStyle} highlightOnHover striped >
                <thead>
                    <tr>
                        <th>Delivery Note Id</th>
                        <th>Shipping Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {[...deliveries].map((item, i) => {
                        return <DeliveryItem key={i} orderData={orderData} data={item} detail={false} />
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

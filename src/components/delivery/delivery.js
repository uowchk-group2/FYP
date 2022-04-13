import { Link } from "react-router-dom";

import {
    Navbar,
    Button,
    ActionIcon,
    Group,
    Table,
    Text,
    Center
} from '@mantine/core';

import { Plus } from 'tabler-icons-react';

import DeliveryItem from './deliveryItem'

const Delivery = (props) => {
    let data = props.data
    let deliveries = [

        {
            id: "1-1",
            createDate:"14-04-2022",
            from:"Tsing Yi",
            to:"Mong Kok",
            quantity:4,
            status:"Delivered",
        },
        {
            id: "1-2",
            createDate:"11-04-2022",
            from:"Tsing Yi",
            to:"Prince Edward",
            quantity:6,
            status:"On the way",
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
            <Link to={`/order/${data.id}/delivery/new`}>
                <Button variant='filled' >
                    <ActionIcon variant='transparent'>
                        <Plus color="white" />
                    </ActionIcon>
                    New Delivery Note
                </Button>
            </Link>
            <span style={{ fontSize: 18 }}> Delivery Notes Created: 10/100</span>
            <br/><br/>
            <Table style={tableStyle} highlightOnHover striped >
                <thead>
                    <tr>
                        <th>Delivery Note Id</th>
                        <th>Create date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {[...deliveries].map((item, i) => {
                        return <DeliveryItem data={item} />
                    })}

                    
                </tbody>
            </Table>


        </div>
    )
}

export default Delivery;

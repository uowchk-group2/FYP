import { Link } from "react-router-dom";
import {
    Button,
    ActionIcon,
    Table,
} from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';

import DeliveryItem from '../deliveryItem'
import DeliveryTimeline from './deliveryTimeline'
import DocumentTable from '../../document/documentList'


const DeliveryDetail = (props) => {
    let deliveryData = {
        id: "1-1",
        orderId: "1",
        eta: "14-04-2022",
        from: "Tsing Yi",
        to: "Mong Kok",
        quantity: 4,
        status: "Delivered",
    }

    let deliveryRecords = [
        { sequence: 4, description: "The driver has uploaded a document.", status: "Document Uploaded", time: "14-04-2022 14:01", location: "Mong Kok" },
        { sequence: 3, description: "The goods has delivered to customer.", status: "Delivered", time: "14-04-2022 14:00", location: "Mong Kok" },
        { sequence: 2, description: "The driver is on the way to destination.", status: "On The Way", time: "14-04-2022 13:00", location: "Mong Kok" },
        { sequence: 1, description: "The driver has collected the goods from sender.", status: "Goods Collected", time: "14-04-2022 12:00", location: "Mong Kok" },
    ]

    return (
        <div>
            {/* Back button */}
            <div>
                <Link to={`/order/${deliveryData.id}`} >
                    <Button>
                        <ActionIcon variant='transparent'>
                            <ArrowBackUp color="white" />
                        </ActionIcon>
                        Delivery Notes
                    </Button>
                </Link>
            </div>

            {/* Page Detail */}
            <Table>
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
                    <DeliveryItem data={deliveryData} detail={true} />
                </tbody>
            </Table>
            <hr />
            <table width="100%" >
                <tr>
                    <td width="50%">
                        <h2 style={{ textAlign: 'center' }}>Status</h2>
                        <DeliveryTimeline data={deliveryRecords} />

                    </td>
                    <td style={{ verticalAlign: 'top' }} width="50%">
                        <h2 style={{ textAlign: 'center', width: '100%' }}>Documents</h2>
                        <DocumentTable />

                    </td>
                </tr>
            </table>

        </div>
    )
}

export default DeliveryDetail
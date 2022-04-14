import { useState } from 'react'
import {
    Table,
    Button,
    Modal
} from '@mantine/core';

import EditOrder from './editOrder'

import '../../styles/mainStyle.css'

const OrderDetail = (props) => {
    const [editView, setEditView] = useState(false)
    let item = props.data

    function deleteOrder() {
        if ( window.confirm("Are you sure you want to delete this order?") ) {
            console.log("Confirmed")
        }
    }
    return (
        <div className="horizontalTrim">
            <h2 className="center">Order Detail</h2>
            <div style={{ textAlign: 'right' }}>
                <Button
                    onClick={() => { setEditView(true) }}
                >
                    Edit
                </Button>
                <Button
                    color="red"
                    onClick={deleteOrder}
                >
                    Delete
                </Button>
            </div>
            <Table verticalSpacing="lg" fontSize="md" >
                <tbody>
                    <tr>
                        <th>Order No.</th>
                        <td>{item.id}</td>
                    </tr>
                    <tr>
                        <th>Goods:</th>
                        <td>{item.good}</td>
                    </tr>
                    <tr>
                        <th>Created Date:</th>
                        <td>{item.date}</td>
                    </tr>
                    <tr>
                        <th>Supplier:</th>
                        <td>{item.supplier}</td>
                    </tr>
                    <tr>
                        <th>Distributor:</th>
                        <td>{item.distributor}</td>
                    </tr>
                    <tr>
                        <th>Delivered/Total</th>
                        <td>{item.delivered} / {item.total} {item.unit}</td>
                    </tr>
                    <tr>
                        <td colSpan="2" >
                            <hr />
                        </td>
                    </tr>

                </tbody>
            </Table>

            <Modal
                size="xl"
                opened={editView}
                onClose={() => { setEditView(false) }}
            >

                <EditOrder />
            </Modal>


        </div>
    )
}

export default OrderDetail;
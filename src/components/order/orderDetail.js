import { useState } from 'react'
import {
    Table,
    Button,
    Modal
} from '@mantine/core';


// import '../../styles/mainStyle.css'

const OrderDetail = (props) => {
    let item = props.data

    return (
        <div className="horizontalTrim">
            <h2 className="center">Order Detail</h2>
            <div style={{ textAlign: 'right' }}>
            </div>
            <Table verticalSpacing="lg" fontSize="md" >
                <tbody>
                    <tr>
                        <th>Order No.</th>
                        <td>{item.id}</td>
                    </tr>
                    <tr>
                        <th>Goods:</th>
                        <td>{item.goods}</td>
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
                        <th>Created / Total</th>
                        <td>{item.ordered} / {item.deliveryTotal} {item.deliveryUnit}</td>
                    </tr>
                    <tr>
                        <td colSpan="2" >
                            <hr />
                        </td>
                    </tr>

                </tbody>
            </Table>

        </div>
    )
}

export default OrderDetail;
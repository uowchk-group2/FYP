import {
    Table,
    Button,
} from '@mantine/core';

import '../../styles/mainStyle.css'

const OrderDetail = (props) => {
    let item = props.data
    return (
        <div className="horizontalTrim">
            <h2 className="center">Order Detail</h2>
            <div style={{ textAlign: 'right' }}>
                <Button>Edit</Button>
                <Button color="red">Delete</Button>
            </div>
            <Table verticalSpacing="lg" fontSize="md" >
                <tbody>
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
                        <th>Status:</th>
                        <td>{item.status}</td>
                    </tr>
                    <tr>
                        <th>Delivered/Total</th>
                        <td>{item.delivered} / {item.total} {item.unit}</td>
                    </tr>
                    <tr>
                        <td colspan="2" >
                            <hr />
                        </td>
                    </tr>

                </tbody>
            </Table>

        </div>
    )
}

export default OrderDetail;
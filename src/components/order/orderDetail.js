import { Table } from '@mantine/core';
import { useSelector } from "react-redux";


const OrderDetail = () => {
    //Redux
    const { currentOrder } = useSelector((state) => state.order);

    if (currentOrder != undefined) {

        return (
            <div className="horizontalTrim">
                <h2 className="center">Order Detail</h2>
                <div style={{ textAlign: 'right' }}>
                </div>
                <Table verticalSpacing="lg" fontSize="md" >
                    <tbody>
                        <tr>
                            <th>Order No.</th>
                            <td>{currentOrder.id}</td>
                        </tr>
                        <tr>
                            <th>Goods:</th>
                            <td>{currentOrder.goods}</td>
                        </tr>
                        <tr>
                            <th>Created Date:</th>
                            <td>{currentOrder.date}</td>
                        </tr>
                        <tr>
                            <th>Supplier:</th>
                            <td>{currentOrder.supplier}</td>
                        </tr>
                        <tr>
                            <th>Distributor:</th>
                            <td>{currentOrder.distributor}</td>
                        </tr>
                        <tr>
                            <th>Created / Total</th>
                            <td>{currentOrder.ordered} / {currentOrder.deliveryTotal} {currentOrder.deliveryUnit}</td>
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
    } else {
        return (<></>)
    }
}

export default OrderDetail;
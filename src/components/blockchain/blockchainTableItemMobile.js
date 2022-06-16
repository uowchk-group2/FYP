import { Group, Button } from '@mantine/core';
import { useSelector, useDispatch } from "react-redux";

const BlockchainTableItem = (props) => {
    const { orders } = useSelector((state) => state.order);

    let data = props.data;

    let deliveryNoteIds = ""
    for (let order of orders) {
        if (parseInt(data.id) === order.id) {

            //Loop through order's delivery
            for (let note of order.notes) {
                if (deliveryNoteIds != "") {
                    deliveryNoteIds += `+${note.id}`
                } else {
                    deliveryNoteIds = `${note.id}`
                }
            }

        }
    }



    return (
        <>
            <thead>
                <tr>
                    <th colSpan="3">Order No. {data.id}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Goods</td>
                    <td>{data.goods}</td>
                    <td rowspan="5">
                        <Group grow style={{ padding: 5 }}>
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/orders/download/${data.id}`, '_blank')}>
                                Order
                            </Button>
                        </Group>
                        <Group grow style={{ padding: 5 }}>
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/deliveryNotes/download/${data.id}`, '_blank')}>
                                Delivery Notes
                            </Button>
                        </Group>
                        <Group grow style={{ padding: 5 }}>
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/deliveryStatus/download/${deliveryNoteIds}`, '_blank')}>
                                Delivery Status
                            </Button>
                        </Group>
                        <Group grow style={{ padding: 5 }}>
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/documents/download/${data.id}`, '_blank')}>
                                Documents
                            </Button>
                        </Group>
                    </td>
                </tr>
                <tr>
                    <td>Created Date</td>
                    <td>{data.date}</td>
                </tr>
                <tr>
                    <td>Supplier</td>
                    <td>{data.supplier}</td>
                </tr>
                <tr>
                    <td>Distributor</td>
                    <td>{data.distributor}</td>
                </tr>
                <tr>
                    <td>Order Total</td>
                    <td>{data.deliveryTotal} {data.deliveryUnit} </td>
                </tr>


                {/* 
                <tr>

                    <td>{data.goods}</td>
                    <td>{data.date}</td>
                    <td>{data.supplier}</td>
                    <td>{data.distributor}</td>
                    <td>{data.deliveryTotal} {data.deliveryUnit} </td>
                    <td>
                        <Group >
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/orders/download/${data.id}`, '_blank')}>
                                Order

                            </Button>
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/deliveryNotes/download/${data.id}`, '_blank')}>
                                Delivery Notes
                            </Button>
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/deliveryStatus/download/${deliveryNoteIds}`, '_blank')}>
                                Delivery Status
                            </Button>
                            <Button
                                onClick={() => window.open(`https://tomcat.johnnyip.com/fyp-hyperledger/api/documents/download/${data.id}`, '_blank')}>
                                Documents
                            </Button>

                        </Group>
                    </td>

                </tr>
 */}
            </tbody>

        </>


    )
}

export default BlockchainTableItem;
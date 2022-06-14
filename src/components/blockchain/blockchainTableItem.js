import { Group, Button } from '@mantine/core';
import { useSelector, useDispatch } from "react-redux";

const BlockchainTableItem = (props) => {
    const { orders } = useSelector((state) => state.order);

    let data = props.data;
    console.log("data");
    console.log(data);
    console.log(orders);

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

    console.log(deliveryNoteIds);


    return (
        <tr>
            <td>{data.id}</td>
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
    )
}

export default BlockchainTableItem;
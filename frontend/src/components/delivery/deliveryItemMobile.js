import { useSelector } from "react-redux";
import Link from 'next/link'
import { Button, Modal } from '@mantine/core';

const DeliveryItemMobile = (props) => {
    //Redux
    const { currentOrder } = useSelector((state) => state.order);

    const data = props.data
    const isDetail = props.detail

    if (Object.keys(currentOrder).length > 0 && Object.keys(data).length > 0 && currentOrder != undefined) {
        let lastObject = {}
        for (let statusItem of data.status) {
            if (statusItem.arrivalActual != null) {
                lastObject = statusItem
            }
        }
        return (
            <>
                <thead>
                    <tr>
                        <th colSpan="2">Delivery Note ID: {data.id}</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>Shipping Date</td>
                        <td>{data.shippingDate}</td>
                    </tr>
                    <tr>
                        <td>From</td>
                        <td style={{ maxWidth: "200px" }}>{data.origin}</td>
                    </tr>
                    <tr>
                        <td>To</td>
                        <td style={{ maxWidth: "200px" }}>{data.destination}</td>
                    </tr>
                    <tr>
                        <td>Quantity</td>
                        <td>{data.quantity} {currentOrder.deliveryUnit}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td
                            style={{
                                color: (lastObject.title === "Goods Delivered") ? "green" :
                                    (Object.keys(lastObject).length === 0) ? "red" : "blue"
                            }}
                        >
                            <b>
                                {(Object.keys(lastObject).length != 0) ? lastObject.title : "Not Started"}
                            </b>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            {
                                (isDetail ?
                                    <></> :
                                    <>
                                        <Link href={`/order/${data.orderId}/${data.id}`} >
                                            <Button style={{width: "100%"}}>
                                                View
                                            </Button>
                                        </Link>
                                    </>
                                )
                            }

                        </td>

                    </tr>

                </tbody>
                <br /><br /><br />
            </>
        )
    } else {
        return (<></>)
    }
}

export default DeliveryItemMobile;

            // </tr >

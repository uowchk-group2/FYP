import { useState } from 'react'
import Link from 'next/link'
import { Button, Modal } from '@mantine/core';

import DeliveryDetailEdit from './detail/deliveryDetailEdit'

const DeliveryItem = (props) => {
    const data = props.data
    const isDetail = props.detail
    const [editView, setEditView] = useState(false)

    const buttonStyle = {
        // width:"100%",
        height: "100%",
        textAlign: "left",
        contentAlign: "left",
        align: "left",
        padding: 15,
    }

    function deleteDelivery() {
        if (window.confirm("Are you sure you want to delete this delivery?")) {
            console.log("Confirmed")
        }
    }

    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.eta}</td>
            <td>{data.from}</td>
            <td>{data.to}</td>
            <td>{data.quantity} kg</td>
            <td>{data.status}</td>
            <td>
                {
                    (isDetail ?
                        <>
                            <Button
                                onClick={() => { setEditView(true) }}
                            >
                                Edit
                            </Button>
                        </> :
                        <>
                            <Link href={`/order/${data.orderId}/${data.id}`} >
                                <Button>
                                    View
                                </Button>
                            </Link>
                        </>
                    )
                }

                <Button
                    color="red"
                    onClick={deleteDelivery}
                >
                    Delete
                </Button>

                <Modal
                    size="xl"
                    opened={editView}
                    onClose={() => setEditView(false)}
                >
                    <DeliveryDetailEdit />
                </Modal>

            </td>
        </tr>
    )
}

export default DeliveryItem;
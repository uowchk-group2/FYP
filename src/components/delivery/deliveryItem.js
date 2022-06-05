import { useState } from 'react'
import Link from 'next/link'
import { Button, Modal } from '@mantine/core';

const DeliveryItem = (props) => {
    const data = props.data
    const orderData = props.orderData
    const isDetail = props.detail
        
    if (Object.keys(orderData).length > 0 && Object.keys(data).length > 0) {
        return (
            <tr>
                <td>{data.id}</td>
                <td>{data.shippingDate}</td>
                <td>{data.origin}</td>
                <td>{data.destination}</td>
                <td>{data.quantity} {orderData.deliveryUnit}</td>
                <td>{data.status[data.status.length - 1].title}</td>
                <td>
                    {
                        (isDetail ?
                            <></> :
                            <>
                                <Link href={`/order/${data.orderId}/${data.id}`} >
                                    <Button>
                                        View
                                    </Button>
                                </Link>
                            </>
                        )
                    }

                </td>
            </tr>
        )
    }else{
        return (<></>)
    }
}

export default DeliveryItem;
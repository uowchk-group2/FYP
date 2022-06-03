import { useState } from 'react'
import Link from 'next/link'
import { Button, Modal } from '@mantine/core';

const DeliveryItem = (props) => {
    const data = props.data
    const isDetail = props.detail

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
}

export default DeliveryItem;
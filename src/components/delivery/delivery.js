import { useState } from 'react'
// import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { Button, Table, Modal } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

import DeliveryItem from './deliveryItem'
import NewDelivery from './newDelivery'

const Delivery = ({ orderId }) => {
    //Redux
    const { currentOrder } = useSelector((state) => state.order);
    let [addNew, setAddNew] = useState(false)

    console.log("currentOrder")
    console.log(currentOrder)


    const tableStyle = {
        left: 0,
        fontSize: 16,
        padding: 15,

    }

    if (currentOrder != undefined) {
        return (
            <div>
                <Button
                    variant='filled'
                    onClick={() => { setAddNew(true); }}
                    disabled={currentOrder.deliveryTotal === currentOrder.ordered}
                >
                    <Plus color="white" />
                    New Delivery Note
                </Button>
                <span style={{ fontSize: 18 }}>

                </span>
                <span style={{ fontSize: 20 }}>
                    {(currentOrder.deliveryTotal === currentOrder.ordered) ? " All the quantity of goods is ordered:" : ` Delivery Notes Created`}
                    <b>{` ${currentOrder.ordered} / ${currentOrder.deliveryTotal} ${currentOrder.deliveryUnit}`}</b>
                </span>
                <br /><br />


                <Table style={tableStyle} highlightOnHover striped >
                    <thead>
                        <tr>
                            <th>Delivery Note Id</th>
                            <th>Shipping Date</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            (currentOrder.notes != undefined) ?
                                [...currentOrder.notes].map((item, i) => {
                                    return <DeliveryItem key={i} data={item} detail={false} />
                                })
                                : <></>
                        }


                    </tbody>
                </Table>

                <Modal
                    size="xl"
                    opened={addNew}
                    onClose={() => { setAddNew(false) }}
                >

                    <NewDelivery closeFunction={setAddNew} orderId={orderId} />
                </Modal>


            </div>
        )

    } else {
        return <></>
    }
}

export default Delivery;

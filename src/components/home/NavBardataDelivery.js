import { useState } from 'react'
import { useSelector } from "react-redux";
import Link from 'next/link'
import { Navbar, Button, Table } from '@mantine/core';

const NavBardataDelivery = ({ data, chosen }) => {
    //Redux
    const { orders } = useSelector((state) => state.order);

    const buttonStyle = {
        // width: "100%",
        height: "100%",
        textAlign: "left",
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 10
    }

    const tableStyle = {
        fontSize: 16,
        width: 265,
        textAlign: "left",
        color: data.allDelivered ? "#A0A0A0" : chosen ? "white" : "black",
    }

    let itemStatus = ""

    console.log("data")
    console.log(data)
    console.log(data.status)

    let lastObject = {}
    for (let statusItem of data.status) {
        console.log("statusItem")
        console.log(statusItem)
        if (statusItem.arrivalActual != null) {
            itemStatus = statusItem.title
        }
    }

    if (itemStatus === "") {
        itemStatus = "Not Started"
    }


    return (
        <Navbar.Section >
            <Link href={`/order/${data.orderId}/${data.id}`}>
                <Button variant={chosen ? "filled" : "subtle"} style={buttonStyle} >
                    <Table style={tableStyle} >
                        <tbody>
                            <tr>
                                <th>Delivery Note No.</th>
                                <th>{data.id}</th>
                            </tr>
                            <tr>
                                <th>Origin:</th>
                                <th>{data.origin.substr(0, 12)}...</th>
                            </tr>
                            <tr>
                                <th>Destination:</th>
                                <th>{data.destination.substr(0, 12)}...</th>
                            </tr>
                            <tr>
                                <th>Delivery Status:</th>
                                <th>{itemStatus}</th>
                            </tr>
                            <tr>
                                <th colSpan="2" >
                                    <hr />
                                </th>
                            </tr>

                        </tbody>
                    </Table>
                </Button>
            </Link>
        </Navbar.Section>

    )
}

export default NavBardataDelivery;
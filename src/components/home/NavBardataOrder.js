import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar, Button, Table } from '@mantine/core';

import { useSelector, useDispatch } from "react-redux";

const NavBardataOrder = ({ data, chosen }) => {
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
        color: data.allDelivered ? "#A0A0A0" :  chosen ? "white" : "black",
    }

    return (
        <Navbar.Section >
            <Link href={`/order/${data.id}`}>
                <Button variant={chosen ? "filled" : "subtle"} style={buttonStyle} >
                    <Table style={tableStyle} >
                        <tbody>
                            <tr>
                                <th>Order No.</th>
                                <th>{data.id}</th>
                            </tr>
                            <tr>
                                <th>Goods:</th>
                                <th>{data.goods}</th>
                            </tr>
                            <tr>
                                <th>Created / Total</th>
                                <th>{data.ordered} / {data.deliveryTotal} {data.deliveryUnit}</th>
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

export default NavBardataOrder;
import Link from 'next/link'

import {
    Navbar,
    Button,
    Table
} from '@mantine/core';

const NavBardata = ({ data }) => {

    const buttonStyle = {
        // width: "100%",
        height: "100%",
        textAlign: "left",
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop:10
    }

    const tableStyle = {
        fontSize: 16,
        width: 265,
        textAlign: "left",
        color: data.chosen ? "white" : data.delivered === data.total ? "#A0A0A0" : "black",
    }


    return (
        <Navbar.Section >
            <Link href="/order/1">
                <Button variant={data.chosen ? "filled" : "subtle"} style={buttonStyle} >
                    <Table style={tableStyle} >
                        <tbody>
                            <tr>
                                <th>Order No.</th>
                                <th>{data.id}</th>
                            </tr>
                            <tr>
                                <th>Goods:</th>
                                <th>{data.good}</th>
                            </tr>
                            <tr>
                                <th>Created Date:</th>
                                <th>{data.date}</th>
                            </tr>
                            <tr>
                                <th>Supplier:</th>
                                <th>{data.supplier}</th>
                            </tr>
                            <tr>
                                <th>Distributor:</th>
                                <th>{data.distributor}</th>
                            </tr>
                            <tr>
                                <th>Delivered/Total</th>
                                <th>{data.delivered} / {data.total} {data.unit}</th>
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

export default NavBardata;
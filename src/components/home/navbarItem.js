import { Link } from "react-router-dom";

import {
    Navbar,
    Button,
    Table
} from '@mantine/core';

const NavBarItem = (props) => {
    let item = props.data

    const buttonStyle = {
        // width: "100%",
        height: "100%",
        textAlign: "left",
        padding: 15,
    }

    const tableStyle = {
        fontSize: 16,
        width: 265,
        textAlign: "left",
        color: item.chosen ? "white" : item.delivered === item.total ? "#A0A0A0" : "black",
        tableLayout: "",
    }

    console.log()

    return (
        <Navbar.Section >
            <Link to="/order/1">
                <Button variant={item.chosen ? "filled" : "subtle"} style={buttonStyle} >
                    <Table style={tableStyle} >
                        <tr>
                            <th>Order No.</th>
                            <td>{item.id}</td>
                        </tr>
                        <tr>
                            <th>Goods:</th>
                            <td>{item.good}</td>
                        </tr>
                        <tr>
                            <th>Created Date:</th>
                            <td>{item.date}</td>
                        </tr>
                        <tr>
                            <th>Supplier:</th>
                            <td>{item.supplier}</td>
                        </tr>
                        <tr>
                            <th>Distributor:</th>
                            <td>{item.distributor}</td>
                        </tr>
                        <tr>
                            <th>Delivered/Total</th>
                            <td>{item.delivered} / {item.total} {item.unit}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" >
                                <hr />
                            </td>
                        </tr>
                    </Table>
                </Button>
            </Link>
        </Navbar.Section>

    )
}

export default NavBarItem;
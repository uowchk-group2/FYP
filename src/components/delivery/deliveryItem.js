import { Link } from "react-router-dom";
import { Button, Table } from '@mantine/core';

const DeliveryItem = (props) => {
    const data = props.data

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
            <td>{data.createDate}</td>
            <td>{data.from}</td>
            <td>{data.to}</td>
            <td>{data.quantity}</td>
            <td>{data.status}</td>
            <td>
                <Button>View</Button>
                <Button
                    color="red"
                    onClick={deleteDelivery}
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
}

export default DeliveryItem;
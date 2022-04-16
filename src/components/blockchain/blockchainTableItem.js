import { Group, Button } from '@mantine/core';

const BlockchainTableItem = (props) => {
    let data = props.data;

    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.good}</td>
            <td>{data.date}</td>
            <td>{data.supplier}</td>
            <td>{data.distributor}</td>
            <td>{data.delivered}/{data.total}</td>
            <td>
                <Group>
                    <Button>
                        Download Sales Order data
                    </Button>
                    <Button>
                        Download Report
                    </Button>
                </Group>
            </td>

        </tr>
    )
}

export default BlockchainTableItem;
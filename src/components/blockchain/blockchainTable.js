import { Table } from '@mantine/core';

import BlockchainTableItem from './blockchainTableItem';

const BlockchainTable = () => {
    const tableStyle = {
        left: 0,
        fontSize: 16,
        padding: 15,

    }

    let data = [
        { id: 1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg", chosen: true },
        { id: 2, good: "Gold", date: "02-04-2022", supplier: "Oscar Co.", distributor: "Ivan Co.", delivered: 20, total: 20, unit: "kg", chosen: false }
    ]


    return (
        <div>
            <Table style={tableStyle} highlightOnHover striped>
                <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Goods</th>
                        <th>Created Date</th>
                        <th>Supplier</th>
                        <th>Distributor</th>
                        <th>Delivered/Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {[...data].map((item, i) => {
                        return <BlockchainTableItem data={item}/>
                    })}

                </tbody>
            </Table>
        </div>
    )
}

export default BlockchainTable;
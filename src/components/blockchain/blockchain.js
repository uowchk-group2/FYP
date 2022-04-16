import {
    Input,
    Select,
    Group,
    Button
} from '@mantine/core';

import BlockchainTable from './blockchainTable'

const Blockchain = () => {
    return (
        <div>
            <Group position="center">
                <Select
                    style={{ width: "10%" }}
                    placeholder="Search Criteria"
                    data={[
                        { value: 'order', label: 'Order Number' },
                        { value: 'ng', label: 'Supplier' },
                        { value: 'svelte', label: 'Distributor' },
                        { value: 'vue', label: 'Goods' },
                        { value: 'vue', label: 'Date' },
                    ]}
                />
                <Input
                    style={{ width:'40%' }}
                    placeholder="Searching Keywords"
                >
                </Input>

                <Button>
                    Search
                </Button>

            </Group>


            <hr />
            <h3 style={{ textAlign: 'center' }}>Search Result</h3>
            <BlockchainTable />
        </div>
    )
}

export default Blockchain;
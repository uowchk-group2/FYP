import { Table, Input, Group, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { getFromBlockchain } from '../../functions/order'
import BlockchainTableItem from './blockchainTableItem';


const Blockchain = () => {
    const { orders } = useSelector((state) => state.order);

    const [listFetched, setListFetched] = useState(false)
    const [blockchainOrders, setBlockchainOrders] = useState([])

    //Textfield
    const [searchString, setSearchString] = useState("")

    const tableStyle = {
        left: 0,
        fontSize: 16,
        padding: 15,
    }

    useEffect(() => {
        const fetchFromBlockchain = async () => {
            let resultArray = []
            let blockchainData = await getFromBlockchain()
            for (let order of blockchainData) {
                for (let selfOrder of orders) {
                    if (selfOrder.id === parseInt(order.id)) {
                        resultArray.push(order)
                    }
                }
            }

            setBlockchainOrders(resultArray)
        }

        if (!listFetched) {
            fetchFromBlockchain()
            setListFetched(true)
        }
    })


    return (
        <div style={{ paddingTop: 15, backgroundColor: '#F9F9FA', height: "100%" }}>
            <Group position="center">
                <Input
                    style={{ width: '40%' }}
                    placeholder="Searching Keywords"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value.toLowerCase())}
                >
                </Input>
            </Group>


            <hr />
            <h3 style={{ textAlign: 'center' }}>Search Result</h3>

            <div >
                <Table style={tableStyle} highlightOnHover striped>
                    <thead>
                        <tr>
                            <th>Order No.</th>
                            <th>Goods</th>
                            <th>Created Date</th>
                            <th>Supplier</th>
                            <th>Distributor</th>
                            <th>Order Total</th>
                            <th>Download from Blockchain (In CSV)</th>
                        </tr>
                    </thead>
                    <tbody>

                        {[...blockchainOrders].map((item, i) => {
                            console.log("item")
                            // if (keyword)
                            if (searchString === "" || (searchString != "" && (item.id.toString().includes(searchString)
                                || item.goods.toLowerCase().includes(searchString) || 
                                item.supplier.toLowerCase().includes(searchString) ||
                                item.distributor.toLowerCase().includes(searchString) ))) {
                                return <BlockchainTableItem key={i} data={item} />
                            }
                        })}

                    </tbody>
                </Table>
            </div>


        </div>
    )
}

export default Blockchain;
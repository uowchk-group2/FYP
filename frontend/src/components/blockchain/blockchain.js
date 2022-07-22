import { Table, Input, Group, Button, Badge } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { getFromBlockchain } from '../../functions/order'
import BlockchainTableItemDesktop from './blockchainTableItemDesktop';
import BlockchainTableItemMobile from './blockchainTableItemMobile';


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


            <hr /><br/>
            <Group grow style={{ paddingLeft: 50, paddingRight:50}}>
                <Badge color="dark" size="xl" radius="sm">Search Result</Badge>
            </Group>

            <div className="deliveryTable-desktop">
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
                            // if (keyword)
                            if (searchString === "" || (searchString != "" && (item.id.toString().includes(searchString)
                                || item.goods.toLowerCase().includes(searchString) ||
                                item.supplier.toLowerCase().includes(searchString) ||
                                item.distributor.toLowerCase().includes(searchString)))) {
                                return <BlockchainTableItemDesktop key={i} data={item} />
                            }
                        })}

                    </tbody>
                </Table>
            </div>

            <div className="deliveryTable-mobile">
                <Table style={tableStyle} highlightOnHover striped>
                    <thead>
                        <tr>
                            <th colSpan="2">Detail</th>
                            <th>Download from Blockchain (In CSV)</th>
                        </tr>
                    </thead>

                    {[...blockchainOrders].map((item, i) => {
                        // if (keyword)
                        if (searchString === "" || (searchString != "" && (item.id.toString().includes(searchString)
                            || item.goods.toLowerCase().includes(searchString) ||
                            item.supplier.toLowerCase().includes(searchString) ||
                            item.distributor.toLowerCase().includes(searchString)))) {
                            return <BlockchainTableItemMobile key={i} data={item} />
                        }
                    })}

                </Table>
            </div>


        </div>
    )
}

export default Blockchain;
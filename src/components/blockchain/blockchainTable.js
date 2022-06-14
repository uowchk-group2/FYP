import { Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import BlockchainTableItem from './blockchainTableItem';

import { getFromBlockchain } from '../../functions/order'

const BlockchainTable = () => {
    const { orders } = useSelector((state) => state.order);

    const [listFetched, setListFetched] = useState(false)
    const [blockchainOrders, setBlockchainOrders] = useState([])

    const tableStyle = {
        left: 0,
        fontSize: 16,
        padding: 15,
    }

    // let data = [
    //     { id: 1, good: "Jewel", date: "09-04-2022", supplier: "Johnny Co.", distributor: "Ivan Co.", delivered: 10, total: 100, unit: "kg", chosen: true },
    //     { id: 2, good: "Gold", date: "02-04-2022", supplier: "Oscar Co.", distributor: "Ivan Co.", delivered: 20, total: 20, unit: "kg", chosen: false }
    // ]



    useEffect(() => {
        const fetchFromBlockchain = async () => {
            let resultArray = []
            let blockchainData = await getFromBlockchain()
            for (let order of blockchainData){
                for (let selfOrder of orders){
                    console.log("selfOrder.id === order.id")
                    console.log(selfOrder.id+', '+order.id)
                    console.log(selfOrder.id === parseInt(order.id))
                    if (selfOrder.id === parseInt(order.id)){
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {[...blockchainOrders].map((item, i) => {
                        return <BlockchainTableItem key={i} data={item} />
                    })}

                </tbody>
            </Table>
        </div>
    )
}

export default BlockchainTable;
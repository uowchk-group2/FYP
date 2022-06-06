import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button, Table } from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';

//Function
import { getCheckpoints } from '../../../functions/maps'

//Component
import DeliveryItem from '../deliveryItem'
import DeliveryTimeline from './deliveryTimeline'
import DocumentTable from '../../document/documentList'
import RouteMap from './map'


const DeliveryDetail = (props) => {
    const [checkPoints, setCheckPoints] = useState([])
    const [noteItem, setNoteItem] = useState({})


    let noteId = props.params[1]
    let orderData = props.data
    let noteData = props.data.notes
    //Current selected note item

    useEffect(() => {
        if (noteData != undefined) {
            for (let note of noteData) {
                if (note.id === parseInt(noteId)) {
                    setNoteItem(note)
                }
            }
        }

    })

    console.log(noteItem)

    const getRoutes = async () => {
        // console.log(noteItem.origin)
        // console.log(noteItem.destination)
        console.log(await getCheckpoints(noteItem.origin, noteItem.destination))

    }


    if (orderData != undefined) {
        return (
            <div>
                {/* Back button */}
                <div>
                    <Link href={`/order/${noteItem.orderId}`} >
                        <Button>
                            <ArrowBackUp color="white" />
                            Delivery Notes
                        </Button>
                    </Link>
                </div>

                {/* Page Detail */}
                <Table>
                    <thead>
                        <tr>
                            <th>Delivery Note Id</th>
                            <th>Estimated Delivery Time</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DeliveryItem orderData={orderData} data={noteItem} detail={true} />
                    </tbody>
                </Table>
                <hr />

                <div>
                    <RouteMap ></RouteMap>
                </div>

                <table width="100%" >
                    <tr>
                        <td width="50%">
                            <h2 style={{ textAlign: 'center' }}>Status</h2>
                            <Button
                                style={{ textAlign: 'center' }}
                                onClick={() => { getRoutes() }}
                            >
                                Get Routes
                            </Button>

                            <DeliveryTimeline data={noteItem.status} />
                        </td>

                        <td style={{ verticalAlign: 'top' }} width="50%">
                            <h2 style={{ textAlign: 'center', width: '100%' }}>Documents</h2>
                            <DocumentTable params={props.params} data={orderData} />
                        </td>
                    </tr>
                </table>

            </div>
        )
    } else {
        return (<></>)
    }
}

export default DeliveryDetail
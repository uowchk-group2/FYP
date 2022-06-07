import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button, Table } from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';

//Function
import { getCheckpoints,saveCheckpointUpdate } from '../../../functions/maps'
import { retrieveDeliveryStatus } from '../../../functions/delivery'

//Component
import DeliveryItem from '../deliveryItem'
import DeliveryTimeline from './deliveryTimeline'
import DocumentTable from '../../document/documentList'
import RouteMap from './map'


const DeliveryDetail = (props) => {
    const [checkPoints, setCheckPoints] = useState([])
    const [noteItem, setNoteItem] = useState({})
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    let noteId = props.params[1]
    let orderData = props.data
    let noteData = props.data.notes


    useEffect(() => {
        //Current selected note item
        if (noteData != undefined && Object.keys(noteItem).length === 0) {
            console.log("Checking")
            for (let note of noteData) {
                if (note.id === parseInt(noteId)) {
                    setNoteItem(note)

                    console.log("note.status")
                    console.log(note.status)
                    if (checkPoints.length === 0) {
                        setCheckPoints(note.status)
                    }

                }
            }
        }

    })

    // console.log(noteItem)

    const updateStatusItem = (route) => {
        let tmpNoteItem = Object.assign({}, noteItem)
        tmpNoteItem.status = route
        setNoteItem(tmpNoteItem)
    }

    const startDelivery = async () => {
        setLoading(true)

        let route = await getCheckpoints(noteItem.origin, noteItem.destination, noteItem.id)
        updateStatusItem(route)
        setLoading(false)
    }

    const nextCheckpoint = async () => {
        let statuses = [...noteItem.status]
        // statuses = noteItem.status;
        console.log(statuses)
        let found = false
        for (let i = 0; i < statuses.length; i++) {
            if (!found && statuses[i].arrivalActual === null) {
                let tmpItem = Object.assign({}, statuses[i])
                tmpItem.arrivalActual = tmpItem.arrivalExpected
                found = true
                //Put new status into tmp array
                statuses[i] = tmpItem
                updateStatusItem(statuses) //Update
                await saveCheckpointUpdate(tmpItem)
            }
        }

        
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
                                onClick={() => { startDelivery() }}
                                loading={loading}
                            >
                                Get Routes
                            </Button>

                            <Button
                                style={{ textAlign: 'center' }}
                                onClick={() => { nextCheckpoint() }}
                                loading={loading2}
                            >
                                Next Checkpoint
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
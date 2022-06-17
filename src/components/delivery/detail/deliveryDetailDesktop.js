import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button, Table, Modal, Group, Badge } from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';

//Function
import { getCheckpoints, saveCheckpointUpdate } from '../../../functions/maps'
import { retrieveDeliveryStatus } from '../../../functions/delivery'

//Component
import DeliveryItemDesktop from '../deliveryItemDesktop'
import DeliveryItemMobile from '../deliveryItemMobile'
import DeliveryTimeline from './deliveryTimeline'
import DocumentTableDesktop from '../../document/documentListDesktop'
import RouteMap from './map'


const deliveryDetailDesktop = (props) => {
    const [checkPoints, setCheckPoints] = useState([])
    const [noteItem, setNoteItem] = useState({})
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [finished, setFinished] = useState(true)
    const [viewFullCheckpoints, setViewFullCheckpoints] = useState(false)

    const [currentNoteId, setCurrentNoteId] = useState(0)
    const [changed, setChanged] = useState(true)

    let noteId = props.params[1]
    let orderData = props.data
    let noteData = props.data.notes


    useEffect(() => {
        //Current selected note item
        if (noteData != undefined && Object.keys(noteItem).length === 0 && changed) {
            for (let note of noteData) {
                if (note.id === parseInt(noteId)) {
                    setNoteItem(note)
                    setChanged(false)

                    if (checkPoints.length === 0) {
                        setCheckPoints(note.status)
                    }

                }
            }
        }


        if (currentNoteId === 0 || currentNoteId != noteId) {
            setNoteItem({})
            setCurrentNoteId(noteId)
            setChanged(true)
            setFinished(true)
        }


        if (noteItem != undefined && noteItem.status != undefined) {
            if (noteItem.status.length != 0 && noteItem.status[noteItem.status.length - 1].arrivalActual != null || noteItem.status.length === 0) {
                setFinished(true)
            } else if (noteItem.status.length > 0) {
                setFinished(false)
            }

        }
    })

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
        let found = false
        for (let i = 0; i < statuses.length; i++) {
            if (!found && statuses[i].arrivalActual === null) {
                let tmpItem = Object.assign({}, statuses[i])

                let expected = new Date(tmpItem.arrivalExpected).getTime()

                if (i % 2 == 1) { expected += 5000 }
                else { expected -= 5000 }

                tmpItem.arrivalActual = new Date(expected)

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
            <div className="deliveryTable-desktop">
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
                        <DeliveryItemDesktop orderData={orderData} data={noteItem} detail={true} />
                    </tbody>
                </Table>
                <hr />

                <div>
                    {(noteItem.status.length != 0) ?
                        <>
                            <Group grow>
                                <Badge id="anchor_map" color="dark" size="xl" radius="sm">Map</Badge>
                            </Group>
                            <RouteMap data={noteItem.status}></RouteMap>
                        </>
                        : <></>}
                </div>

                <table width="100%" >
                    <tr>


                        <td width="50%">
                            {(noteItem.status != undefined) ?
                                <>
                                    <br />
                                    <Group grow>
                                        <Badge color="dark" size="xl" radius="sm">Status</Badge>
                                    </Group>

                                    <Button
                                        style={{ textAlign: 'center' }}
                                        onClick={() => { startDelivery() }}
                                        loading={loading}
                                        disabled={noteItem.status.length != 0}
                                    >
                                        Goods Picked Up
                                    </Button>

                                    <Button
                                        style={{ textAlign: 'center' }}
                                        onClick={() => { nextCheckpoint() }}
                                        loading={loading2}
                                        disabled={finished}
                                    >
                                        Checkpoint Arrived
                                    </Button>

                                    <Button
                                        onClick={() => { setViewFullCheckpoints(true) }}
                                        disabled={noteItem.status.length === 0}
                                    >
                                        View Full Checkpoints
                                    </Button>


                                    <br />
                                    {(noteItem.status.length === 0) ? "May takes up to 10 seconds to generate route" : ""}

                                    <DeliveryTimeline data={noteItem.status} showAll={false} />
                                </> : <></>}

                        </td>

                        <td style={{ verticalAlign: 'top' }} width="50%">
                            <br />
                            <Group grow>
                                <Badge color="dark" size="xl" radius="sm">Documents</Badge>
                            </Group>
                            <DocumentTableDesktop params={props.params} />
                        </td>
                    </tr>
                </table>


                <Modal
                    size="xl"
                    opened={viewFullCheckpoints}
                    onClose={() => { setViewFullCheckpoints(false) }}
                >

                    <DeliveryTimeline data={noteItem.status} showAll={true} />

                </Modal>

            </div>
        )
    } else {
        return (<></>)
    }
}

export default deliveryDetailDesktop
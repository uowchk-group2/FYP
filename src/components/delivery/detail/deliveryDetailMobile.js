import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button, Group, Table, Modal, Badge } from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';

//Function
import { getCheckpoints, saveCheckpointUpdate } from '../../../functions/maps'
import { retrieveDeliveryStatus } from '../../../functions/delivery'

//Component

import DeliveryItemMobile from '../deliveryItemMobile'
import DeliveryTimeline from './deliveryTimeline'
import DocumentTableMobile from '../../document/documentListMobile'
import RouteMap from './map'


const deliveryDetailMobile = (props) => {
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
            <div className="deliveryTable-mobile">
                {/* Back button */}
                <div>
                    <Link href={`/order/${noteItem.orderId}`} >
                        <Group grow>
                            <Button>
                                <ArrowBackUp color="white" />
                                Delivery Notes
                            </Button>
                        </Group>
                    </Link>
                </div>

                {/* Page Detail */}
                <Table>
                    <DeliveryItemMobile orderData={orderData} data={noteItem} detail={true} />
                </Table>
                <hr />

                <h2 style={{ textAlign: 'center' }}>Jump to section</h2>

                <Group grow style={{ padding: 5 }}>
                    <Button onClick={() => { window.location.hash = "#anchor_checkpoint" }}>
                        Checkpoints
                    </Button>
                </Group>

                <Group grow style={{ padding: 5 }}>
                    <Button onClick={() => { window.location.hash = "#anchor_doc" }}>
                        Documents
                    </Button>
                </Group>
                <br /><br />

                <div>
                    {(noteItem.status.length != 0) ?
                        <>
                            <Group grow>
                                <Badge id="anchor_map" color="dark" size="xl" radius="sm">Map</Badge>
                            </Group>
                            <RouteMap mobileView={true} data={noteItem.status}></RouteMap>
                        </>
                        : <></>}

                </div>

                {
                    (noteItem.status != undefined) ?
                        <>
                            <br /><br /><hr />
                            <Group grow>
                                <Badge id="anchor_checkpoint" color="dark" size="xl" radius="sm">Checkpoints</Badge>
                            </Group>

                            <Group grow style={{ padding: 5 }}>
                                <Button
                                    style={{ textAlign: 'center' }}
                                    onClick={() => { startDelivery() }}
                                    loading={loading}
                                    disabled={noteItem.status.length != 0}
                                >
                                    Goods Picked Up
                                </Button>
                            </Group>

                            <Group grow style={{ padding: 5 }}>
                                <Button
                                    style={{ textAlign: 'center' }}
                                    onClick={() => { nextCheckpoint() }}
                                    loading={loading2}
                                    disabled={finished}
                                >
                                    Checkpoint Arrived
                                </Button>
                            </Group>

                            <Group grow style={{ padding: 5 }}>

                                <Button
                                    onClick={() => { setViewFullCheckpoints(true) }}
                                    disabled={noteItem.status.length === 0}
                                >
                                    View Full Checkpoints
                                </Button>
                            </Group>

                            <br />
                            {(noteItem.status.length === 0) ? "May takes up to 10 seconds to generate route" : ""}

                            <DeliveryTimeline mobileView={true} data={noteItem.status} showAll={false} />
                        </> : <></>
                }

                <hr />
                <Group grow>
                    <Badge id="anchor_doc" color="dark" size="xl" radius="sm">Documents</Badge>
                </Group>
                <br />
                <DocumentTableMobile params={props.params} />


                <Modal
                    size="xl"
                    opened={viewFullCheckpoints}
                    onClose={() => { setViewFullCheckpoints(false) }}
                >

                    <DeliveryTimeline data={noteItem.status} showAll={true} />

                </Modal>

            </div >
        )
    } else {
        return (<></>)
    }
}

export default deliveryDetailMobile
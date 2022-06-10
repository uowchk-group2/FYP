import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Table, Button, ActionIcon, Modal, Center } from '@mantine/core';
import { ExternalLink, Trash, FileUpload } from 'tabler-icons-react';

import { convertToTimeString } from '../../functions/date'

//Components
import NewDocument from '../document/newDocument'

const DocumentTable = (props) => {
    //Redux
    const { currentOrder } = useSelector((state) => state.order);

    let noteId = "0";
    if (props.params.length == 2) { noteId = props.params[1] }

    let showAll = props.all
    let documents = []

    //State
    const [newFile, setNewFile] = useState(false);

    if (currentOrder.documents != undefined) {

        for (let doc of currentOrder.documents) {
            if ((showAll || (parseInt(doc.deliveryNoteId) === parseInt(noteId) || (parseInt(doc.deliveryNoteId) === 0)))) {
                documents.push(doc)
            }
        }
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url)
        if (newWindow) newWindow.opener = null
    }


    return (

        <div>

            <Center>
                <Button
                    onClick={() => { setNewFile(true) }}
                    style={{ textAlign: 'center' }}
                >
                    <FileUpload color="white" />
                    Upload New Document
                </Button>
            </Center>

            <Table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Time</th>
                        {showAll ? <th>Delivery Note Id</th> : <></>}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[...documents].map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.description}</td>
                                <td>{convertToTimeString(item.time)}</td>
                                {showAll ?
                                    <td>
                                        {item.deliveryNoteId != 0 ? item.deliveryNoteId : "N/A"}
                                    </td>
                                    : <></>}
                                <td >
                                    <Button
                                        compact
                                        size=""
                                        style={{ fontSize: 13 }}
                                        onClick={() => openInNewTab(`https://uow-project-fyp.s3.ap-east-1.amazonaws.com/${item.filename}`)}
                                    >
                                        <ExternalLink color="white" size={30} />View In New Tab
                                    </Button>

                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>

            <Modal
                opened={newFile}
                onClose={() => setNewFile(false)}
            >
                <NewDocument closeFunction={setNewFile} noteId={noteId} />
            </Modal>

        </div>
    )
}

export default DocumentTable;
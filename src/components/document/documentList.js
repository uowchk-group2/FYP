import { useState, useEffect } from 'react'
import { Table, Button, ActionIcon, Modal, Center } from '@mantine/core';
import { ExternalLink, Trash, FileUpload } from 'tabler-icons-react';

import { convertToTimeString } from '../../functions/date'

//Components
import NewDocument from '../document/newDocument'

const DocumentTable = (props) => {
    let noteId = "";
    if (props.params.length == 2) { noteId = props.params[1] }

    let orderData = props.data
    let showAll = props.all

    const [newFile, setNewFile] = useState(false);


    let documents = []

    if (orderData.documents != undefined) {

        for (let doc of orderData.documents) {
            if ((showAll || (parseInt(doc.deliveryNoteId) === parseInt(noteId) || (parseInt(doc.deliveryNoteId) === 0)))) {
                documents.push(doc)
            }
        }
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
                                    <Button compact size="" style={{ fontSize: 13 }}>

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
                <NewDocument />
            </Modal>

        </div>
    )
}

export default DocumentTable;
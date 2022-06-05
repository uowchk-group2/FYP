import { useState } from 'react'
import { Table, Button, ActionIcon, Modal, Center } from '@mantine/core';
import { ExternalLink, Trash, FileUpload } from 'tabler-icons-react';

import { convertToTimeString } from '../../functions/date'

//Components
import NewDocument from '../document/newDocument'

const DocumentTable = (props) => {
    console.log("Document================================")
    console.log(props.data)
    let noteId = "";
    if (props.params.length == 2) { noteId = props.params[1] }

    console.log("noteId: " + noteId)
    let orderData = props.data

    const [newFile, setNewFile] = useState(false);

    let documents = []

    if (orderData.documents != undefined) {
        for (let doc of orderData.documents) {
            if (doc.deliveryNoteId == noteId) {
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[...documents].map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.description}</td>
                                <td>{convertToTimeString(item.time)}</td>
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
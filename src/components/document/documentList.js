import { useState } from 'react'

import { 
    Table, 
    Button, 
    ActionIcon,
    Modal,
    Center
} from '@mantine/core';
import { ExternalLink, Trash, FileUpload } from 'tabler-icons-react';
import NewDocument from '../document/newDocument'

const DocumentTable = () => {
    const [newFile, setNewFile] = useState(false);

    let documents = [
        { description: 'Signature of receipient', by: 'James (Driver)', time: '14-04-2022 14:01' },
        { description: 'Delivery Note', by: 'Jacky (Distributor)', time: '14-04-2022 14:01' }
    ];


    return (
        
        <div>

            <Center>
                <Button
                    onClick={() => { setNewFile(true) }}
                    style={{ textAlign: 'center' }}
                >
                    <ActionIcon variant='transparent'>
                        <FileUpload color="white" />
                    </ActionIcon>
                    Upload New Document
                </Button>
            </Center>

            <Table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>By</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[...documents].map((item, i) => {
                        return (
                            <tr>
                                <td>{item.description}</td>
                                <td>{item.by}</td>
                                <td>{item.time}</td>
                                <td>
                                    <Button compact size="xs">
                                        <ActionIcon variant='transparent'>
                                            <ExternalLink color="white" size={20} />
                                        </ActionIcon>
                                    </Button>

                                    <Button compact size="xs" color="red">
                                        <ActionIcon variant='transparent'>
                                            <Trash color="white" size={20} />
                                        </ActionIcon>
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
import Link from 'next/link'
import {
    Button,
    ActionIcon,
    Table,
} from '@mantine/core';
import { ArrowBackUp } from 'tabler-icons-react';

import DeliveryItem from '../deliveryItem'
import DeliveryTimeline from './deliveryTimeline'
import DocumentTable from '../../document/documentList'


const DeliveryDetail = (props) => {
    let noteId = props.params[1]
    
    let orderData = props.data
    let noteData = props.data.notes
    //Current selected note item
    let noteItem = {}
    if (noteData != undefined) {
        for (let note of noteData) {
            if (note.id === parseInt(noteId)) {
                noteItem = note
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
                <table width="100%" >
                    <tr>
                        <td width="50%">
                            <h2 style={{ textAlign: 'center' }}>Status</h2>
                            <DeliveryTimeline data={noteItem.status} />

                        </td>
                        <td style={{ verticalAlign: 'top' }} width="50%">
                            <h2 style={{ textAlign: 'center', width: '100%' }}>Documents</h2>
                            <DocumentTable params={props.params} data={orderData}/>

                        </td>
                    </tr>
                </table>

            </div>
        )
    }else{
        return(<></>)
    }
}

export default DeliveryDetail
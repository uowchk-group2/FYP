import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, InputWrapper } from '@mantine/core';

import { uploadDocument, saveDocToDb } from '../../functions/document'

import { retrieveSingleOrders } from '../../functions/order'
import { setCurrentOrder } from '../../redux/order'

const NewDocument = ({ noteId, closeFunction }) => {
    //Redux
    const { currentOrder } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    //State
    const [loading, setLoading] = useState(false);
    const [submittable, setSubmittable] = useState(false)

    //Form field
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null)


    const upload = async () => {
        setLoading(true);

        let file = document.getElementById("docUpload").files[0]
        let filename = await uploadDocument(file)

        console.log(`https://uow-project-fyp.s3.ap-east-1.amazonaws.com/${filename}`)

        let requestBody = {
            id: 0,
            description: description,
            orderId: currentOrder.id,
            deliveryNoteId: noteId,
            filename: filename,
            time: new Date()
        }
        await saveDocToDb(requestBody)
        dispatch(setCurrentOrder(await retrieveSingleOrders(currentOrder.id)));


        setLoading(false);
        closeFunction(false)
    }

    useEffect(() => {

        if (selectedFile === null || description === "") {
            setSubmittable(false)
        } else {
            setSubmittable(true)
        }

    })

    return (
        <div>

            <h2 style={{ textAlign: 'center' }}>Upload a new file</h2>

            <InputWrapper
                required
                label="Choose the file to upload"
            >
                <input
                    type="file"
                    id="docUpload"
                    accept="image/*,.pdf"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
            </InputWrapper><br />

            <InputWrapper
                required
                label="File description"
            >
                <Input
                    placeholder="File description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); }}
                />
            </InputWrapper><br />

            <div className="center">
                <Button
                    onClick={() => upload()}
                    loading={loading}
                    disabled={!submittable}
                >
                    Upload
                </Button>

            </div>

        </div>
    )
}

export default NewDocument;
import { useState } from 'react'
import { Button, Input, InputWrapper } from '@mantine/core';

import { uploadDocument } from '../../functions/document'

const NewDocument = () => {
    const [loading, setLoading] = useState(false);

    const upload = async () => {
        setLoading(true);

        let file = document.getElementById("docUpload").files[0]

        uploadDocument(file)

        setLoading(false);
    }


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Upload a new file</h2>

            <InputWrapper
                required
                label="Choose the file to upload"
            >
                <input type="file" id="docUpload" accept="image/*,.pdf" />
            </InputWrapper><br />

            <InputWrapper
                required
                label="File description"
            >
                <Input placeholder="File description" />
            </InputWrapper><br />

            <div className="center">
                <Button
                    onClick={() => upload()}
                    loading={loading}
                >
                    Upload
                </Button>

            </div>



        </div>
    )
}

export default NewDocument;
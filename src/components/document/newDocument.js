import { useState } from 'react'

import {
    Button,
    Input,
    InputWrapper
} from '@mantine/core';


const NewDocument = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Upload a new file</h2>

            <InputWrapper
                required
                label="Choose the file to upload"
            >
                <input type="file" />
            </InputWrapper><br />

            <InputWrapper
                required
                label="File description"
            >
                <Input placeholder="File description" />
            </InputWrapper><br />

            <div className="center">
                <Button
                    onClick={() => { setLoading(!loading); }}
                    loading={loading}
                >
                    Upload
                </Button>

            </div>



        </div>
    )
}

export default NewDocument;
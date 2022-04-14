import { useState } from 'react'

import {
    InputWrapper,
    TextInput,
    Select,
    NumberInput,
    Button,
    Group,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import "../../styles/mainStyle.css"

const NewDelivery = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>Create new delivery note</h2>

            <InputWrapper
                required
                label="Origin"
                description="Origin address"
            >
                <TextInput placeholder="Origin" />
            </InputWrapper> <br />

            <InputWrapper
                required
                label="Destination"
                description="Destination address"
            >
                <TextInput placeholder="Destination" />
            </InputWrapper> <br />


            <NumberInput
                defaultValue={0}
                placeholder="Quantity of delivery"
                label="Quantity of delivery"
                required
            /><br />

            <DatePicker
                required
                placeholder="Estimated shipping date"
                label="Estimated shipping date"
            /> <br />

            <Select
                label="Driver assignment"
                placeholder="Driver"
                data={[
                    { value: 'driver1', label: 'Driver 1' },
                    { value: 'driver2', label: 'Driver 2' },
                    { value: 'driver3', label: 'Driver 3' },
                    { value: 'driver4', label: 'Driver 4' },
                ]}
            /> <br />


            <div className="center">
                <Button
                >
                    Reset
                </Button>

                <Button
                    onClick={() => { setLoading(!loading); }}
                    loading={loading}
                >
                    Submit
                </Button>

            </div>


        </div>
    )
}

export default NewDelivery;
import { useState } from 'react'

import {
    InputWrapper,
    TextInput,
    Select,
    NumberInput,
    Button,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const DeliveryDetailEdit = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>Create new delivery note</h2>

            <InputWrapper
                required
                label="Origin"
                description="Origin address"
            >
                <TextInput placeholder="Origin" value="Tsing Yi" />
            </InputWrapper> <br />

            <InputWrapper
                required
                label="Destination"
                description="Destination address"
            >
                <TextInput placeholder="Destination" value="Mong Kok" />
            </InputWrapper> <br />


            <NumberInput
                defaultValue={0}
                placeholder="Quantity of delivery"
                label="Quantity of delivery"
                value={4}
                required
            /><br />

            <DatePicker
                required
                placeholder="Estimated shipping date"
                label="Estimated shipping date"
                value={ new Date()}
            /> <br />

            <Select
                label="Driver assignment"
                placeholder="Driver"
                value="driver1"
                data={[
                    { value: 'driver1', label: 'Driver 1' },
                    { value: 'driver2', label: 'Driver 2' },
                    { value: 'driver3', label: 'Driver 3' },
                    { value: 'driver4', label: 'Driver 4' },
                ]}
            /> <br />


            <div className="center">
                <Button
                    onClick={() => { setLoading(!loading); }}
                    loading={loading}
                >
                    Update
                </Button>

            </div>


        </div>
    )
}

export default DeliveryDetailEdit;
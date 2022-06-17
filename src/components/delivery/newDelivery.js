import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { InputWrapper, TextInput, Select, NumberInput, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { retrieveUsersWithRole, retrieveSingleOrders } from '../../functions/order'
import { addNewDeliveryNote } from '../../functions/delivery'
import { setCurrentOrder } from '../../redux/order'


const NewDelivery = ({ closeFunction, orderId }) => {
    //Redux
    const { currentOrder } = useSelector((state) => state.order);
    const { userId } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [submittable, setSubmittable] = useState(false)
    const [listFetched, setListFetched] = useState(false)
    const [quantityLabel, setQuantityLabel] = useState("Quantity of delivery")
    const [quantityError, setQuantityError] = useState("")
    const [driverList, setDriverList] = useState([])

    //Form Data
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [qty, setQty] = useState(1)
    const [shippingDate, setShippingDate] = useState(new Date())
    const [driver, setDriver] = useState('')

    const submitForm = async () => {
        setLoading(true)

        let data = {
            id: 0,
            orderId: currentOrder.id,
            origin: origin,
            destination: destination,
            quantity: qty,
            shippingDate: shippingDate,
            driverId: driver
        }

        let orderResult = await addNewDeliveryNote(data)
        dispatch(setCurrentOrder(await retrieveSingleOrders(orderId)));

        setLoading(false)
        closeFunction(false)
    }

    const qtyOnchange = (value) => {
        if (value === "" || value === undefined) {
            setQuantityError(`The number should be between 1 to ${currentOrder.deliveryTotal - currentOrder.ordered}`)
            setQty(1)
        } else {
            setQuantityError("")
            setQty(parseInt(value.toString().replace(/\Dw/g, '')))
            if (qty <= 0 || qty > (currentOrder.deliveryTotal - currentOrder.ordered)) {
                setQuantityError(`The number should be between 1 to ${currentOrder.deliveryTotal - currentOrder.ordered}`)
                setQty(1)
            }
        }
    }

    const reset = () => {
        setOrigin("")
        setDestination("")
        setQty(1)
        setShippingDate(new Date())
        setDriver('')
    }


    useEffect(() => {

        setQuantityLabel(`Quantity of delivery (${currentOrder.deliveryTotal - currentOrder.ordered} / ${currentOrder.deliveryTotal} ${currentOrder.deliveryUnit} remaining to be delivered)`)

        const fetchUserList = async () => {
            setDriverList(await retrieveUsersWithRole("ROLE_DRIVER"), userId)
        }

        //Check fields
        if (origin === "" || destination === "" || driver === '') {
            setSubmittable(false)
        } else {
            setSubmittable(true)
        }

        if (!listFetched) {
            fetchUserList()
            setListFetched(true)
        }
    })

    return (
        <div >
            <h2 style={{ textAlign: 'center' }}>Create new delivery note</h2>

            <InputWrapper
                required
                label="Origin"
                description="Origin address"
            >
                <TextInput
                    placeholder="Origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                />
            </InputWrapper> <br />

            <InputWrapper
                required
                label="Destination"
                description="Destination address"
            >
                <TextInput
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </InputWrapper> <br />


            <NumberInput
                defaultValue={1}
                placeholder="Quantity of delivery"
                label={quantityLabel}
                required
                value={qty}
                onChange={(value) => qtyOnchange(value)}
                error={quantityError}
            /><br />

            <DatePicker
                required
                placeholder="Estimated shipping date"
                label="Estimated shipping date"
                value={shippingDate}
            /> <br />

            <Select
                label="Driver assignment"
                placeholder="Driver"
                searchable
                required
                data={driverList}
                value={driver}
                onChange={setDriver}
            /> <br />


            <div className="center">
                <Button
                    color="gray"
                    onClick={() => reset()}
                >
                    Reset
                </Button>

                <Button
                    onClick={() => submitForm()}
                    disabled={!submittable}
                    loading={loading}
                >
                    Submit
                </Button>

            </div>


        </div >
    )
}

export default NewDelivery;
import { useState, useEffect } from 'react'
import { InputWrapper, TextInput, Select, NumberInput, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useSelector, useDispatch } from "react-redux";

import { retrieveUsersWithRole, addNewOrder, retrieveOrders } from '../../functions/order'
import { setOrders } from '../../redux/order'

const NewOrder = ({ closeFunction }) => {
    //Redux
    const { userId, role } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [submittable, setSubmittable] = useState(false)
    const [listFetched, setListFetched] = useState(false)
    const [supplierList, setSupplierList] = useState([])
    const [distributorList, setDistributorList] = useState([])

    //Form Data
    const [goods, setGoods] = useState("");
    const [supplier, setSupplier] = useState('');
    const [distributor, setDistributor] = useState('');
    const [orderDate, setOrderDate] = useState(new Date())
    const [unit, setUnit] = useState("")
    const [totalQty, setTotalQty] = useState(1)

    const submitForm = async () => {
        setLoading(true)

        let data = {
            id: 0,
            goods: goods,
            date: orderDate,
            supplierId: supplier,
            distributorId: distributor,
            deliveryTotal: totalQty,
            deliveryUnit: unit
        }

        let orderResult = await addNewOrder(data)

        let fullOrders = await retrieveOrders(userId)
        dispatch(setOrders(fullOrders));
        window.location.href = '/order/' + orderResult.id

        setLoading(false)
        closeFunction(false)
    }

    const qtyOnchange = (value) => {
        if (value === "" || value === undefined) {
            setTotalQty(1)
        } else {
            setTotalQty(parseInt(value.toString().replace(/\Dw/g, '')))
            if (totalQty <= 0) {
                setTotalQty(1)
            }
        }
    }

    const reset = () => {
        setGoods("")
        //Set value if user is the role
        if (role === "Distributor") {
            setDistributor(userId.toString())
            setSupplier("")
        } else {
            setSupplier(userId.toString())
            setDistributor("")
        }
        setOrderDate(new Date())
        setUnit("")
        setTotalQty(0)

    }

    useEffect(() => {
        const fetchUserList = async () => {
            setSupplierList(await retrieveUsersWithRole("ROLE_SUPPLIER"))
            setDistributorList(await retrieveUsersWithRole("ROLE_DISTRIBUTOR"))
        }

        //Check fields
        if (goods === "" || supplier === "" || distributor === "" || unit === "" || totalQty === 0) {
            setSubmittable(false)
        } else {
            setSubmittable(true)
        }

        //Fetch data onload
        if (!listFetched) {
            fetchUserList()
            setListFetched(true)

            //Set value if user is the role
            if (role === "Distributor") {
                setDistributor(userId.toString())
            } else {
                setSupplier(userId.toString())
            }


        }
    })

    return (
        <div style={{ paddingLeft: 30, paddingRight: 30 }}>
            <h2 style={{ textAlign: 'center' }}>Create new Order</h2>

            <InputWrapper
                required
                label="Name of goods"
                description="A short description about the goods of the order"
            >
                <TextInput
                    placeholder="Name of goods"
                    value={goods}
                    onChange={(e) => setGoods(e.target.value)}
                />
            </InputWrapper> <br />

            <Select
                label="Supplier"
                placeholder="Supplier"
                required
                searchable
                clearable
                data={supplierList}
                value={supplier}
                onChange={setSupplier}
                disabled={(role === "Supplier") ? true : false}
            /> <br />

            <Select
                label="Distributor"
                placeholder="Distributor"
                required
                searchable
                clearable
                value={distributor}
                data={distributorList}
                onChange={setDistributor}
                disabled={(role === "Distributor") ? true : false}
            /> <br />

            <DatePicker
                placeholder="Order creation date"
                label="Order creation date"
                required
                value={orderDate}
                onChange={setOrderDate}
            /> <br />

            <InputWrapper
                required
                label="Unit of goods"
            >
                <TextInput
                    placeholder="Eg: kg, grams, tons ..."
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />
            </InputWrapper> <br />

            <NumberInput
                defaultValue={1}
                placeholder="Total order quantity"
                label="Total order quantity"
                required
                value={totalQty}
                onChange={(value) => qtyOnchange(value)}
            /><br />

            <div className="center">
                <Button
                    color="gray"
                    onClick={() => reset()}
                >
                    Reset
                </Button>

                <Button
                    loading={loading}
                    disabled={!submittable}
                    onClick={() => submitForm()}
                >
                    Submit
                </Button>

            </div>


        </div>
    )
}

export default NewOrder;
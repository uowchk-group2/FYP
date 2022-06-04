const axios = require('axios');

import { retrieveDeliveryNotes, retrieveDeliveryStatus } from './delivery'

export const retrieveOrders = async (userId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/order/findByUserId/${userId}`, body, config)
        .then(async (response) => {
            if (response.status == 200) {
                result = response.data
                for (let item of result) {
                    item.chosen = false
                    item.supplier = await retrieveCompanyName(item.supplierId)
                    item.distributor = await retrieveCompanyName(item.distributorId)

                    let deliveryNotes = await retrieveDeliveryNotes(item.id)
                    item.notes = deliveryNotes
                    let totalQty = 0;
                    for (let note of deliveryNotes) {
                        totalQty += note.quantity
                        note.status = await retrieveDeliveryStatus(note.id)
                    }
                    item.ordered = totalQty
                }
            } else {
                result = []
            }
        })
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                console.log("Wrong Credential")
                result = []
            } else {
                console.log("Server Error")
                result = []
            }
        })
    console.log(result)
    return result

}

export const retrieveCompanyName = async (userId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/user/findByUserId/${userId}`, body, config)
        .then((response) => {
            if (response.status == 200) {
                result = response.data.company
            } else {
                result = []
            }
        })
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                console.log("Wrong Credential")
                result = []
            } else {
                console.log("Server Error")
                result = []
            }
        })

    return result

}

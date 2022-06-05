const axios = require('axios');

import { retrieveDeliveryNotes, retrieveDeliveryStatus } from './delivery'
import { retrieveDocuments } from './document'

export const retrieveOrders = async (userId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/order/findByUserId/${userId}`, body, config)
        .then(async (response) => {
            if (response.status == 200) {
                result = response.data
                for (let item of result) {
                    item.supplier = await retrieveCompanyName(item.supplierId)
                    item.distributor = await retrieveCompanyName(item.distributorId)

                    //get all delivery notes of order
                    let deliveryNotes = await retrieveDeliveryNotes(item.id)
                    item.notes = deliveryNotes

                    //Calculate total qty
                    let totalQty = 0;
                    for (let note of deliveryNotes) {
                        totalQty += note.quantity
                        //get all status of devliery note
                        note.status = await retrieveDeliveryStatus(note.id)
                    }
                    item.ordered = totalQty

                    item.documents = await retrieveDocuments(item.id)
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

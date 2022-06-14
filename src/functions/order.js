const axios = require('axios');

import { retrieveDeliveryNotes, retrieveDeliveryStatus, retrieveDeliveryNotesOfDriver } from './delivery'
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

                    //checkAllDelivered
                    let allDelivered = true

                    //Calculate total qty
                    let totalQty = 0;

                    if (deliveryNotes.length === 0) { allDelivered = false }
                    else {
                        for (let note of deliveryNotes) {
                            totalQty += note.quantity
                            //get all status of devliery note
                            note.status = await retrieveDeliveryStatus(note.id)
                            console.log("note.status.length: " + note.status.length)
                            if (note.status.length === 0) { allDelivered = false }
                            else {
                                for (let status of note.status) {
                                    if (status.arrivalActual === null) {
                                        allDelivered = false
                                    }
                                }
                            }
                        }
                    }
                    item.ordered = totalQty
                    item.documents = await retrieveDocuments(item.id)

                    if (totalQty < item.deliveryTotal) { allDelivered = false }

                    item.allDelivered = allDelivered

                    console.log(item)
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
    return result

}

export const retrieveSingleOrders = async (orderId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/order/${orderId}`, body, config)
        .then(async (response) => {
            if (response.status == 200) {
                result = response.data
                result.supplier = await retrieveCompanyName(result.supplierId)
                result.distributor = await retrieveCompanyName(result.distributorId)

                //get all delivery notes of order
                let deliveryNotes = await retrieveDeliveryNotes(result.id)
                result.notes = deliveryNotes

                //checkAllDelivered
                let allDelivered = true

                //Calculate total qty
                let totalQty = 0;

                if (deliveryNotes.length === 0) { allDelivered = false }
                else {
                    for (let note of deliveryNotes) {
                        totalQty += note.quantity
                        //get all status of devliery note
                        note.status = await retrieveDeliveryStatus(note.id)
                        if (note.status.length === 0) { allDelivered = false }
                        else {
                            for (let status of note.status) {
                                if (status.arrivalActual === null) {
                                    allDelivered = false
                                }
                            }
                        }
                    }
                }
                result.ordered = totalQty
                console.log("retrieveDocuments")
                result.documents = await retrieveDocuments(result.id)
                console.log("retrieveDocuments")

                if (totalQty < result.deliveryTotal) { allDelivered = false }

                result.allDelivered = allDelivered

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

export const retrieveUsersWithRole = async (role) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/user/findByRoleName/${role}`, body, config)
        .then((response) => {
            if (response.status == 200) {
                response.data.map((item, i) => {
                    result.push({
                        value: item.id.toString(),
                        label: `${item.company} (${item.fullname}) `
                    })
                })
                // result = 
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

export const addNewOrder = async (data) => {
    let result = []
    const config = { headers: {} }
    let body = data

    await axios.post(`https://tomcat.johnnyip.com/fyp-backend/api/order/order`, body, config)
        .then(async (response) => {
            console.log(response.data)
            if (response.status == 200) {
                result = response.data
                console.log("response.data")
                console.log(response.data.id)

                data.supplier = await retrieveCompanyName(data.supplierId)
                data.distributor = await retrieveCompanyName(data.distributorId)

                saveToBlockchain(response.data.id, data);
                getFromBlockchain();

            } else {
                result = []
            }
        })
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                console.log("Wrong Credential")
                result = []
            } else {
                console.log(err)
                result = []
            }
        })

    return result
}

export const saveToBlockchain = async (resultId, data) => {
    let result = []
    const config = { headers: {} }
    console.log("result, data")
    console.log(result)
    console.log(data)
    let body = {
        id: resultId,
        goods: data.goods,
        date: data.date,
        supplier: data.supplier,
        distributor: data.distributor,
        deliveryTotal: data.deliveryTotal,
        deliveryUnit: data.deliveryUnit,
        createDate: new Date()
    }

    console.log(body)
    console.log(JSON.stringify(body))
    // let token = axios.defaults.headers.common['Authorization']
    // console.log(token)

    // axios.defaults.headers.common['Authorization'] = ""


    await axios.post(`https://tomcat.johnnyip.com/fyp-hyperledger/api/orders/newAsset`, body, config)
        .then((response) => {
            console.log(response.data)
            if (response.status == 200) {
                result = response.data
            } else {
                result = []
            }
        })
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                console.log("Wrong Credential")
                result = []
            } else {
                console.log(err)
                result = []
            }
        })

    // axios.defaults.headers.common['Authorization'] = token
    // return response
}


export const getFromBlockchain = async () => {
    let result = []
    const config = { headers: {} }


    await axios.get(`https://tomcat.johnnyip.com/fyp-hyperledger/api/orders/findAll`)
        .then((response) => {
            console.log(response.data)
            if (response.status == 200) {
                result = response.data
                console.log(result)
            } else {
                result = []
            }
        })
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                console.log("Wrong Credential")
                result = []
            } else {
                console.log(err)
                result = []
            }
        })

    return result
}

const axios = require('axios');

export const retrieveDeliveryNotes = async (orderId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/delivery/note/findByOrderId/${orderId}`, body, config)
        .then((response) => {
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
                console.log("Server Error")
                result = []
            }
        })

    return result

}

export const retrieveDeliveryNotesOfDriver = async (driverId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/delivery/note/findByDriverId/${driverId}`, body, config)
        .then(async (response) => {
            if (response.status == 200) {
                result = response.data

                for (let item of result){
                    let allStatus = await retrieveDeliveryStatus(item.id)
                    item.status = allStatus
                    let allDelivered = true

                    if (allStatus.length === 0) { allDelivered = false }
                    for (let status of allStatus){
                        if (status.arrivalActual === null) {
                            allDelivered = false
                        }
                    }
                    item.allDelivered = allDelivered
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

export const retrieveDeliveryStatus = async (deliveryNoteId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/delivery/status/${deliveryNoteId}`, body, config)
        .then((response) => {
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
                console.log("Server Error")
                result = []
            }
        })

    return result

}

export const addNewDeliveryNote = async (data) => {
    let result = []
    const config = { headers: {} }
    let body = data

    await axios.post(`https://tomcat.johnnyip.com/fyp-backend/api/delivery/note`, body, config)
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

    return result
}


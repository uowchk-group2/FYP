const axios = require('axios');

export const getCheckpoints = async (orig, dest, noteId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://api.johnnyip.com/fyp?orig=${orig}&dest=${dest}`, body, config)
        .then(async (response) => {
            if (response.status == 200) {                
                let checkpoints = response.data[0].legs[0].steps

                //Convert to database format
                let date = Date.now()
                for (let i = 0; i < checkpoints.length; i++) {
                    let data = checkpoints[i]
                    date += data.duration.value * 1000

                    //If just started
                    if (i === 0) {
                        result.push({
                            id: 0,
                            title: "Goods Received",
                            deliveryNoteId: noteId,
                            lat: data.start_location.lat,
                            lng: data.start_location.lng,
                            prevDistance: 0,
                            arrivalExpected: Date.now(),
                            arrivalActual: Date.now()
                        })
                    }

                    //Normal checkpoints
                    result.push({
                        id: 0,
                        title: (i === checkpoints.length - 1) ? `Goods Delivered` : `Checkpoint ${i + 1}/${checkpoints.length-1}`,
                        deliveryNoteId: noteId,
                        lat: data.end_location.lat,
                        lng: data.end_location.lng,
                        prevDistance: data.distance.value,
                        arrivalExpected: date,
                        arrivalActual: null
                    })
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
                console.log(err)
                result = []
            }
        })


    if (result != []) {
        result = await saveNewCheckpoints(result)    
    }

    return result
}

export const saveNewCheckpoints = async (checkpoints) => {
    let result = []
    const config = { headers: {} }
    let body = checkpoints

    await axios.post(`https://tomcat.johnnyip.com/fyp-backend/api/delivery/batchStatus`, body, config)
        .then((response) => {
            console.log(response.data)
            if (response.status == 200) {
                result = response.data

                console.log("result")
                console.log(result)

                if (result.length > 1) {
                    saveToBlockchain(result[0])
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
                console.log(err)
                result = []
            }
        })

    return result
}

export const saveCheckpointUpdate = async (checkpoint) => {
    let result = []
    const config = { headers: {} }
    let body = checkpoint

    await axios.post(`https://tomcat.johnnyip.com/fyp-backend/api/delivery/status`, body, config)
        .then((response) => {
            console.log(response.data)
            if (response.status == 200) {
                let result = response.data

                console.log("result")
                console.log(result)

                saveToBlockchain(result)
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


export const saveToBlockchain = async (data) => {
    let result = []
    const config = { headers: {} }
    console.log("result, data")
    console.log(data)
    let body = {
        id: data.id,
        deliveryNoteId: data.deliveryNoteId,
        lat: data.lat,
        lng: data.lng,
        title: data.title,
        prevDistance: data.prevDistance,
        arrivalActual: data.arrivalActual,
        arrivalExpected: data.arrivalExpected,
        createDate: new Date()
    }

    console.log(body)
    console.log(JSON.stringify(body))


    await axios.post(`https://tomcat.johnnyip.com/fyp-hyperledger/api/deliveryStatus/newAsset`, body, config)
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
}

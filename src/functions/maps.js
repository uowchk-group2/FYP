const axios = require('axios');

export const getCheckpoints = async (orig, dest, noteId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://api.johnnyip.com/fyp?orig=${orig}&dest=${dest}`, body, config)
        .then(async (response) => {
            // console.log(response.data)
            if (response.status == 200) {
                let responseData = response.data

                // console.log(responseData)
                // result.center = {
                //     lat: ((responseData[0].bounds.northeast.lat + responseData[0].bounds.southwest.lat) / 2),
                //     lng: ((responseData[0].bounds.northeast.lng + responseData[0].bounds.southwest.lng) / 2),
                // }
                // result.distance = legs.distance
                // result.duration = legs.duration
                // result.orig = legs.start_location
                // result.orig.name = legs.start_address
                // result.dest = legs.end_location
                // result.dest.name = legs.end_address
                //  = legs.steps

                let checkpoints = response.data[0].legs[0].steps

                //Convert to database format
                let date = Date.now()
                console.log(checkpoints.length)
                for (let i = 0; i < checkpoints.length; i++) {
                    // console.log(checkpoints[i])
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
                console.log("progress: ")
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
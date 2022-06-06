const axios = require('axios');

export const getCheckpoints = async (orig, dest) => {

    let result = {}
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://api.johnnyip.com/fyp?orig=${orig}&dest=${dest}`, body, config)
        .then((response) => {
            // console.log(response.data)
            if (response.status == 200) {
                let responseData = response.data

                console.log(responseData)
                result.center = {
                    lat: ((responseData[0].bounds.northeast.lat + responseData[0].bounds.southwest.lat) / 2),
                    lng: ((responseData[0].bounds.northeast.lng + responseData[0].bounds.southwest.lng) / 2),
                }

                let legs = response.data[0].legs[0]
                result.distance = legs.distance
                result.duration = legs.duration
                result.orig = legs.start_location
                result.orig.name = legs.start_address
                result.dest = legs.end_location
                result.dest.name = legs.end_address
                result.steps = legs.steps

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
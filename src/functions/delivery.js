const axios = require('axios');

export const retrieveDeliveryNotes = async (orderId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/delivery/note/findByOrderId/${orderId}`, body, config)
        .then((response) => {
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
                console.log("Server Error")
                result = []
            }
        })

    return result

}

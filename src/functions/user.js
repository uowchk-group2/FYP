const axios = require('axios');

export const login = () => {
    const config = {
        headers: {

        }
    }

    let body = {
        username: "johnny1",
        password: "johnny"
    }

    axios.post('https://tomcat.johnnyip.com/fyp-backend/login', body, config)
        .then((response) => {
            console.log(response)
            console.log(response.status)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
            if (err.code === "ERR_NETWORK") {
                console.log("Server Error")
            }else if (err.code === "ERR_BAD_REQUEST") {
                console.log("Wrong Credential")
            }
        })



    // fetch('https://tomcat.johnnyip.com/fyp-backend/login', requestOptions)
}
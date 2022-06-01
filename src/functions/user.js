const axios = require('axios');

export const login = async (username, password) => {
    let result = ""
    const config = {
        headers: {

        }
    }

    let body = {
        username: username,
        password: password
    }

    await axios.post('https://tomcat.johnnyip.com/fyp-backend/login', body, config)
        .then((response) => {
            console.log(response)
            console.log(response.status)
            console.log(response.data)
            if (response.status == 200) {
                result = response.data
            } else {
                result = "Server Error"
            }
        })
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                console.log("Wrong Credential")
                result = "Wrong Username or password"
            } else {
                console.log("Server Error")
                result = "Server Error: Failed to connect server"
            }

        })

    return result

}
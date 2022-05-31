const axios = require('axios');

export const login = () => {
    const config = {
        headers: {

        }
    }

    let body = {
        username: "johnny",
        password: "johnny"
    }

    try {
        
        axios.post('https://tomcat.johnnyip.com/fyp-backend/login', body, config)
            .then((response) => {
                console.log(response)
            })

    }catch (err) {
        console.log(err)
    }


    // fetch('https://tomcat.johnnyip.com/fyp-backend/login', requestOptions)
}
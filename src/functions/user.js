const axios = require('axios');

export const login = async (username, password) => {
    let result = ""
    const config = {
        headers: {}
    }

    let body = {
        username: username,
        password: password
    }

    await axios.post('https://tomcat.johnnyip.com/fyp-backend/login', body, config)
        .then((response) => {
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

export const isLogined = async function () {
    let tokenValue = checkJWT();
    console.log("value: " + tokenValue)
    if (tokenValue === "") {
        return "";
    }

    const config = {
        headers: {
            'Authorization': Buffer.from(`${tokenValue}`, 'utf8').toString('base64')
        }
    }

    let body = {}

    await axios.get('https://tomcat.johnnyip.com/fyp-backend/api/user/status', body, config)
        .then((response) => {
            console.log(response);

            if (response.status == 200) {
                result = response.data
            } else {
                result = "Server Error"
            }
        })
        .catch((err) => {
            console.log(err)
        })

}

export const saveJWT = (token) => {
    document.cookie = `JWT=${token}`;

    if (getCookie("JWT") == "") {
        alert("Cannot save cookie. Please allow it in browser setting.")
    }
}

export const checkJWT = () => {
    return getCookie("JWT")
}


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}  
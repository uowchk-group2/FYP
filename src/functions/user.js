const axios = require('axios');

export const login = async (username, password) => {
    let result = ""
    const config = { headers: {} }

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

export const signUp = async (username, password, role, name, companyName) => {
    //Signup part
    let result = ""
    const config = { headers: {} }
    
    //Translate role
    role = "ROLE_"+role.toUpperCase()


    let body = {
        id:0,
        username: username,
        password: password,
        role: role,
        fullname: name,
        company: companyName
    }

    await axios.post('https://tomcat.johnnyip.com/fyp-backend/api/user/newUser', body, config)
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
        
        //Login
        if (result === "Done"){
            await login(username,password)
        }
}

export const fetchUserFromJWT = async () => {
    let tokenValue = checkJWT();
    let result = {};

    // console.log("value: " + tokenValue)
    if (tokenValue === "") {
        return result;
    }

    axios.defaults.headers.common['Authorization'] = tokenValue

    await axios.get('https://tomcat.johnnyip.com/fyp-backend/api/user/status')
        .then((response) => {
            let userJSON = response.data

            if (response.status == 200) {
                result = userJSON;
            } else {
                result = {};
            }
        })
        .catch((err) => {
            console.log(err)
            result = {};
        })
    return result;
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
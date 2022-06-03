const axios = require('axios');

export const backendStatus = async () => {
    let result = false;

    await axios.get('https://tomcat.johnnyip.com/fyp-backend/')
    .then((response) =>{
        console.log(response);
        if (response.status == 200){
            result = true
        }else{
            result = false
        }
    })
    .catch((err) =>{
        console.log(err);
        result = false
    })

    return result
}
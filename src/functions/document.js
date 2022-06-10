const axios = require('axios');

export const retrieveDocuments = async (orderId) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://tomcat.johnnyip.com/fyp-backend/api/doc/byOrderId/${orderId}`, body, config)
        .then((response) => {
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
                console.log("Server Error")
                result = []
            }
        })

    return result

}

export const saveDocToDb = async (body) => {
    let result = []
    const config = { headers: {} }

    await axios.post(`https://tomcat.johnnyip.com/fyp-backend/api/doc/newDoc`, body, config)
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

export const uploadDocument = async (file) => {
    let filename = file.name;
    let randomFileName = getRandomId() + "." + filename.split(".")[filename.split(".").length - 1]

    //get Signed URL for upload
    let uploadURL = await getUploadURL(randomFileName, file.type)

    //turn the file into blob format*
    let blob = new Blob([file], { type: file.type })

    fetch(uploadURL,
        {
            method: "PUT",
            body: blob
        }
    );

    return randomFileName;
}

export const getUploadURL = async (filename, filetype) => {
    let result = []
    const config = { headers: {} }
    let body = {}

    await axios.get(`https://api.johnnyip.com/s3/fyp?filename=${filename}&filetype=${filetype}`, body, config)
        .then((response) => {
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
                console.log("Server Error")
                result = []
            }
        })

    return result

}

export const getRandomId = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
export const convertToTimeString = (timestamp) => {

    //set time
    const offset = (new Date()).getTimezoneOffset();
    let time = (new Date(Date.parse(timestamp) - offset));
    let date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
    time = (time.toTimeString()).substring(0, 8);
    return date + " " + time
}
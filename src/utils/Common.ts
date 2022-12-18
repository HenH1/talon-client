// converting loginFailed to Login failed
const convertEventTypeStringForUI = (eventType: string) => {
    const convertedString = eventType.replace(/[A-Z]/g, ' $&').trim().toLowerCase();
    return convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
}
// converting Login failed to loginFailed
const convertEventTypeStringForReq = (eventType: string) => {
    const splitedStringArr = eventType.split(" ");
    let convertedString = splitedStringArr[0].toLowerCase();

    for (let i = 1; i < splitedStringArr.length; i++) {
        convertedString += splitedStringArr[i].charAt(0).toUpperCase() + splitedStringArr[i].slice(1);
    }
    return convertedString;
}

export { convertEventTypeStringForUI, convertEventTypeStringForReq };
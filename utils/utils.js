function stringToBoolean (string) {
    if (string === undefined || string === null)
        return false;
    if (typeof(string) === 'boolean')
        return string
    switch (string.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
            return true;
        case 'false':
        case 'no':
        case '0':
        case null:
            return false;
        default:
            return Boolean(string);
    }
}

function isEmptyObj(obj) {
    for (const key in obj) {
        return false;
    }
    return true;
}

takeValuesFromField = function (arr, nameField) {
    return arr.map(i => {
        return i[nameField]
    })
}

function dateToFormatISO(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
}

module.exports = {stringToBoolean, takeValuesFromField, isEmptyObj, dateToFormatISO}
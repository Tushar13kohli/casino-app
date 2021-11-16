const writeToLocalStorage = (key,value) => {
    localStorage.setItem(key, value);
}
const getValueFromLocalStorage = (key) => {
    return localStorage.getItem(key)
}
const getElement = (id) => {
    return document.getElementById(id);
}
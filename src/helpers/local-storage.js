export function saveLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage(key){
    let data = localStorage.getItem(key)
    return JSON.parse(data)
}

export function removeLocalStorage(key){
    localStorage.removeItem(key)
}
class LocalStorage {
    constructor() {}

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    get(key) {
    return JSON.parse(localStorage.getItem(key))
    }
}

const storage = new LocalStorage()

export default storage;

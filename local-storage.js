// Notes key to local storage
const notesKey = 'notes';

/**
 * * Takes a key & generate a functions for 
 * Saving & Getting by this key
 * @param {string} key 
 */
function initStorageFor(key) {
    
    function setOnStorage(value){
        localStorage.setItem(key, JSON.stringify(value))
        return { key, value, };
    }

    function getFromStorage(){
        return JSON.parse(localStorage.getItem(key))
    }

    return { setOnStorage, getFromStorage, }
}
/***
 * Generate Id for Notes on Storage
 * If There is a key on storage,
 * Will generate above.
 * Else will starts from 1
 */
function increaseId() {
    let id = 1;
    const idKey = 'idgenrerator';

    return () => {
        const { setOnStorage, getFromStorage, } = initStorageFor(idKey)
        if (getFromStorage() != null) {
            id = Number(getFromStorage());
        }
        setOnStorage(id + 1)
        return "note" + id++;
    }
}

// The Id
const getId = increaseId()
// Set & Get functions for local storage on item notes
const { setOnStorage, getFromStorage, } = initStorageFor(notesKey);

/**
 * Render all notes from storage
 * Into notes container
 */
function renderNotes() {
    const notes = getFromStorage()
    const inputs = Object.values(notes).map(values => {
        const { taskInput, dateInput, timeInput, id } = values;
        return generateNoteElement({ taskInput, dateInput, timeInput }, id)
    });
    inputs.forEach(element => document.getElementById('notes-container').appendChild(element))
}

/***
 * If note item from local storage is empty
 * Than initial with empty object
 * Otherwise Render all notes into notes container 
 */
function initNotes() {
    if (getFromStorage() == null) { 
        setOnStorage({});
    } else {
        renderNotes()
    }
}

initNotes()



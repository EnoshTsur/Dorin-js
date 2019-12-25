// Input ids
const taskId = 'task-input';
const dateId = 'task-date';
const timeId = 'task-time';

// Binding handlesr for input change events
(() => [taskId, dateId, timeId]
    .forEach(id => document.getElementById(id)
        .onchange = () => clearInputStyles(id)))();

/**
 * Returns a function who takes an id
 * And return an element with the given attribute
 * @param {string} attribute 
 */
function getAttribute(attribute) {
    return function (id) {
        return document.getElementById(id)[attribute]
    }
}

// Function who takes an id and returns an elemen's value
const getValue = getAttribute('value')

/***
 * Supplier for note inputs values
 */
const getNotesValues = () => {
    return {
        taskInput: getValue(taskId),
        dateInput: getValue(dateId),
        timeInput: getValue(timeId)
    }
}

// Clear input style by id
function clearInputStyles(id) { document.getElementById(id).style.border = 'unset' }

// Clear input value by id
function clearInputValue(id) { document.getElementById(id).value = '' }

// Clear all notes inputs values
function clearNoteInputs() { [taskId, dateId, timeId].forEach(id => clearInputValue(id)) }

/**
 * Returns true if given string is empty
 * @param {string} value 
 */
function isValid(value) {
    return value.length !== 0;
}

/**
 * Takes input values
 * If one of the input values is invalid
 * Sets input border to red
 * Returns true if all inputs are valid
 * @param {object} inputValues 
 */
function isValidInputs({ taskInput, dateInput, timeInput }) {
    if (!isValid(taskInput)) {
        inputError(taskId);
        return false;
    }
    if (!isValid(dateInput)) {
        inputError(dateId);
        return false;
    }
    if (!isValid(timeInput)) {
        inputError(timeId);
        return false;
    }
    return true;
}

/**
 * Set input border to red by id
 * @param {string} id 
 */
function inputError(id) {
    document.getElementById(id).style.border = '3px solid red'
}

/**
 * Returns an element with text node child, style & id
 * @param {string} elementType 
 * @param {object} styles 
 * @param {string} id 
 * @param {string} text 
 */
function createElement(elementType, styles, id, text = '') {
    const element = document.createElement(elementType);
    const elementText = document.createTextNode(text);
    element.appendChild(elementText);
    Object.entries(styles).forEach(entry => element.style[entry[0]] = entry[1])
    if (id != null) { element.id = id }
    return element;
}

/**
 * Returns an Array of all inner ( text ) elements
 * @param {string} taskInput 
 * @param {string} dateInput 
 * @param {string} timeInput 
 */
function createNoteInnerElements(taskInput, dateInput, timeInput) {
    return [
        createElement('h3', {}, null, taskInput),
        createElement('p', { margin: 0 }, null, dateInput),
        createElement('p', { margin: 0 }, null, timeInput)
    ]
}

/**
 * Supplier of text container
 */
const noteTextContainer = () => createElement('div', textContainerStyles, null);

/**
 * Returns a close button
 * With a specific style and icon
 * Sets an event listener by id ( remove note element with the same id)
 * @param {string} id 
 */
const closeButton = id => {
    const wrapper = createElement('div', { display: 'flex', justifyContent: 'center' }, null);
    const closeBtn = createElement('div', closeButtonStyles, 'closeBtn');
    closeBtn.classList.add('btn-hover')
    wrapper.appendChild(closeBtn)

    closeBtn.addEventListener('click', () => {
        document.getElementById('notes-container').removeChild(
            document.getElementById(id) //don't understand this line
        )
        const notes = getFromStorage()
        delete notes[id];
        setOnStorage(notes)
    })

    return wrapper
}

/**
 * Returns a complete note element by values
 * @param {object} inputValues
 * @param {string} id 
 */
function generateNoteElement({ taskInput, dateInput, timeInput }, id) {
    const innerElements = createNoteInnerElements(taskInput, dateInput, timeInput);
    const noteElement = createElement('div', noteElementStyles, id)
    const textContainer = noteTextContainer()
    textContainer.appendChild(innerElements[0])
    const buttonElement = closeButton(id)
    noteElement.appendChild(buttonElement)
    noteElement.appendChild(textContainer)
    innerElements.slice(1).forEach(element => noteElement.appendChild(element))
    return noteElement;
}

/**
 * Handles 'onclick' event for save button
 * Saves on local storage input values as a note object
 * Renders the new note element 
 */
function onSave() {
    const noteValues = getNotesValues();
    if (!isValidInputs(noteValues)) { return }
    const id = getId();
    const noteElement = generateNoteElement(noteValues, id);
    document.getElementById('notes-container').appendChild(noteElement);
    const notes = getFromStorage();
    notes[id] = { ...noteValues, id };
    setOnStorage(notes);
}
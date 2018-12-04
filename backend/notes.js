const fs = require('fs');

const fetchNotes = () => {
    try {
        const noteString = fs.readFileSync('notes-real.json')
        return JSON.parse(noteString);
    } catch (e) {
        return []
    }
};

const saveNotes = notes => {
    fs.writeFileSync('notes-real.json', JSON.stringify(notes))

};
const addNote = (title, body) => {
    // console.log('Adding new note')
    // console.log(`title: ${title}`)
    // console.log(`body: ${body}`)
    let notes = fetchNotes();
    const note = {
        title: title,
        body: body
    };

    const doubles = notes.filter((note) => {
        return note.title === title
    });

    if (doubles.length == 0) {
        notes.push(note);
        saveNotes(notes);
        return note
    }
};

const removeNote = (title) => {
    console.log(`Removing note: ${title}`)
};

const getNote = (title) => {
    console.log(`Getting note: ${title}`)
};


module.exports = {
    addNote,
    fetchNotes,
    getNote,
    removeNote
};
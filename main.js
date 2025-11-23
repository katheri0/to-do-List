// Get the table body element
var tableBody = document.getElementById("todo-items");

// Get Textarea
var textarea = document.querySelector("textarea");
// Get the add note button
var addNoteButton = document.getElementById("add-note");
addNoteButton.addEventListener("click", addNote);
// Load notes from local storage
var notes = JSON.parse(localStorage.getItem("notes")) || [];
// Render existing notes
renderNotes();
function renderNotes() {
    // Clear the table body
    tableBody.innerHTML = "";
    // Render each note as a row in the table
    var row;
    notes.forEach(function (note) {
        row = document.createElement("tr");
        row.innerHTML = `
    <td class="p-2 text-center">${note.id}</td>

    <td class="p-2 text-center">
        <input 
            type="checkbox" 
            ${note.isDone ? "checked" : ""}
            onclick="updateNoteState(event)"
        />
    </td>

    <td class="p-2 flex justify-between items-center">
        <span class="${note.isDone ? 'line-through text-gray-500' : ''}">
            ${note.text}
        </span>

        <div class="flex gap-2">
            <button class="btn btn-info btn-sm" onclick="EditNotes(${note.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteNotes(${note.id})">Delete</button>
        </div>
    </td>
`;

        tableBody.appendChild(row);
    });
}
function addNote() {
    if (!textarea.value) return;
    if (editId === null) {
        // Generate a unique ID for the note
        var noteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
        // Create a new note object
        notes.push({
            id: noteId,
            text: textarea.value,
            isDone: false
        });
    }
    else {
        var note = notes.find(n => n.id == editId)
        note.text = textarea.value;
        editId = null;
        addNoteButton.textContent = "Add Note";
    }

    // Save notes to local storage
    saveNotes();
    // Render the updated notes
    renderNotes();
    textarea.value = "";
}


var editId = null;

function EditNotes(id) {
    var note = notes.find(n => n.id === id);
    textarea.value = note.text;
    editId = id;

    addNoteButton.textContent = "Update Note";
}

// checkbox click
function updateNoteState(event) {
    var checkbox = event.target;
    var noteId = parseInt(
        checkbox.parentElement.previousElementSibling.previousElementSibling
            .innerText
    );
    // Find the note with the corresponding ID
    var note = notes.find(function (note) {
        return note.id === noteId;
    });
    // Update the note's isDone property
    note.isDone = checkbox.checked;
    // Save notes to local storage
    saveNotes();
}
// Save notes to local storage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
function deleteNotes(id) {
    notes = notes.filter(item => item.id !== id)
    saveNotes();
    renderNotes();
}
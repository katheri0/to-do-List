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
                <td>${note.id}</td>
                <td>${note.text}</td>
                <td>
                <input type="checkbox"
                ${note.isDone ? "checked" : ""}
                onclick="updateNoteState(event)">
                <button type="button" class="btn btn-danger" onclick="deleteNotes(${note.id})">Delete</button>
                </td>
                `;
                tableBody.appendChild(row);
            });
        }
        function addNote() {
            if (textarea.value) {
                // Generate a unique ID for the note
                var noteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
                // Create a new note object
                var newNote = {
                    id: noteId,
                    text: textarea.value,
                    isDone: false,
                };
                // Add the new note to the array
                notes.push(newNote);
                // Save notes to local storage
                saveNotes();
                // Render the updated notes
                renderNotes();
                textarea.value = "";
            }
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
function deleteNotes(id)
{
  notes =  notes.filter(item=> item.id !== id)
   saveNotes();
   renderNotes();
}
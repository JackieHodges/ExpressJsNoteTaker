// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');
const savedNotes = require('./db/db.json');
const { EWOULDBLOCK } = require('constants');

// Sets up the Express App

const app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// API Routes
app.get('/api/notes', (req, res) => res.json(savedNotes));

app.post('/api/notes', (req, res) => {
    const newNote = {
        "title": req.body.title,
        "text": req.body.text,
        "id": generateUniqueId()
    }

    savedNotes.push(newNote);
    console.log(`saved notes array ${savedNotes}`)

    const newSavedNotes = JSON.stringify(savedNotes);
    console.log(`New Saved Notes: ${newSavedNotes}`)

    fs.writeFile(`${__dirname}/db/db.json`, `${newSavedNotes}`, (err) => {
        if (err) throw err;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(`${newSavedNotes}`);
    
    })    
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

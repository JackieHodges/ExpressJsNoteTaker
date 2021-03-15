// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const savedNotes = require('./db/db.json');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// API Routes
app.get('/api/notes', (req, res) => {
    fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
        if (err) throw err;
        // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        // an html file.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    
    })
});


// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
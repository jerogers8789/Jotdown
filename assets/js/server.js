const { urlencoded } = require('body-parser');
const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
const database = require('/Users/jeremiahrogers/Jotdown/assets/js/db.json');

app.use(express.static('assets'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'./assets/index.html'));
});
app.get('./notes.html', function (req, res){
    res.sendFile(path.join(__dirname,'./assets/notes.html'));
})
app.route('/api/notes.html')
.get(function(req, res){
    res.json(database);
})
.post(function(req, res){
    let jsonFilePath = path.join(__dirname,'db.json');
    let newNote = req.body;
    let highID = 50;
    for (let i = 0; i < database.length; i++) {
        let indNote = database[i];
        if (indNote.id>highID){
            highID = indNote.id;
        }
    }
    newNote.id = highID + 1;
    database.push(newNote)
    fstat.writeFile(jsonFilePath, JSON.stringify(database), function(err){
        if (err) throw err
    });
    res.json(newNote);
});
app.delete('./api/notes.html/:id', function(req, res){
    let jsonFilePath = path.join(__dirname, 'db.json');
    for (let i = 0; i<database.length; i++) {
        if (database[i].id === req.params.id) {
            database.splice(i, 1);
        }
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function(err){
        if (err) throw err
    });
    res.json(database);
});
app.listen(PORT, () =>
    console.log('Listening on port' + PORT)
);
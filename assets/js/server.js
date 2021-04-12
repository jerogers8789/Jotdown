const { urlencoded } = require('body-parser');
const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'./index.html'));
});
app.get('./notes.html', function (req, res){
    res.sendFile(path.join(__dirname,'./notes.html'));
})
app.route('/api/notes.html')
.get(function(req, res){
    res.json(database);
})
.post(function(req, res){
    let jsonFilePath = path.join(__dirname,'./db.json');
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
            break;
        }
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function(err){
        if (err) throw err
    });
    res.json(database);
});
app.listen(PORT, function(){
    console.log('Listening on port' + PORT);
});
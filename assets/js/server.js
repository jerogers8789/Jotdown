const { urlencoded } = require('body-parser');
const express = require('express');
const path = require('path');
const PORT = 3030;
const app = express();

app.use(expresss.urlencoded({extended:true}));
app.use(express.json());


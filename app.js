const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


//Root Route
app.use('/', require ('./routes/'));


// Start application on port 4800
const port = 4800;
app.listen(port, ()=>{
    console.log(`Server has started on port ${port}`);
});
const express = require('express');
const app = express();
var path = require('path');

const shipmentsRouter = require('./routes/shipments.routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use('/shipments', shipmentsRouter);
/*app.use('/books', booksRouter);
app.use('/authors', authorsRouter);*/


app.listen(3000);
import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(8080, () => {
    console.log('Listening on *:8080');
});

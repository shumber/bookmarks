const express = require('express');
const multer  = require('multer');
const upload = multer();

const port = 8888;

const app = express();

const bookmarks = [];

app.use('/', express.static('public'));

app.get('/api/bookmarks', (req, res) => {
    res.json({ bookmarks });
})

app.delete('/api/bookmarks/:index', (req, res) => {
    if (req.params.index){
        if (req.params.index > -1) {
            console.log(req.params.index);
            bookmarks.splice(req.params.index, 1);
            return res.status(200).send();
        }
    }
    res.status(400).send();
})

app.post('/api/bookmarks', upload.array(), (req, res) => {
    if (req.body && req.body.url) {
        bookmarks.push(req.body.url);
        return res.status(200).send();
    }

    res.status(400).send();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

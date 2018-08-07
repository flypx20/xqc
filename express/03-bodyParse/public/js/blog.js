const express = require('express');
var bookRouter = express.Router();

bookRouter
    .get('/',function (req, res) {
        res.send(' blog get data....1');
    })
    .put('/',function (req, res) {
       res.send('blog post data....');
    })
    .post('/',function (req, res) {
        res.send('blog put data....');
    })
    .delete('/',function (req, res) {
       res.send('blog delete data....');
    });

module.exports = bookRouter;
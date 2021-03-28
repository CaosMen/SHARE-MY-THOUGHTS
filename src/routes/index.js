var express = require('express');
const axios = require('axios');

var Thought = require('../models/thought');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/thoughts', (req, res) => {
    Thought.find({}, function(err, thoughts) {
        if (err) {
            res.status(500).json({message: "MongoDB call issue!"});
        }
        
        res.json(thoughts);
    });
});

router.post('/thought', (req, res) => {
    var newThought = new Thought();

    newThought.thought = req.body.thought.substring(0, 500);

    newThought.save(function(err) {
        if (err){
            console.log('Error in Saving thought: ' + err);  
            res.status(500).json({message: "MongoDB call issue!"});
        }

        console.log('Thought Registration succesful'); 
    });

    res.status(201).json({message: "Updated Successfully!", data: newThought.thought});
});

router.get('*', (req, res) => {
    res.status(404).render('404.html');
});

module.exports = router;
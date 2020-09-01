const express = require('express');
const app = express();
const path = require('path');
const {v4} = require('uuid');

/* --- */

let contacts = [
    {id: v4(), name: 'Max', phone: '+380 44 059 6925'},
    {id: v4(), name: 'Roman', phone: '+380 44 132 9755'}
]

app.use(express.static('client'))
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.get('/api/contacts', (req, res) => {
    res.json(contacts);
})

app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4()};
    contacts.push(contact);
    res.status(201).json({message: 'Contact has been created.'});
})

app.delete('/api/contacts/:id', (req, res) => {
    contacts = contacts.filter(contact => contact.id !== req.params.id)
    res.status(200).json({message: 'Contact has been deleted.'})
})

app.listen(3000, () => {
    console.log('Server is listening on port http://localhost:3000');
})
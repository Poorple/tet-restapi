const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

let info =[];

// READ: Get all users
app.get('/component', (req, res) => {
    res.json(info);
});

// READ: Get a single user by ID
app.get('/component/:id', (req, res) => {
    const component = info.find(u => u.id === parseInt(req.params.id));
    if (!component) return res.status(404).send('component not found');
    res.json(component);
});

// CREATE: Add a new user
app.post('/component', (req, res) => {
    const { id, title, node_id, parent_node_id, ordering, childObjs } = req.body;

    const newComponent = {
        id,
        title,
        node_id,
        parent_node_id,
        ordering,
        childObjs
    };

    info.push(newComponent);
    res.status(201).json(newComponent);
});

// UPDATE: Update a user by ID
app.put('/component/:id', (req, res) => {
     const user = info.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Component not found');

    // Update the correct fields
    user.title = req.body.title;
    user.node_id = req.body.node_id;
    user.parent_node_id = req.body.parent_node_id;
    user.ordering = req.body.ordering;
    user.childObjs = req.body.childObjs;

    res.json(user);
});

// DELETE: Remove a user by ID
app.delete('/component/:id', (req, res) => {
    const userIndex = info.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1 || 0) return res.status(404).send('User not found');

    info.splice(userIndex, 1);
    res.send('User deleted');
});
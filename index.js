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

// READ: Get all components
app.get('/component', (req, res) => {
    res.json(info);
});

// READ: Get a single component by ID
app.get('/component/:id', (req, res) => {
    const component = info.find(u => u.id === parseInt(req.params.id));
    if (!component) return res.status(404).send('component not found');
    res.json(component);
});

// CREATE: Add a new components
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

// UPDATE: Update a component by ID
app.put('/component/:id', (req, res) => {
     const component = info.find(u => u.id === parseInt(req.params.id));
    if (!component) return res.status(404).send('Component not found');

    // Update the correct fields
    component.title = req.body.title;
    component.node_id = req.body.node_id;
    component.parent_node_id = req.body.parent_node_id;
    component.ordering = req.body.ordering;
    component.childObjs = req.body.childObjs;

    res.json(component);
});

// DELETE: Remove a component by ID
app.delete('/component/:id', (req, res) => {
    const componentIndex = info.findIndex(u => u.id === parseInt(req.params.id));
    if (componentIndex === -1 ) return res.status(404).send('Component not found');

    info.splice(componentIndex, 1);
    res.send('Component deleted');
});
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
    if (fs.existsSync('task.json')) {
        const fileContent = fs.readFileSync('task.json', 'utf8');
        const parsed = JSON.parse(fileContent);
        if (parsed && Array.isArray(parsed.tasks)) {
            tasksData = parsed.tasks;
        } else {
            console.error("task.json found but structure is invalid. Using empty tasks array.");
            tasksData = [];
        }
    } else {
        console.warn("task.json not found. Starting with empty tasks array.");
        tasksData = [];
    }
} catch (error) {
    console.error("Error reading task.json:", error.message);
    tasksData = [];
}

let id = tasksData.length + 1;
const validPriorities = ['low', 'medium', 'high'];

function getTaskById(id) {
    return tasksData.find(task => task.id === parseInt(id));
}

function validateTask( req, res, next) {
    const task = req.body;
    if (!task.title || !task.description || task.completed === undefined || !task.priority) {
        return res.status(400).send("Incomplete task data");;
    }
    if (typeof task.title !== 'string' ||
        typeof task.description !== 'string' || 
        typeof task.completed !== 'boolean' || 
        !validPriorities.includes(task.priority)) {
        return res.status(400).send("Invalid task data");;
    }
    next();
}


app.get('/tasks', (req, res) => {
    let result = [];
    if (req.query.completed !== undefined) {
        const completed = req.query.completed.toLowerCase() === 'true';
        result = tasksData.filter(task => task.completed === completed);
    }
    else {
        result = tasksData;
    }
    res.send(result);
});

app.get('/tasks/:id', (req, res) => {
    const task = getTaskById(req.params.id);
    if(!task) return res.status(404).send("The task with the given ID was not found");
    res.send(task);
});

app.get('/tasks/priority/:level', (req, res) => {
    const level = req.params.level.toLowerCase();
    if (!validPriorities.includes(level)) return res.status(400).send("Invalid priority level");
    const filteredTasks = tasksData.filter(task => task.priority === level);
    res.send(filteredTasks);
});

app.post('/tasks',validateTask, (req, res) => {
    const new_task = {
        id: id++,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed ,
        priority: req.body.priority.toLowerCase()
    };
    tasksData.push(new_task);
    res.status(201).send(new_task);
});

app.put('/tasks/:id', validateTask, (req, res) => {
    const task = getTaskById(req.params.id);
    if(!task) return  res.status(404).send("The task with the given ID was not found");

    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;
    task.priority = req.body.priority.toLowerCase();
    res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasksData.findIndex(task => task.id === parseInt(req.params.id));
    if(taskIndex === -1) return res.status(404).send("The task with the given ID was not found");
    tasksData.splice(taskIndex, 1);
    res.status(200).send("Task deleted successfully");
});

module.exports = app;

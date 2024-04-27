const fs = require('fs');
const path = require('path');
const express = require('express');
const handlebars = require('handlebars');
const app = express();
const Joi = require('joi');
const pathDB = path.join(__dirname, 'users.json');
let uniqueID = 1;
app.use(express.json());
const users = JSON.parse(fs.readFileSync(pathDB));

app.get('/', (req, res) => {
    const pathToTemplate = path.join(
        __dirname,
        '/templates/home.handlebars'
    );

    fs.readFile(pathToTemplate, 'utf8', (err, data) =>{
        if(err){
            res.status(500);
            res.send(err.message);
        } else {
            const template = handlebars.compile(data);
            res.send(template({ users }));
        }
    });
});

const schema = Joi.object({
    firstname: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastname: Joi.string()
        .min(3)
        .max(30)
        .required(),
    age: Joi.number()
        .integer()
        .min(1)
        .max(120)
        .required(),
    city: Joi.string()
        .min(1)
        .max(30)
});

app.get('/users', (req, res) =>{
    res.send(fs.readFileSync(pathDB));
});

app.get('/users/:id', (req, res) =>{
    const user = users.find(user => user.id === Number(req.params.id));

    if(user){
        res.send({user});
    }else{
        res.status(404);
        res.send({user: null});
    }
});

app.post('/users', (req, res) =>{
    uniqueID += 1;
    const users = JSON.parse(fs.readFileSync(pathDB));

    users.push({
        id: uniqueID,
        ...req.body
    });

    fs.writeFileSync(pathDB, JSON.stringify(users, null, 2));

    res.send({
        id: uniqueID
    });
});

app.put('/users/:id', (req, res) =>{
    const result = schema.validate(req.body);

    if (result.error) {
        return res.status(404).send({error: result.error.details});
    }
    const users = JSON.parse(fs.readFileSync(pathDB));
    const user = users.find(user => user.id === Number(req.params.id));

    if(user){
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(pathDB, JSON.stringify(users, null, 2));
        res.send({user});
    }else{
        res.status(404);
        res.send({user: null});
    }
});

app.delete('/users/:id', (req, res) =>{
    const users = JSON.parse(fs.readFileSync(pathDB));
    const user = users.find(user => user.id === Number(req.params.id));

    if(user){
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync(pathDB, JSON.stringify(users, null, 2));
        res.send({user});
    }else{
        res.status(404);
        res.send({user: null});
    }
});

app.listen(3000);
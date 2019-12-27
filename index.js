const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const { User } = require('./database/user');
mongoose
    .connect("mongodb://localhost/xlenzNode", { useNewUrlParser: true })
    .then(() => console.log("connected..."))
    .catch(err => console.error("could not connect"))
app.use(express.json())
app.get('/', (req, res) => {
    res.send({ message: "welcome to node" })
})
const port = 3000;
app.listen(port, () => console.log(`listeing on port ${port}....`));
app.post('/register', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({
        message: "user already registered."
    });

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email

    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save()
        .then(() => res.status(200).send({
            message: "sucess"
        }))
        .catch(err => console.error("registration failed"));
})

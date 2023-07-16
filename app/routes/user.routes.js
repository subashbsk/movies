module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    const router = require("express").Router();


    router.post('/signup', userController.create);
    router.post('/signin', userController.authenticate);
    app.use("/api/auth", router);
};
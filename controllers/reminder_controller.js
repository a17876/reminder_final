const Database = require("../models/userModel").database;
const userModel = require("../models/userModel").userModel;

let reminderController = {
    new: function (req, res) {
        res.render("reminder/create");
    },
    create: function (req, res) {
        const user = req.user;
        const numOfreminders = user.reminders.length
        let reminder = {
            id: numOfreminders + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false
        }
        req.user.reminders.push(reminder);
        res.redirect("/reminder");
    },
    list: function (req, res) {
        res.render("reminder/index", { reminders: req.user.reminders });
    },
    listOne: function (req, res) {
        let reminderToFind = req.params.id;
        let searchResult = req.user.reminders.find(function (reminder) {
            return reminder.id == reminderToFind
        })
        if (searchResult != undefined) {
            res.render("reminder/single-reminder", { reminderItem: searchResult })
        } else {
            res.redirect("/reminder");
        }
    },
    edit: function (req, res) {
        let reminderToFind = req.params.id;
        console.log(reminderToFind)
        let searchResult = req.user.reminders.find(function (reminder) {
            return reminder.id == reminderToFind
        })
        if (searchResult != undefined) {
            res.render("reminder/edit", { reminderItem: searchResult })
        } else {
            res.redirect("/reminder");
        }
        return reminderToFind;
    },
    update: function (req, res) {
        let reminder2 = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        };
        console.log(reminder2);
        console.log(req.user.reminders);
        for (item of req.user.reminders) {
            if (item.id == reminder2.id) {
                item.title = reminder2.title;
                item.description = reminder2.description;
                item.completed = reminder2.completed;
            }
        }
        res.redirect("/reminder");
    },
    delete: function (req, res) {
        let reminderToFind = req.params.id;
        let userReminders = req.user.reminders
        for (var i = 0; i < userReminders.length; i++) {
            if (userReminders[i].id == reminderToFind) {
                userReminders.splice(i, 1);
            }
        }
        res.redirect("/reminder");
    }
};

module.exports = reminderController;
'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('Users');

//List out all users from MongoDB
exports.list_all_users = (req, res) => {
    User.find({}, (err, users) => {
        if (err)
            res.send(err);

        res.status(200).json(users);
    })
        .select('name email profession create_date friends');
}

//Add friends relationship between two users.
exports.add_a_friend = (req, res) => {
    if (req.body.friends && req.body.target) {
        User.findOne({ email: req.body.friends }, (err, friends) => {
            if (err)
                res.send(err);
            if (friends) {
                User.findOne({ email: req.body.target, friends: { $nin: [friends._id] } }, (err, target) => {
                    if (err) res.send(err);
                    if (target) {

                        //Add target to friends's list
                        User.findByIdAndUpdate(friends._id,
                            { "$push": { "friends": target._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                        //Add target to friends's followed list
                        User.findByIdAndUpdate(friends._id,
                            { "$push": { "followed": target._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                        //Add friends to target's friend list
                        User.findByIdAndUpdate(target._id,
                            { "$push": { "friends": friends._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                        //Add friends to target's friend list
                        User.findByIdAndUpdate(target._id,
                            { "$push": { "followed": friends._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                    } else {
                        res.status(404).send("Both users are already friends");
                    }

                    res.status(200).json({
                        success: true
                    });
                });

            } else {
                res.status(404).send("Requested user does not exist!");
            }
        });

    } else {
        res.status(400).send("Check parameters!");
    }
};


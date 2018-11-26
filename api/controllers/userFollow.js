'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('Users');

//subscribe user's updates by following a user
exports.follow_a_user = (req, res) => {
    if (req.body.requestor && req.body.target) {
        User.findOne({ email: req.body.target }, (err, target) => {
            if (err) res.send(err);

            if (target) {
                User.findOne({ email: req.body.requestor, followed: { $nin: [target._id] } }, (err, requestor) => {
                    if (err) res.send(err);
                    User.findByIdAndUpdate(requestor._id,
                        { "$push": { "followed": target._id } },
                        { "new": true, "upsert": true }, (err, user) => {
                            if (err)
                                res.send(err);
                        });

                    res.status(200).json({ success: true });
                });
            }
            else {
                res.status(404).send("Targeted user does not exist!")
            }

        });
    } else {
        res.status(400).send("Check parameters!")
    }
}
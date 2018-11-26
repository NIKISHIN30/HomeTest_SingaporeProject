'use strict';

const mongoose = require('mongoose'),
    User = mongoose.model('Users');

//Get user's all followers
exports.get_all_followers = (req, res) => {
    if (req.body.sender) {
        User.findOne({ email: req.body.sender }, (err, sender) => {
            if (err) res.send(err);
            if (sender) {
                User.find({ followed: { $in: [sender._id] } }).select("email -_id")
                    .exec((err, followers) => {
                        if (err) res.send(err);
                        res.json({
                            success: true,
                            recipients: followers,
                            count: followers.length
                        });
                    });
            } else {
                res.status(404).send("Requested user does not exist!")
            }

        });
    } else {
        res.status(400).send("Check parameters!")
    }
}
